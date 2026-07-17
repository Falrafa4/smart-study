"""
Konteks Sekolah untuk AI Prediktor Materi
==========================================
File ini berisi domain knowledge tentang sekolah yang digunakan
untuk memberi konteks kepada AI saat memprediksi materi pelajaran.

Gunakan file ini di dalam prompt AI agar AI tidak salah interpretasi
terhadap istilah-istilah khusus sekolah.
"""

SEKOLAH_CONTEXT = """
KONTEKS SEKOLAH (SMK Telkom Sidoarjo)
===================================================

Sekolah ini adalah SMK (Sekolah Menengah Kejuruan) dengan program keahlian
Teknik Jaringan Akses Telekomunikasi (TJAT) dan Sistem Informasi, Jaringan, Aplikasi (SIJA).

PROGRAM BMW
-----------
BMW adalah singkatan dari program orientasi karir di sekolah ini:
- B = Bekerja (langsung terjun ke dunia kerja setelah lulus)
- M = Melanjutkan (melanjutkan pendidikan ke jenjang kuliah/S1)
- W = Wirausaha (memulai usaha sendiri setelah lulus)

Program BMW membantu siswa menentukan jalur karir setelah lulus.
Contoh tugas terkait BMW:
- "Analisis Peluang Kerja di Bidang Jaringan"
- "Proposal Rencana Wirausaha Digital"
- "Perencanaan Melanjutkan Studi ke D4/S1 Teknologi Informasi"

MATA PELAJARAN UMUM (MPU)
--------------------------
- Pendidikan Agama dan Budi Pekerti (PABP)
- Pendidikan Pancasila (PKn)
- Bahasa Indonesia
- Bahasa Inggris
- Matematika
- Sejarah
- PJOK
- Seni Budaya
- Bahasa Jawa
- Informatika
- Projek IPAS
- Bimbingan Konseling

MATA PELAJARAN KEAHLIAN (SIJA)
--------------------------------------------
- Dasar Pemrograman (DP)
- Dasar Database (DD)
- Dasar UI
- Dasar UI/UX
- Pemrograman II (PM2)
- Pemrograman III (PMIII)
- Service Design (SD)
- Dasar Internet of Things (IoT)
- Sistem Komputer (SISKOM)
- Dasar Kecerdasan Artifisial (DS.KA)
- Kecerdasan Artifisial (KA)
- Kecerdasan Artifisial 2 (KA2)
- Administrasi Jaringan (AJ)
 -Administrasi Jaringan II (AJII)
- Sistem Keamanan Jaringan (SKJ)

MATA PELAJARAN KEAHLIAN (TJAT)
--------------------------------------------
- Dasar Sistem Telekomunikasi (DST)
- Dasar UI/UX
- Dasar Pemrograman
- Internet of Things
- Dasar Kelistrikan (DKL)
- FTTH
- Jaringan Dasar
- Jaringan Akses
- Konsentrasi Keahlian TJAT
- Dasar-Dasar Program Keahlian TJAT (DPK)
- Persiapan UKK
- MTCNA

MATA PELAJARAN PENUNJANG
--------------------------
- Kreativitas, Inovasi, dan Kewirausahaan (KIK): Bisnis plan, BMC, pemasaran digital

ISTILAH KHUSUS SEKOLAH
-----------------------
- "UKK" = Uji Kompetensi Keahlian (ujian akhir praktik keahlian)
- "UKK Jaringan" = Uji kompetensi bidang jaringan komputer
- "Praktikum" = Kegiatan praktik langsung di lab
- "Packet Tracer" = Software simulasi jaringan dari Cisco
- "GNS3" = Software simulasi jaringan untuk konfigurasi routing
- "Mikrotik" = Perangkat keras/software router populer di Indonesia
- "RouterBOARD" = Perangkat Mikrotik untuk routing
- "Winbox" = Aplikasi GUI untuk konfigurasi Mikrotik
- "Cisco" = Vendor perangkat jaringan terkemuka
- "Debian" = Distro Linux yang sering digunakan untuk server
- "Ubuntu Server" = Distro Linux untuk server
- "XAMPP" = Package Apache + MySQL + PHP untuk development
- "VPS" = Virtual Private Server
- "Hosting" = Tempat menyimpan website di internet
- "Domain" = Nama alamat website
- "SSL" = Secure Socket Layer (keamanan website)
- "CDN" = Content Delivery Network
- "VLAN" = Virtual Local Area Network
- "VPN" = Virtual Private Network
- "NAT" = Network Address Translation
- "Mikrotik Hotspot" = Sistem hotspot menggunakan Mikrotik
- "RADIUS" = Sistem autentikasi jaringan terpusat
- "Load Balancing" = Distribusi beban koneksi
- "Backup" = Cadangan data
- "Monitoring" = Pemantauan jaringan
- "Troubleshooting" = Perbaikan masalah jaringan

KURIKULUM
---------
Sekolah menggunakan Kurikulum Merdeka dengan penekanan pada:
- Pembelajaran berbasis proyek (PjBL)
- Praktik langsung di lab jaringan
- Sertifikasi kompetensi (BNSP/LSP)

STRUKTUR PENILAIAN
------------------
- Tugas Praktikum: 40%
- Ulangan Harian: 20%
- UTS: 20%
- UAS: 20%

CATATAN UNTUK AI PREDIKTOR:
----------------------------
1. BMW adalah program karir, BUKAN merek mobil.
2. Semua materi prediksi harus relevan dengan mata pelajaran yang dipilih.
3. Perhatikan pola: jika materi sebelumnya tentang "Routing", materi berikutnya
   kemungkinan tentang "Firewall" atau "VPN" (bukan kembali ke "Topologi").
4. Untuk mapel keahlian (SIJA/TJAT), prediksi harus spesifik ke sub-topik
   teknis, bukan topik umum.
5. Materi praktikum biasanya berurutan: instalasi → konfigurasi → testing → troubleshooting.
"""
