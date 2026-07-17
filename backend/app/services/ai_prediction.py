import json
import logging
from sqlalchemy.orm import Session
from .. import models
from .gemini_client import ask_gemini_with_retry

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
Kamu adalah asisten AI untuk sekolah kejuruan (SMK) dengan fokus jurusan:
- TJAT (Teknik Jaringan Akses Telekomunikasi)
- SIJA (Sistem Informasi, Jaringan, dan Aplikasi)

Konteks mata pelajaran saat ini: "{mapel_nama}" (ID: {mapel_id}). Berikut adalah 5 materi/tugas terakhir yang telah diberikan kepada siswa:

Berikut adalah maksimal 5 materi/tugas terakhir (urut dari yang paling lama ke terbaru)
untuk mata pelajaran tersebut:

{chr(10).join(f"{i+1}. {m}" for i, m in enumerate(daftar_materi))}

ATURAN WAJIB:
- Prediksi HARUS relevan dengan kurikulum TJAT atau SIJA (jaringan komputer, telekomunikasi,
  sistem informasi, pemrograman aplikasi, infrastruktur jaringan, keamanan siber dasar, dll).
- JANGAN memprediksi topik di luar bidang telekomunikasi/jaringan/sistem informasi
  (misalnya jangan menyebut biologi, sejarah, sastra, atau mapel non-kejuruan lain).
- Jika materi sebelumnya menunjukkan progresi topik tertentu (misal dari dasar ke lanjutan),
  lanjutkan pola tersebut secara logis sesuai jenjang SMK.
- Prediksi harus berupa topik/bab spesifik, bukan mata pelajaran secara umum.
- Alasan (field "alasan") HARUS singkat, MAKSIMAL 1 kalimat, tidak lebih dari 20 kata.
  Langsung ke inti pola yang terlihat, tanpa basa-basi atau penjelasan panjang.

Jawab HANYA dalam format JSON, tanpa teks tambahan lain:
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
