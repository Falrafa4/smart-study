import json
from sqlalchemy.orm import Session
from .. import models
from .openai_client import ask_openai


def recommend_task_priority(db: Session, user_id: int):
    # Ambil semua tugas yang belum selesai
    tugas_list = (
        db.query(models.Tugas)
        .filter(
            models.Tugas.user_id == user_id,
            models.Tugas.is_selesai == False
        )
        .all()
    )

    if not tugas_list:
        return {
            "message": "Tidak ada tugas yang perlu direkomendasikan."
        }

    daftar_tugas = []

    for tugas in tugas_list:
        daftar_tugas.append({
            "judul": tugas.judul,
            "deadline": str(tugas.deadline),
            "kesulitan": tugas.prioritas,   
            "deskripsi": tugas.deskripsi
        })

    prompt = f"""
Berikut daftar tugas:

{json.dumps(daftar_tugas, indent=2, ensure_ascii=False)}

Urutkan tugas dari yang paling harus dikerjakan terlebih dahulu berdasarkan:
1. Deadline
2. Tingkat kesulitan
3. Deskripsi tugas

Jawab HANYA dalam format JSON seperti ini:

{{
    "urutan": [
        "Judul Tugas 1",
        "Judul Tugas 2",
        "Judul Tugas 3"
    ]
}}
"""

    hasil = ask_openai(prompt)

    cleaned = hasil.strip().removeprefix("```json").removesuffix("```").strip()

    return json.loads(cleaned)