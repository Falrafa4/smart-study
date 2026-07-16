import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function LandingPage() {
  const navigate = useNavigate();
  const handleLogin = () => navigate('/dashboard');

  const features = [
    {
      title: 'Jadwal Terintegrasi',
      description: 'Simpan jadwal pelajaran dan kesibukanmu agar AI memahami konteks waktu belajarmu.',
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
      ),
    },
    {
      title: 'Manajemen Tugas',
      description: 'Catat seluruh tugas, materi, deadline, dan tingkat kesulitan dengan mudah.',
      iconBg: 'bg-indigo-50',
      iconColor: 'text-indigo-600',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      title: 'Smart Task Priority',
      description: 'Sistem menghitung urutan pengerjaan tugas secara otomatis, didukung penjelasan natural dari AI mengapa tugas tersebut menjadi prioritas.',
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423-1.423z" />
        </svg>
      ),
    },
    {
      title: 'AI Prediksi Materi',
      description: 'AI menganalisis 5 riwayat materi terakhirmu untuk memprediksi topik apa yang kemungkinan besar akan kamu pelajari selanjutnya.',
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ═══════════════════════════════════════════════════════════
          NAVBAR
          ═══════════════════════════════════════════════════════════ */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-100/50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gray-950 rounded-xl flex items-center justify-center shadow-md shadow-gray-900/20">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-xl font-extrabold text-blue-600 tracking-tight">SmartStudy AI</span>
          </div>
          <button
            onClick={handleLogin}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-5 py-2.5 text-sm font-semibold shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 transition-all active:scale-95"
          >
            Login
          </button>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-gray-50 min-h-[85vh] flex items-center overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">

          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 rounded-full px-4 py-1.5 text-xs font-bold tracking-wide uppercase mb-6">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              AI-Powered Study Manager
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
              Manajemen Tugas Sekolah Lebih{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Cerdas
              </span>{' '}
              dengan Bantuan AI
            </h1>

            <p className="text-lg text-gray-500 max-w-lg mt-6 leading-relaxed">
              Tingkatkan produktivitas belajarmu. Biarkan AI menganalisis prioritas tugasmu dan memprediksi materi yang akan kamu pelajari selanjutnya.
            </p>

            <button
              onClick={handleLogin}
              className="mt-8 inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl px-8 py-4 text-base font-bold shadow-xl shadow-blue-600/25 hover:shadow-blue-600/35 transition-all active:scale-[0.98]"
            >
              Coba SmartStudy Sekarang
              <span className="text-lg">🚀</span>
            </button>
          </motion.div>

          {/* Right: Abstract Mockup (Desktop Only) */}
          <motion.div
            className="relative h-[420px] hidden lg:block"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            {/* Card 1 — Schedule Mockup (back) */}
            <div className="absolute top-0 right-8 bg-white rounded-2xl shadow-xl border border-gray-100 p-5 w-64 rotate-3">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                </div>
                <span className="text-xs font-bold text-gray-900">Jadwal Hari Ini</span>
              </div>
              <div className="space-y-2.5">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-8 bg-blue-400 rounded-full"></div>
                  <div className="flex-1 bg-gray-50 rounded-lg px-3 py-2">
                    <div className="h-2.5 bg-gray-900 rounded-full w-24 mb-1.5"></div>
                    <div className="h-2 bg-gray-300 rounded-full w-16"></div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-8 bg-indigo-400 rounded-full"></div>
                  <div className="flex-1 bg-gray-50 rounded-lg px-3 py-2">
                    <div className="h-2.5 bg-gray-900 rounded-full w-20 mb-1.5"></div>
                    <div className="h-2 bg-gray-300 rounded-full w-14"></div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-8 bg-teal-400 rounded-full"></div>
                  <div className="flex-1 bg-gray-50 rounded-lg px-3 py-2">
                    <div className="h-2.5 bg-gray-900 rounded-full w-28 mb-1.5"></div>
                    <div className="h-2 bg-gray-300 rounded-full w-12"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 — Task List (middle, offset left) */}
            <div className="absolute top-28 left-0 bg-white rounded-2xl shadow-xl border border-gray-100 p-5 w-56 -rotate-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                </div>
                <span className="text-xs font-bold text-gray-900">Prioritas AI</span>
              </div>
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-md bg-red-50 border border-red-200 flex items-center justify-center">
                    <span className="text-[10px] font-black text-red-500">1</span>
                  </div>
                  <div className="flex-1">
                    <div className="h-2.5 bg-gray-900 rounded-full w-28 mb-1"></div>
                    <div className="h-2 bg-gray-200 rounded-full w-16"></div>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-md bg-amber-50 border border-amber-200 flex items-center justify-center">
                    <span className="text-[10px] font-black text-amber-500">2</span>
                  </div>
                  <div className="flex-1">
                    <div className="h-2.5 bg-gray-900 rounded-full w-24 mb-1"></div>
                    <div className="h-2 bg-gray-200 rounded-full w-20"></div>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-md bg-blue-50 border border-blue-200 flex items-center justify-center">
                    <span className="text-[10px] font-black text-blue-500">3</span>
                  </div>
                  <div className="flex-1">
                    <div className="h-2.5 bg-gray-900 rounded-full w-20 mb-1"></div>
                    <div className="h-2 bg-gray-200 rounded-full w-12"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 — AI Prediction (front, accent) */}
            <div className="absolute bottom-8 right-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-xl shadow-blue-600/30 p-5 w-52 rotate-1">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-5 h-5 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423-1.423z" />
                </svg>
                <span className="text-xs font-bold text-white/90">Prediksi AI</span>
              </div>
              <p className="text-white font-extrabold text-lg leading-tight mb-2">
                Integral Dasar
              </p>
              <div className="bg-white/15 backdrop-blur-sm rounded-lg px-3 py-2">
                <div className="h-2 bg-white/30 rounded-full w-full mb-1.5"></div>
                <div className="h-2 bg-white/20 rounded-full w-3/4"></div>
              </div>
            </div>

            {/* Ambient glow */}
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-blue-400/15 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="absolute bottom-0 -left-10 w-48 h-48 bg-indigo-400/15 rounded-full blur-[60px] pointer-events-none"></div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FEATURES GRID
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Fitur Unggulan SmartStudy AI
            </h2>
            <p className="text-gray-500 mt-3 text-base max-w-lg mx-auto">
              Solusi lengkap untuk mengelola semua aspek kegiatan belajarmu.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300 p-6 group"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={`w-12 h-12 ${feature.iconBg} rounded-2xl flex items-center justify-center ${feature.iconColor} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="font-bold text-gray-900 text-base mb-2 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════════════════════════ */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2.5 mb-4">
            <div className="w-7 h-7 bg-gray-950 rounded-lg flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="font-bold text-gray-900 text-sm tracking-tight">SmartStudy AI</span>
          </div>
          <p className="text-gray-500 text-sm font-medium">
            Developed by <span className="font-bold text-gray-700">Team Gataunamanyaapa</span> — XII SIJA SMK Telkom Sidoarjo
          </p>
        </div>
      </footer>

    </div>
  );
}
