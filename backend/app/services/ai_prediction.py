import json
import logging
from sqlalchemy.orm import Session
from .. import models
from .gemini_client import ask_gemini_with_retry
from .ai_context import SEKOLAH_CONTEXT

logger = logging.getLogger(__name__)


def predict_next_material(db: Session, mapel_id: int, user_id: int = 1):
    # Lookup subject name for strict prompting
    mapel = db.query(models.Mapel).filter(models.Mapel.id == mapel_id).first()
    mapel_nama = mapel.nama if mapel else "Mata Pelajaran"

    riwayat = (
        db.query(models.Tugas)
        .filter(models.Tugas.mapel_id == mapel_id, models.Tugas.user_id == user_id)
        .order_by(models.Tugas.created_at.desc())
        .limit(5)
        .all()
    )

    if not riwayat:
        return {
            "mapel_id": mapel_id,
            "riwayat_materi": [],
            "prediksi_materi_berikutnya": "-",
            "alasan": "Data materi tidak cukup untuk melakukan prediksi.",
        }

    # Urutkan dari yang paling lama ke terbaru, pakai 'judul' sebagai materi
    daftar_materi = [t.judul for t in reversed(riwayat)]

    prompt = f"""
{SEKOLAH_CONTEXT}

Kamu adalah AI prediktor materi pelajaran untuk mata pelajaran: {mapel_nama}

Berikut adalah maksimal 5 materi pelajaran terakhir (urut dari yang paling lama ke terbaru):

{chr(10).join(f"{i+1}. {m}" for i, m in enumerate(daftar_materi))}

ATURAN KETAT:
1. Kamu sedang memprediksi materi untuk mata pelajaran: {mapel_nama}.
2. JIKA ada data di "5 Materi Terakhir" yang TIDAK BERHUBUNGAN dengan {mapel_nama}, ABAIKAN data tersebut sepenuhnya.
3. Prediksimu HARUS DAN WAJIB merupakan materi untuk {mapel_nama}.
4. Berdasarkan pola urutan materi di atas, prediksikan materi apa yang kemungkinan besar akan muncul berikutnya untuk {mapel_nama}.
5. Perhatikan konteks sekolah di atas — gunakan pemahaman yang benar tentang istilah sekolah (contoh: BMW = Bekerja/Melanjutkan/Wirausaha, bukan mobil).
6. Berikan skor confidence (keyakinanmu) dalam persentase 0-100 berdasarkan:
   - Konsistensi pola urutan materi
   - Jumlah data yang tersedia (semakin banyak data → semakin tinggi confidence)
   - Seberapa jelas tren/pola dari materi sebelumnya
7. Jawab HANYA dalam format JSON, tanpa teks tambahan lain:
{{"prediksi": "...", "alasan": "...", "confidence": 85}}
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
        "confidence": max(0, min(100, int(hasil.get("confidence", 50)))),
    }
