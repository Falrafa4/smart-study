import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function LandingPage() {
  const navigate = useNavigate();
  const handleLogin = () => navigate('/dashboard');

  const [scan, setScan] = useState({ x: 62, y: 38 });
  const handleScanMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setScan({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  // State dan Timer untuk Splash Screen
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  // Corner registration marks — the signature motif, reused across every panel
  const CornerMarks = ({ color = '#2452EB' }) => (
    <>
      <svg className="absolute -top-[7px] -left-[7px] w-4 h-4 pointer-events-none" viewBox="0 0 16 16" fill="none">
        <path d="M1 8V1H8" stroke={color} strokeWidth="1.5" />
      </svg>
      <svg className="absolute -top-[7px] -right-[7px] w-4 h-4 pointer-events-none" viewBox="0 0 16 16" fill="none">
        <path d="M15 8V1H8" stroke={color} strokeWidth="1.5" />
      </svg>
      <svg className="absolute -bottom-[7px] -left-[7px] w-4 h-4 pointer-events-none" viewBox="0 0 16 16" fill="none">
        <path d="M1 8V15H8" stroke={color} strokeWidth="1.5" />
      </svg>
      <svg className="absolute -bottom-[7px] -right-[7px] w-4 h-4 pointer-events-none" viewBox="0 0 16 16" fill="none">
        <path d="M15 8V15H8" stroke={color} strokeWidth="1.5" />
      </svg>
    </>
  );

  const features = [
    {
      layer: 'LAYER 01',
      title: 'Jadwal Terintegrasi',
      description: 'Simpan jadwal pelajaran dan kesibukanmu agar AI memahami konteks waktu belajarmu.',
      tint: '#EAF0FE',
      ink: '#2452EB',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
      ),
    },
    {
      layer: 'LAYER 02',
      title: 'Manajemen Tugas',
      description: 'Catat seluruh tugas, materi, deadline, dan tingkat kesulitan dengan mudah.',
      tint: '#E3ECFF',
      ink: '#13286B',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      layer: 'LAYER 03',
      title: 'Smart Task Priority',
      description: 'Sistem menghitung urutan pengerjaan tugas secara otomatis, didukung penjelasan natural dari AI mengapa tugas tersebut menjadi prioritas.',
      tint: '#DCE8FF',
      ink: '#0B3FA6',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423-1.423z" />
        </svg>
      ),
    },
    {
      layer: 'LAYER 04',
      title: 'AI Prediksi Materi',
      description: 'AI menganalisis 5 riwayat materi terakhirmu untuk memprediksi topik apa yang kemungkinan besar akan kamu pelajari selanjutnya.',
      tint: '#EAF6FF',
      ink: '#0A6FA8',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════
          SPLASH SCREEN / PRE-LOADER AREA
          ═══════════════════════════════════════════════════════════ */}
      {/* ═══════════════════════════════════════════════════════════
          SPLASH SCREEN / PRE-LOADER AREA (MOTION GRAPHIC EDITION)
          ═══════════════════════════════════════════════════════════ */}
      {/* ═══════════════════════════════════════════════════════════
          SPLASH SCREEN / PRE-LOADER AREA (MOTION GRAPHIC EDITION)
          ═══════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center overflow-hidden"
            // UBAH BAGIAN INI: Dari y: "-100vh" menjadi opacity: 0
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <div className="flex flex-col items-center">
              
              {/* Animasi Box Logo: Berputar dan Berubah Bentuk (Morphing) */}
              <motion.div
                initial={{ scale: 0, rotate: -90, borderRadius: "50%" }}
                animate={{ scale: 1, rotate: 0, borderRadius: "1rem" }}
                transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
                className="w-24 h-24 bg-gray-950 flex items-center justify-center shadow-2xl shadow-gray-900/30 z-10"
              >
                {/* Animasi Ikon: Garis digambar perlahan (Line Drawing) */}
                <motion.svg 
                  className="w-12 h-12 text-white" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <motion.path 
                    d="M12 2L2 7l10 5 10-5-10-5z" 
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
                  />
                  <motion.path 
                    d="M2 17l10 5 10-5" 
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.2, ease: "easeInOut", delay: 0.5 }}
                  />
                  <motion.path 
                    d="M2 12l10 5 10-5" 
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.2, ease: "easeInOut", delay: 0.7 }}
                  />
                </motion.svg>
              </motion.div>
              
              {/* Animasi Teks: Masked Reveal (Muncul dari balik lantai) */}
              <div className="overflow-hidden mt-6">
                <motion.div 
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.6 }}
                  className="flex flex-col items-center"
                >
                  <span className="font-display text-3xl font-extrabold text-gray-950 tracking-tight">SmartStudy</span>
                </motion.div>
              </div>

              {/* Progress Bar Indikator */}
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "140px", opacity: 1 }}
                transition={{ duration: 1, ease: "easeInOut", delay: 1 }}
                className="h-1 bg-gray-100 rounded-full overflow-hidden mt-5"
              >
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                  className="h-full bg-blue-600 rounded-full w-1/2"
                />
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════
          KONTEN LANDING PAGE UTAMA
          ═══════════════════════════════════════════════════════════ */}
      <motion.div 
        className="min-h-screen bg-white" 
        style={{ fontFamily: "'Inter', sans-serif" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: showSplash ? 0 : 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,500&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600&display=swap');
          .font-display { font-family: 'Fraunces', serif; }
          .font-data { font-family: 'JetBrains Mono', monospace; }
        `}</style>

        {/* NAVBAR */}
        <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/85 border-b border-[#DCE6FB]">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gray-950 rounded-xl flex items-center justify-center shadow-md shadow-gray-900/25">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="font-display text-xl font-semibold text-[#0B1B33] tracking-tight">SmartStudy</span>
            </div>
            <button
              onClick={handleLogin}
              className="bg-[#2452EB] hover:bg-[#1B3FC7] text-white rounded-xl px-5 py-2.5 text-sm font-bold shadow-lg shadow-[#2452EB]/20 hover:shadow-[#2452EB]/35 transition-all active:scale-95"
            >
              Masuk
            </button>
          </div>
        </nav>

        {/* HERO SECTION */}
        <section
          className="relative min-h-[88vh] flex items-center overflow-hidden"
          style={{
            backgroundColor: '#FFFFFF',
            backgroundImage:
              'linear-gradient(0deg, rgba(36,82,235,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(36,82,235,0.055) 1px, transparent 1px)',
            backgroundSize: '34px 34px',
          }}
        >
          <div className="absolute -top-24 right-0 w-[32rem] h-[32rem] bg-[#4C7BFF]/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 -left-16 w-96 h-96 bg-[#2452EB]/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <div className="inline-flex items-center gap-2 border border-dashed border-[#2452EB]/50 text-[#2452EB] rounded-full px-4 py-1.5 font-data text-[11px] font-semibold tracking-wide uppercase mb-6">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2452EB] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2452EB]"></span>
                </span>
                Cetak Biru Belajar · Aktif
              </div>

              <h1 className="font-display text-4xl md:text-5xl lg:text-[3.4rem] font-semibold text-[#0B1B33] tracking-tight leading-[1.12]">
                Cetak Biru Belajar Lebih{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2452EB] to-[#0A6FA8]">
                  Cerdas
                </span>{' '}
                dengan Bantuan AI
              </h1>

              <p className="text-lg text-[#4A5875] max-w-lg mt-6 leading-relaxed">
                Tingkatkan produktivitas belajarmu. Biarkan AI merancang prioritas tugasmu dan memprediksi materi yang akan kamu pelajari selanjutnya — seakurat gambar teknik.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  onClick={handleLogin}
                  className="group inline-flex items-center gap-2 bg-[#2452EB] hover:bg-[#1B3FC7] text-white rounded-2xl px-8 py-4 text-base font-bold shadow-xl shadow-[#2452EB]/25 hover:shadow-[#2452EB]/40 transition-all active:scale-[0.98]"
                >
                  Coba SmartStudy Sekarang
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </button>
                <a
                  href="#fitur"
                  className="text-sm font-semibold text-[#4A5875] hover:text-[#0B1B33] transition-colors underline underline-offset-4 decoration-[#2452EB]/30"
                >
                  Lihat lapisan fitur
                </a>
              </div>
            </motion.div>

            <motion.div
              className="relative h-[440px] hidden lg:block"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              onMouseMove={handleScanMove}
            >
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none transition-[background] duration-150"
                style={{
                  background: `radial-gradient(420px circle at ${scan.x}% ${scan.y}%, rgba(36,82,235,0.16), transparent 65%)`,
                }}
              />

              <svg className="absolute -top-2 right-16 w-8 h-8 text-[#2452EB]/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="9" strokeDasharray="2 3" />
                <path strokeLinecap="round" d="M12 3v3M12 18v3M3 12h3M18 12h3" />
                <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
              </svg>

              <div className="absolute top-8 right-8 bg-white border-2 border-[#2452EB]/25 rounded-lg shadow-xl shadow-[#2452EB]/10 p-5 w-64 rotate-2">
                <CornerMarks color="#2452EB" />
                <div className="flex items-center justify-between mb-4">
                  <span className="font-data text-[11px] font-semibold text-[#2452EB] uppercase tracking-wide">Jadwal Hari Ini</span>
                  <span className="font-data text-[9px] text-[#9AAEDD]">01:A</span>
                </div>
                <div className="space-y-2.5">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-8 bg-[#2452EB]/60 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-2.5 bg-[#0B1B33]/80 rounded-full w-24 mb-1.5"></div>
                      <div className="h-2 bg-[#2452EB]/25 rounded-full w-16"></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-8 bg-[#2452EB]/30 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-2.5 bg-[#0B1B33]/60 rounded-full w-20 mb-1.5"></div>
                      <div className="h-2 bg-[#2452EB]/20 rounded-full w-14"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute top-40 left-0 bg-[#EAF0FE] border-2 border-[#13286B]/20 rounded-lg shadow-xl shadow-[#13286B]/10 p-5 w-56 -rotate-1">
                <CornerMarks color="#13286B" />
                <div className="flex items-center justify-between mb-1">
                  <span className="font-data text-[11px] font-semibold text-[#13286B] uppercase tracking-wide">Prioritas AI</span>
                  <span className="font-data text-[9px] text-[#7A8FC9]">02:B</span>
                </div>
                <div className="space-y-2.5 mt-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-md bg-[#13286B] flex items-center justify-center">
                      <span className="font-data text-[10px] font-bold text-white">1</span>
                    </div>
                    <div className="flex-1">
                      <div className="h-2.5 bg-[#13286B]/70 rounded-full w-28 mb-1"></div>
                      <div className="h-2 bg-[#13286B]/25 rounded-full w-16"></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-md bg-[#13286B]/40 flex items-center justify-center">
                      <span className="font-data text-[10px] font-bold text-[#13286B]">2</span>
                    </div>
                    <div className="flex-1">
                      <div className="h-2.5 bg-[#13286B]/50 rounded-full w-24 mb-1"></div>
                      <div className="h-2 bg-[#13286B]/20 rounded-full w-20"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-6 right-2 bg-[#0B1B33] border border-[#4C7BFF]/40 rounded-2xl shadow-2xl shadow-[#2452EB]/20 p-5 w-56 rotate-1">
                <CornerMarks color="#4C7BFF" />
                <div className="flex items-center gap-2 mb-3">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-[#4C7BFF] animate-pulse" />
                  <span className="font-data text-[11px] font-semibold text-[#8FB0FF] uppercase tracking-wide">Prediksi AI</span>
                </div>
                <p className="font-display text-white font-semibold text-lg leading-tight mb-2">
                  Integral Dasar
                </p>
                <div className="bg-white/10 rounded-lg px-3 py-2 border border-white/15">
                  <div className="h-2 bg-[#4C7BFF]/60 rounded-full w-full mb-1.5"></div>
                  <div className="h-2 bg-[#4C7BFF]/30 rounded-full w-3/4"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FEATURES */}
        <section
          id="fitur"
          className="relative py-24"
          style={{
            backgroundColor: '#F7F9FF',
            backgroundImage: 'radial-gradient(rgba(36,82,235,0.08) 1px, transparent 1px)',
            backgroundSize: '18px 18px',
          }}
        >
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="font-data text-[11px] font-semibold text-[#2452EB] uppercase tracking-[0.2em]">Lapisan Sistem</span>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#0B1B33] tracking-tight mt-3">
                Fitur Unggulan SmartStudy
              </h2>
              <p className="text-[#4A5875] mt-3 text-base max-w-lg mx-auto">
                Solusi lengkap untuk mengelola semua aspek kegiatan belajarmu, disusun seperti lapisan dalam satu cetak biru.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="relative bg-white rounded-xl border border-[#DCE6FB] shadow-sm p-6 pt-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-[#2452EB]/30"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <CornerMarks color={feature.ink} />
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: feature.tint, color: feature.ink }}
                    >
                      {feature.icon}
                    </div>
                    <span className="font-data text-[10px] font-semibold tracking-wide" style={{ color: feature.ink }}>
                      {feature.layer}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-base mb-2 tracking-tight" style={{ color: feature.ink }}>
                    {feature.title}
                  </h3>
                  <p className="text-[#4A5875] text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CLOSING CTA BAND */}
        <section className="relative py-20 bg-white overflow-hidden">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[36rem] h-64 bg-[#2452EB]/10 rounded-full blur-[100px] pointer-events-none" />
          <motion.div
            className="relative max-w-2xl mx-auto px-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#0B1B33] tracking-tight">
              Siap merancang cara belajarmu malam ini?
            </h2>
            <p className="text-[#4A5875] mt-4 text-base">
              Buka cetak birunya, biar AI yang atur prioritasnya.
            </p>
            <button
              onClick={handleLogin}
              className="mt-8 inline-flex items-center gap-2 bg-[#2452EB] hover:bg-[#1B3FC7] text-white rounded-2xl px-8 py-4 text-base font-bold shadow-xl shadow-[#2452EB]/25 hover:shadow-[#2452EB]/40 transition-all active:scale-[0.98]"
            >
              Coba SmartStudy Sekarang
            </button>
          </motion.div>
        </section>

        {/* FOOTER */}
        <footer className="bg-white border-t border-[#DCE6FB] py-12">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <div className="flex items-center justify-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-gray-950 rounded-xl flex items-center justify-center shadow-md shadow-gray-900/25">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="font-display font-semibold text-[#0B1B33] text-sm tracking-tight">SmartStudy</span>
            </div>
            <p className="text-[#4A5875] text-sm font-medium">
              Developed by <span className="font-bold text-[#0B1B33]">Team Pancadewa</span> — XII SIJA SMK Telkom Sidoarjo
            </p>
          </div>
        </footer>
      </motion.div>
    </>
  );
}