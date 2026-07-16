import json
import logging
from sqlalchemy.orm import Session
from .. import models
from .gemini_client import ask_gemini_with_retry

logger = logging.getLogger(__name__)


def predict_next_material(db: Session, mapel_id: int, user_id: int = 1):
    riwayat = (
        db.query(models.Tugas)
        .filter(models.Tugas.mapel_id == mapel_id, models.Tugas.user_id == user_id)
        .order_by(models.Tugas.created_at.desc())
        .limit(5)
        .all()
    )

    if not riwayat:
        return None

    # Urutkan dari yang paling lama ke terbaru, pakai 'judul' sebagai materi
    daftar_materi = [t.judul for t in reversed(riwayat)]

    prompt = f"""
Berikut adalah maksimal 5 materi pelajaran terakhir (urut dari yang paling lama ke terbaru)
untuk satu mata pelajaran yang sama:

{chr(10).join(f"{i+1}. {m}" for i, m in enumerate(daftar_materi))}

Berdasarkan pola urutan materi di atas, prediksikan materi apa yang kemungkinan
besar akan muncul berikutnya. Jawab HANYA dalam format JSON, tanpa teks tambahan lain:
{{"prediksi": "...", "alasan": "..."}}
"""

    raw_text = ask_gemini_with_retry(prompt)
    cleaned = raw_text.strip().removeprefix("```json").removesuffix("```").strip()

    try:
        hasil = json.loads(cleaned)
    except json.JSONDecodeError as exc:
        logger.error("Gagal parse JSON dari Gemini response: %s\nRaw text: %s", exc, raw_text)
        raise ValueError(
            f"Gemini mengembalikan format yang tidak valid. "
            f"Detail: {exc}"
        ) from exc

    return {
        "mapel_id": mapel_id,
        "riwayat_materi": daftar_materi,
        "prediksi_materi_berikutnya": hasil.get("prediksi", ""),
        "alasan": hasil.get("alasan", ""),
    }
