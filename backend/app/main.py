from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
from .services.ai_prediction import predict_next_material
from .schemas import PrediksiMateriRequest, PrediksiMateriResponse

from .database import get_db
from . import models, schemas

app = FastAPI(
    title="SmartStudy API",
    description="Backend API for SmartStudy — AI-powered study planner",
    version="0.1.0",
)

# ---------------------------------------------------------------------------
# CORS Middleware (allow all origins for local development)
# ---------------------------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ===========================================================================
# MAPEL (Subjects) Endpoints
# ===========================================================================

@app.post("/api/mapel", response_model=schemas.MapelResponse, status_code=201)
def create_mapel(mapel: schemas.MapelCreate, db: Session = Depends(get_db)):
    """Create a new Mata Pelajaran (subject)."""
    db_mapel = models.Mapel(
        nama=mapel.nama,
        kode_warna=mapel.kode_warna,
        user_id=mapel.user_id,
    )
    db.add(db_mapel)
    db.commit()
    db.refresh(db_mapel)
    return db_mapel


@app.get("/api/mapel", response_model=List[schemas.MapelResponse])
def get_all_mapel(db: Session = Depends(get_db)):
    """Retrieve all Mata Pelajaran (subjects)."""
    return db.query(models.Mapel).all()


# ===========================================================================
# TUGAS (Tasks) Endpoints
# ===========================================================================

@app.post("/api/tugas", response_model=schemas.TugasResponse, status_code=201)
def create_tugas(tugas: schemas.TugasCreate, db: Session = Depends(get_db)):
    """Create a new Tugas (task)."""
    # Validate that the referenced mapel exists
    mapel_exists = db.query(models.Mapel).filter(
        models.Mapel.id == tugas.mapel_id
    ).first()
    if not mapel_exists:
        raise HTTPException(
            status_code=404,
            detail=f"Mapel dengan id {tugas.mapel_id} tidak ditemukan",
        )

    db_tugas = models.Tugas(
        judul=tugas.judul,
        deskripsi=tugas.deskripsi,
        is_selesai=tugas.is_selesai,
        prioritas=tugas.prioritas,
        deadline=tugas.deadline,
        mapel_id=tugas.mapel_id,
        user_id=tugas.user_id,
    )
    db.add(db_tugas)
    db.commit()
    db.refresh(db_tugas)
    return db_tugas


@app.get("/api/tugas", response_model=List[schemas.TugasResponse])
def get_all_tugas(db: Session = Depends(get_db)):
    """Retrieve all Tugas (tasks)."""
    return db.query(models.Tugas).all()


# ===========================================================================
# Prediksi Materi Endpoint (AI-powered prediction)
# ===========================================================================


@app.post("/api/prediksi-materi", response_model=PrediksiMateriResponse)
def prediksi_materi(request: PrediksiMateriRequest, db: Session = Depends(get_db)):
    hasil = predict_next_material(db, request.mapel_id, request.user_id)
    print(hasil)
    if not hasil:
        raise HTTPException(
            status_code=404,
            detail="Belum ada riwayat tugas untuk mapel ini"
        )
    return hasil
        

# ===========================================================================
# JADWAL AI (Placeholder) Endpoint
# ===========================================================================

@app.post("/api/jadwal/generate-ai")
def generate_jadwal_ai(request: schemas.JadwalAIRequest):
    """Placeholder endpoint for AI-based schedule generation."""
    return {
        "message": "Jadwal AI berhasil dibuat, fitur menyusul!",
        "user_id": request.user_id,
        "strategi": request.strategi,
    }