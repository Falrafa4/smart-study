from fastapi import FastAPI, Depends, HTTPException, status
# pyrefly: ignore [missing-import]
from passlib.context import CryptContext
from datetime import datetime, timedelta, timezone
from jose import jwt
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
from .services.ai_prediction import predict_next_material
from .schemas import PrediksiMateriRequest, PrediksiMateriResponse
from app.services.task_recomen import recommend_task_priority

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
    # Added wildcard origin for easier local dev; tighten in prod.
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5174", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------------------------------------------------------------------
# AUTHENTICATION CONFIG & UTILS
# ---------------------------------------------------------------------------
SECRET_KEY = "your-super-secret-key-change-this-in-production"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# ===========================================================================
# AUTHENTICATION ENDPOINTS
# ===========================================================================

@app.post("/api/register", response_model=schemas.Token, status_code=status.HTTP_201_CREATED)
def register_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(
        (models.User.email == user.email) | (models.User.username == user.username)
    ).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email or username already registered")
        
    hashed_password = get_password_hash(user.password)
    new_user = models.User(
        username=user.username, 
        email=user.email, 
        hashed_password=hashed_password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    access_token = create_access_token(data={"sub": str(new_user.id)})
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/api/login", response_model=schemas.Token)
def login_user(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.username == user.username).first()
    
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
        
    access_token = create_access_token(data={"sub": str(db_user.id)})
    return {"access_token": access_token, "token_type": "bearer"}


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
def generate_jadwal_ai(
    request: schemas.JadwalAIRequest,
    db: Session = Depends(get_db)
):
    return recommend_task_priority(db, request.user_id)