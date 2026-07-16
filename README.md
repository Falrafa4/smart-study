# 📚 SmartStudy — AI-Powered Study Planner

SmartStudy adalah aplikasi web terintegrasi yang dirancang untuk membantu siswa mengelola tugas sekolah secara lebih efisien dan cerdas. Dengan menggunakan kecerdasan buatan (AI) berbasis **LLM**, aplikasi ini tidak hanya mencatat tugas, tetapi juga menyusun prioritas pengerjaan tugas secara otomatis serta memberikan prediksi materi pelajaran berikutnya berdasarkan riwayat belajar siswa.

---

## 🛠 Tech Stack

### Frontend
- **React (Vite)**: Framework rendering antarmuka pengguna yang cepat dan modern.
- **Tailwind CSS**: Styling modern dengan penyesuaian warna bertema *Cobalt Premium*.
- **Axios**: Interaksi API terpusat dengan penanganan token JWT secara otomatis.
- **Framer Motion**: Animasi mikro-interaksi premium untuk memberikan kesan responsif dan dinamis.

### Backend
- **FastAPI**: Framework web Python berperforma tinggi untuk pembangunan REST API yang cepat.
- **SQLAlchemy (ORM)**: Pemetaan objek-relasional untuk interaksi database yang aman.
- **SQLite**: Database relasional ringan berbasis berkas (`smartstudy.db`) untuk kemudahan pengembangan lokal.
- **Uvicorn**: Server ASGI berkecepatan tinggi untuk menjalankan FastAPI.

### AI Integration
- **Google Gemini API**: Menggunakan model `gemini-2.0-flash` (atau sejenisnya) untuk melakukan analisis prioritas tugas dan peramalan materi pembelajaran selanjutnya dengan dukungan mekanisme *exponential backoff retry*.

---

## 🌟 Fitur Utama

1. **Dashboard Belajar Dinamis**: Menampilkan ringkasan tugas aktif dan cuplikan prediksi materi AI terpopuler secara langsung.
2. **Manajemen Mata Pelajaran (Mapel)**: Pengelompokan tugas berdasarkan mata pelajaran dengan kode warna representatif.
3. **Manajemen Tugas Mandiri**: Pencatatan tugas dengan tenggat waktu (*deadline*), catatan deskripsi, serta skala tingkat kesulitan (1-5).
4. **Rekomendasi Jadwal AI**: Sistem urutan tugas berbasis AI yang menyusun prioritas pengerjaan berdasarkan tenggat waktu, tingkat kesulitan, serta bobot tugas.
5. **Prediksi Materi AI**: Menganalisis maksimal 5 materi terakhir dalam satu mata pelajaran untuk memprediksi topik berikutnya yang perlu dipelajari beserta penjelasan rasionalnya.
6. **Toast Modal Alert**: Notifikasi kesalahan (*error handling*) bertema kaca (*glassmorphism*) merah yang muncul dengan animasi halus jika terjadi kegagalan sistem atau koneksi AI.

---

## 📁 Struktur Proyek Utama

```text
inkubasi-sija/
├── backend/
│   ├── app/
│   │   ├── services/
│   │   │   ├── gemini_client.py  # Klien API Gemini & fungsi retry otomatis
│   │   │   ├── ai_prediction.py  # Logika analisis prediksi materi AI
│   │   │   └── task_recomen.py   # Logika penyusunan rekomendasi tugas
│   │   ├── main.py               # Rute API, CORS, & inisiasi FastAPI
│   │   ├── models.py             # Skema database SQLAlchemy (User, Mapel, Tugas)
│   │   └── schemas.py            # Validasi input/output data Pydantic
│   ├── seed.py                   # Script seeding data awal (User, Mapel, Tugas)
│   ├── .env.example              # Contoh konfigurasi env backend
│   └── requirements.txt          # Library Python yang dibutuhkan
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── ToastModal.jsx    # Alert toast dinamis premium
│   │   ├── hooks/
│   │   │   └── useDebounce.js    # Hook pencegah spam pemanggilan API (throttling)
│   │   ├── services/
│   │   │   └── api.js            # Axios client terpusat dengan JWT Auth header
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── DetailTugas.jsx
│   │   │   ├── PrediksiMateri.jsx# Halaman interaktif prediksi materi
│   │   │   └── RekomendasiTugas.jsx# Halaman daftar prioritas tugas dari AI
│   ├── .env.example              # Contoh konfigurasi env frontend
│   └── package.json              # Dependensi pustaka npm frontend
└── docker-compose.yml            # Konfigurasi containerisasi (opsional)
```

