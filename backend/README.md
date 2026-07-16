# SmartStudy Backend

Ini adalah repository backend untuk aplikasi **SmartStudy** (AI-powered study planner). Backend ini dibangun menggunakan **FastAPI** dengan database **SQLite** dan **SQLAlchemy** sebagai ORM.

## 🛠 Teknologi yang Digunakan
- **FastAPI**: Web framework modern dan cepat (high-performance) untuk membangun API dengan Python.
- **Uvicorn**: ASGI server berkecepatan tinggi untuk menjalankan FastAPI.
- **SQLAlchemy**: ORM (Object Relational Mapper) untuk berinteraksi dengan database menggunakan objek Python.
- **Pydantic**: Menangani validasi tipe data secara ketat dan definisi struktur *schema* request/response API.
- **Alembic**: Tool untuk manajemen migrasi versi database (seperti mengubah skema tabel).
- **SQLite**: Database relasional ringan berbasis file yang digunakan dalam proyek ini (`smartstudy.db`).

---

## 📁 Struktur Folder & File Utama
Berikut adalah kerangka struktur direktori utama di dalam folder `backend`:
```text
backend/
├── app/
│   ├── database.py   # Konfigurasi koneksi ke SQLite & pembuatan SQLAlchemy engine/session
│   ├── main.py       # Entry point utama aplikasi (Inisiasi FastAPI, routing API, CORS)
│   ├── models.py     # Definisi relasi & tabel Database (SQLAlchemy Models)
│   └── schemas.py    # Definisi validasi data (Pydantic Schemas untuk Request/Response)
├── smartstudy.db     # File fisik database SQLite (ter-generate otomatis)
├── requirements.txt  # Daftar dependencies/library Python yang wajib diinstall
└── README.md         # Dokumentasi yang sedang Anda baca ini
```

---

## 💾 Desain Database (Models)
Terdapat 3 entitas/tabel utama yang sudah terdefinisi di dalam `app/models.py`:
1. **`User`**: Tabel pengguna aplikasi yang terdaftar. Saat ini auth ditiadakan sementara, sehingga menggunakan `user_id = 1`.
2. **`Mapel` (Mata Pelajaran)**: Tabel daftar mata pelajaran, memiliki relasi dengan `User` dan `Tugas`.
3. **`Tugas` (Tasks)**: Tabel untuk menyimpan daftar tugas. Berisi properti seperti `judul`, `deskripsi`, `is_selesai`, `prioritas` (String: Tinggi, Menengah, Rendah), dan `deadline`. Terhubung sebagai *Foreign Key* ke `Mapel` dan `User`.

---

## 🚀 Daftar API Endpoint (Routes)
Semua rute (endpoints) dapat dieksplorasi di `app/main.py`. Berikut adalah daftarnya:

### Mata Pelajaran (Mapel)
- `POST /api/mapel` : Endpoint untuk membuat mata pelajaran baru.
- `GET /api/mapel` : Endpoint untuk mengambil daftar seluruh mata pelajaran.

### Tugas (Tasks)
- `POST /api/tugas` : Menyimpan tugas baru ke dalam sistem. Menerima body JSON seperti `judul`, `deskripsi`, `prioritas`, dan `deadline`. Pydantic memvalidasi tipe data yang masuk dengan sangat ketat agar tidak salah masuk ke DB.
- `GET /api/tugas` : Endpoint untuk mengambil daftar semua tugas.

### Fitur AI (Coming Soon)
- `POST /api/jadwal/generate-ai` : *Placeholder* API untuk meng-generate jadwal belajar cerdas menggunakan AI (mengembalikan mock data, algoritma cerdasnya masih menyusul).

---

## 🏃 Cara Menjalankan Backend (Development)

Pastikan kamu sudah berada di dalam folder `backend` dan telah mengaktifkan Virtual Environment (jika ada).

1. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```
2. **Jalankan Server API (Uvicorn)**
   Flag `--reload` digunakan agar server otomatis *restart* saat kamu menyimpan file Python yang baru diedit.
   ```bash
   python -m uvicorn app.main:app --reload
   ```
3. **Akses Dokumentasi Interaktif (Swagger UI)**
   FastAPI secara menakjubkan otomatis membuatkan dokumentasi API (*Swagger*) yang bisa dipakai ngetest request/response. Buka browser dan kunjungi:
   👉 **http://127.0.0.1:8000/docs**

---

## 🚨 Catatan Penting untuk Teman-teman Developer
- **CORS (Cross-Origin Resource Sharing)**: Sudah diatur di `main.py` menggunakan `CORSMiddleware` agar mengizinkan *request* dari Frontend React (`localhost:5173`) tanpa diblokir oleh browser.
- **Autentikasi (Bypass)**: Untuk sementara *(pada tahap ini)*, sistem Login/Auth sengaja di-bypass. Penggunaan `user_id` di Endpoint seperti pembuatan Mapel dan Tugas otomatis menggunakan default value `1` secara *hardcoded* (di `schemas.py`).
