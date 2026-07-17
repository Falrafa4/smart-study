from pydantic import BaseModel, ConfigDict, EmailStr
from datetime import datetime
from typing import Optional


# ============================================================
# MAPEL (Mata Pelajaran / Subjects) Schemas
# ============================================================

class MapelCreate(BaseModel):
    """Schema for creating a new Mapel (subject)."""
    nama: str
    kode_warna: Optional[str] = None
    user_id: int = 1  # Default user_id = 1, auth skipped for this sprint


class MapelResponse(BaseModel):
    """Schema for returning Mapel data from the API."""
    id: int
    nama: str
    kode_warna: Optional[str] = None
    user_id: int

    model_config = ConfigDict(from_attributes=True)


# ============================================================
# TUGAS (Tasks) Schemas
# ============================================================

class TugasCreate(BaseModel):
    """Schema for creating a new Tugas (task)."""
    judul: str
    deskripsi: Optional[str] = None
    is_selesai: bool = False
    prioritas: str = "Menengah"
    deadline: Optional[datetime] = None
    mapel_id: int
    user_id: int = 1  # Default user_id = 1, auth skipped for this sprint


class TugasResponse(BaseModel):
    """Schema for returning Tugas data from the API."""
    id: int
    judul: str
    deskripsi: Optional[str] = None
    is_selesai: bool
    prioritas: str
    deadline: Optional[datetime] = None
    created_at: datetime
    mapel_id: int
    user_id: int

    model_config = ConfigDict(from_attributes=True)


class TugasUpdate(BaseModel):
    """Schema for updating a Tugas (task)."""
    is_selesai: bool


# ============================================================
# JADWAL AI (Schedule AI Placeholder) Schemas
# ============================================================

class JadwalAIRequest(BaseModel):
    """Placeholder request body for the AI schedule generator."""
    user_id: int = 1
    strategi: Optional[str] = "default"


# ============================================================
# JADWAL (Class Schedule) Schemas
# ============================================================

class JadwalCreate(BaseModel):
    """Schema for creating a new Jadwal (schedule entry)."""
    hari: str
    jam: str
    mapel: str
    user_id: int = 1


class JadwalResponse(BaseModel):
    """Schema for returning Jadwal data from the API."""
    id: int
    hari: str
    jam: str
    mapel: str
    user_id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

# ============================================================
# PREDIKSI MATERI (AI Prediction) Schemas
# ============================================================

class PrediksiMateriRequest(BaseModel):
    """Schema for requesting next-material prediction."""
    mapel_id: int
    user_id: int = 1


class PrediksiMateriResponse(BaseModel):
    """Schema for returning next-material prediction."""
    mapel_id: int
    riwayat_materi: list[str]
    prediksi_materi_berikutnya: str
    alasan: str
    confidence: int = 50

# ============================================================
# AUTHENTICATION Schemas
# ============================================================

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str