---

## 🚀 Cara Instalasi & Menjalankan Proyek

### Langkah 1: Kloning Repositori
```bash
git clone <repo-url>
cd inkubasi-sija
```

### Langkah 2: Konfigurasi & Menjalankan Backend (FastAPI)
1. Masuk ke direktori backend:
   ```bash
   cd backend
   ```
2. Buat dan aktifkan Virtual Environment Python:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # Untuk Linux/macOS
   # .venv\Scripts\activate   # Untuk Windows
   ```
3. Install semua dependensi Python:
   ```bash
   pip install -r requirements.txt
   ```
4. Buat file `.env` di dalam folder `backend/`:
   ```bash
   cp .env.example .env
   ```
   Isi berkas `.env` dengan kredensial API Gemini Anda:
   ```env
   GEMINI_API_KEY=AIzaSy... (API Key Anda)
   GEMINI_MODEL=gemini-2.0-flash
   ```
5. Jalankan *Database Seeding* agar database memiliki data awal untuk dianalisis:
   ```bash
   python seed.py
   ```
6. Jalankan server backend:
   ```bash
   python -m uvicorn app.main:app --reload
   ```
   *Backend akan berjalan di: **`http://localhost:8000`***

### Langkah 3: Konfigurasi & Menjalankan Frontend (React)
1. Buka terminal baru dan masuk ke direktori frontend:
   ```bash
   cd frontend
   ```
2. Install dependensi Node.js:
   ```bash
   npm install
   ```
3. Buat file `.env` di dalam folder `frontend/`:
   ```bash
   cp .env.example .env
   ```
   Pastikan variabel `VITE_API_BASE_URL` mengarah ke backend Anda:
   ```env
   VITE_API_BASE_URL=http://localhost:8000/api
   ```
4. Jalankan aplikasi web dalam mode pengembangan:
   ```bash
   npm run dev
   ```
   *Aplikasi web dapat diakses di: **`http://localhost:5173`***

---

## 🔒 Konfigurasi Environment Variables

### Backend (`backend/.env`)
| Variabel | Deskripsi | Nilai Default |
| :--- | :--- | :--- |
| `GEMINI_API_KEY` | Kunci otentikasi API Google Gemini Anda | *Wajib diisi* |
| `GEMINI_MODEL` | Jenis model AI Gemini yang digunakan | `gemini-2.0-flash` |

### Frontend (`frontend/.env`)
| Variabel | Deskripsi | Nilai Default |
| :--- | :--- | :--- |
| `VITE_API_BASE_URL` | URL pangkalan API Backend FastAPI | `http://localhost:8000/api` |

---

## 🔧 Panduan Pemecahan Masalah (Troubleshooting)

| Masalah | Penyebab Umum | Solusi |
| :--- | :--- | :--- |
| **Error: "Belum ada riwayat tugas untuk mapel ini"** | Mata pelajaran terpilih belum memiliki riwayat tugas di database SQLite. | Tambahkan minimal 1 tugas untuk mata pelajaran tersebut melalui halaman "Tambah Tugas" atau jalankan ulang `python seed.py` di backend. |
| **Error: "WARNING: GEMINI_API_KEY belum diatur"** | File `.env` di backend belum disalin atau kunci API belum dimasukkan. | Salin `.env.example` ke `.env` di folder `backend/` dan isi variabel `GEMINI_API_KEY`. |
| **Gagal menghubungi backend dari halaman web** | Port backend tidak cocok atau `VITE_API_BASE_URL` salah konfigurasi. | Periksa apakah backend menyala di `http://localhost:8000/docs` dan pastikan file `frontend/.env` mengarah ke URL tersebut dengan benar. |
| **Import Error 'axios' saat build** | Dependensi node modules frontend belum terpasang sempurna. | Jalankan `npm install` kembali di folder `frontend/` sebelum menjalankan `npm run build` atau `npm run dev`. |

---

## 📝 Catatan Tambahan Pengembangan
- **CORS Development**: Akses asal silang (*CORS*) di backend disetel menggunakan wildcard (`*`) pada lingkungan lokal untuk mempermudah prapengembangan. Harap persempit hanya ke domain produksi saat melakukan deployment.
- **Mock Authentication**: Selama proses pengujian lokal, autentikasi default disimulasikan menggunakan `user_id = 1`. Integrasi JWT penuh dapat digunakan dengan menyuplai header bearer token lewat interceptor Axios yang sudah terpasang.