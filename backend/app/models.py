from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime, timezone

from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, nullable=False)
    email = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    # Relationships
    mapel_list = relationship("Mapel", back_populates="user")
    tugas_list = relationship("Tugas", back_populates="user")


class Mapel(Base):
    """Mata Pelajaran (Subjects)"""
    __tablename__ = "mapel"

    id = Column(Integer, primary_key=True, index=True)
    nama = Column(String, nullable=False)
    kode_warna = Column(String, nullable=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    # Relationships
    user = relationship("User", back_populates="mapel_list")
    tugas_list = relationship("Tugas", back_populates="mapel")


class Tugas(Base):
    """Tugas (Tasks)"""
    __tablename__ = "tugas"

    id = Column(Integer, primary_key=True, index=True)
    judul = Column(String, nullable=False)
    deskripsi = Column(Text, nullable=True)
    is_selesai = Column(Boolean, default=False)
    prioritas = Column(String, default="Menengah")
    deadline = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    mapel_id = Column(Integer, ForeignKey("mapel.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    # Relationships
    mapel = relationship("Mapel", back_populates="tugas_list")
    user = relationship("User", back_populates="tugas_list")
