import json
import logging
from .gemini_client import ask_gemini_with_retry
from .ai_context import SEKOLAH_CONTEXT

logger = logging.getLogger(__name__)


def predict_next_material(mapel_nama: str, mapel_id: int, daftar_materi: list[str]):
    """Predict next material using Gemini AI.

    Args:
        mapel_nama: Name of the subject.
        mapel_id: ID of the subject.
        daftar_materi: List of last 5 material titles (oldest first).
    """

    prompt = f"""
Kamu adalah AI prediktor materi pelajaran untuk siswa SMK jurusan TJAT (Teknik Jaringan Akses Telekomunikasi) dan SIJA (Sistem Informasi, Jaringan, dan Aplikasi).
{SEKOLAH_CONTEXT}

Tugasmu adalah memprediksi materi pelajaran berikutnya untuk mata pelajaran: "{mapel_nama}" (ID: {mapel_id}).

Berikut adalah maksimal 5 materi/tugas terakhir yang telah diberikan kepada siswa untuk mata pelajaran ini, diurutkan dari yang paling lama ke yang paling baru:
{chr(10).join(f"{i+1}. {m}" for i, m in enumerate(daftar_materi))}

Ikuti aturan berikut saat membuat prediksi:

1. Prediksi harus berupa topik atau bab yang spesifik (bukan nama mata pelajaran secara umum), dan harus sesuai dengan kurikulum TJAT/SIJA — misalnya jaringan komputer, telekomunikasi, sistem informasi, pemrograman aplikasi, infrastruktur jaringan, atau keamanan siber dasar.
2. Jika ada materi dalam riwayat di atas yang tidak berhubungan dengan "{mapel_nama}", abaikan materi tersebut sepenuhnya — jangan jadikan dasar prediksi apapun.
3. Perhatikan pola progresi materi (misalnya dari topik dasar menuju topik lanjutan) dan lanjutkan pola tersebut secara logis, sesuai jenjang pembelajaran SMK.
4. Pahami istilah-istilah sekolah sesuai konteks pendidikan kejuruan, bukan makna umum sehari-hari — misalnya "BMW" berarti Bekerja/Melanjutkan/Wirausaha, bukan merek mobil.
5. Sertakan skor confidence (0-100) yang mencerminkan seberapa yakin kamu terhadap prediksi ini, berdasarkan tiga hal: konsistensi pola pada riwayat materi, jumlah data yang tersedia (semakin banyak data, semakin tinggi confidence yang wajar), dan seberapa jelas tren yang terlihat dari materi-materi sebelumnya.
6. Tuliskan alasan secara ringkas — cukup satu kalimat, maksimal 20 kata — yang langsung menjelaskan pola utama yang mendasari prediksimu, tanpa basa-basi atau penjelasan berlebihan.
Berikan jawabanmu HANYA dalam format JSON berikut, tanpa teks tambahan apapun di luar JSON tersebut:
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
