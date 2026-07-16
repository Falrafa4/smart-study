import os
import sys
from datetime import datetime, timedelta, timezone

# Add root path to sys.path so app module can be imported
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.database import SessionLocal
from app import models

def seed_database():
    db = SessionLocal()
    try:
        # Check if database is already seeded
        if db.query(models.User).filter(models.User.id == 1).first():
            print("Database sudah terisi data. Seeding dibatalkan.")
            return

        print("Memulai proses seeding database...")

        # 1. Seed User
        user = models.User(
            id=1,
            username="kevin",
            email="kevin@smartstudy.id"
        )
        db.add(user)
        db.flush() # Flush to get user.id before generating relations

        # 2. Seed Mata Pelajaran (Mapel) with representation color codes
        mapel_data = [
            models.Mapel(id=1, nama="Matematika", kode_warna="#EF4444", user_id=user.id),
            models.Mapel(id=2, nama="Bahasa Inggris", kode_warna="#10B981", user_id=user.id),
            models.Mapel(id=3, nama="Administrasi Infrastruktur Jaringan (AIJ)", kode_warna="#3B82F6", user_id=user.id),
            models.Mapel(id=4, nama="Administrasi Sistem Jaringan (ASJ)", kode_warna="#8B5CF6", user_id=user.id),
            models.Mapel(id=5, nama="Teknologi Layanan Jaringan (TLJ)", kode_warna="#EC4899", user_id=user.id),
            models.Mapel(id=6, nama="Produk Kreatif dan Kewirausahaan (PKK)", kode_warna="#06B6D4", user_id=user.id),
            models.Mapel(id=7, nama="Pendidikan Pancasila dan Kewarganegaraan (PPKn)", kode_warna="#6B7280", user_id=user.id),
        ]
        db.add_all(mapel_data)
        db.flush()

        # Date reference in UTC
        now = datetime.now(timezone.utc)

        # 3. Seed Tugas with realistic scenarios and dynamic deadlines
        tugas_data = [
            # Matematika
            models.Tugas(
                judul="Latihan Soal Hal 40 (Matriks)",
                deskripsi="Kerjakan latihan soal matriks invers nomor 1 sampai 10 di buku tulis.",
                is_selesai=False,
                prioritas="Tinggi",
                deadline=now + timedelta(days=1),
                mapel_id=1,
                user_id=user.id
            ),
            models.Tugas(
                judul="SPLDV Essay Worksheet",
                deskripsi="Lembar kerja sistem persamaan linear dua variabel via Google Classroom.",
                is_selesai=True,
                prioritas="Menengah",
                deadline=now - timedelta(days=3),
                mapel_id=1,
                user_id=user.id
            ),
            # Bahasa Inggris
            models.Tugas(
                judul="Essay Chapter 2 (Passive Voice)",
                deskripsi="Tulis esai minimal 150 kata menggunakan minimal 5 kalimat passive voice.",
                is_selesai=False,
                prioritas="Menengah",
                deadline=now + timedelta(days=3),
                mapel_id=2,
                user_id=user.id
            ),
            # AIJ
            models.Tugas(
                judul="Desain Topologi Jaringan LAN Kantor Sederhana",
                deskripsi="Buat desain topologi logis dan fisik di Cisco Packet Tracer beserta skema IP Addressing.",
                is_selesai=False,
                prioritas="Tinggi",
                deadline=now + timedelta(days=5),
                mapel_id=3,
                user_id=user.id
            ),
            models.Tugas(
                judul="Laporan Konfigurasi Routing Dinamis (OSPF)",
                deskripsi="Laporan praktikum konfigurasi OSPF multi-area menggunakan GNS3/Packet Tracer.",
                is_selesai=True,
                prioritas="Tinggi",
                deadline=now - timedelta(days=1),
                mapel_id=3,
                user_id=user.id
            ),
            # ASJ
            models.Tugas(
                judul="Konfigurasi DHCP Server di Debian 12",
                deskripsi="Praktikum konfigurasi DHCP server beserta binding static IP address untuk client.",
                is_selesai=False,
                prioritas="Tinggi",
                deadline=now + timedelta(days=2),
                mapel_id=4,
                user_id=user.id
            ),
            models.Tugas(
                judul="Instalasi dan Uji Web Server (Apache)",
                deskripsi="Membuat web server apache sederhana dan mengganti tampilan index.html bawaan.",
                is_selesai=True,
                prioritas="Menengah",
                deadline=now - timedelta(days=4),
                mapel_id=4,
                user_id=user.id
            ),
            # PKK
            models.Tugas(
                judul="Proposal Project Startup Digital",
                deskripsi="Rancang proposal bisnis sederhana yang mencakup BMC (Business Model Canvas) kelompok.",
                is_selesai=False,
                prioritas="Menengah",
                deadline=now + timedelta(days=7),
                mapel_id=6,
                user_id=user.id
            ),
            # PPKn
            models.Tugas(
                judul="Analisis Pelanggaran HAM di Lingkungan Sekolah",
                deskripsi="Buat rangkuman analisis studi kasus pelanggaran hak asasi manusia di sekolah.",
                is_selesai=False,
                prioritas="Rendah",
                deadline=now + timedelta(days=4),
                mapel_id=7,
                user_id=user.id
            ),
        ]
        db.add_all(tugas_data)
        db.commit()
        print("Database seeding selesai dengan sukses!")
    except Exception as e:
        db.rollback()
        print(f"Terjadi kesalahan saat seeding database: {e}")
        raise e
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
