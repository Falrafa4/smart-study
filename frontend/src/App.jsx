import { useState } from 'react'
import JadwalMapel from './pages/JadwalMapel'
import DetailTugas from './pages/DetailTugas'
import RekomendasiTugas from './pages/RekomendasiTugas'
import PrediksiMateri from './pages/PrediksiMateri'

export default function App() {
  const [activePage, setActivePage] = useState('tugas')

  const menus = [
    { 
      id: 'tugas', 
      label: 'Rekapan Tugas',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    { 
      id: 'jadwal', 
      label: 'Jadwal Pelajaran',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
      )
    },
    { 
      id: 'rekomendasi', 
      label: 'Prioritas AI',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
        </svg>
      )
    },
    { 
      id: 'prediksi', 
      label: 'Alur Materi',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      )
    },
  ]

  const activeMenuLabel = menus.find(m => m.id === activePage)?.label;

  return (
    <div className="flex h-screen bg-white text-[#111111] font-sans selection:bg-blue-600 selection:text-white overflow-hidden">
      
      {/* Sidebar Tetap Clean Minimalist */}
      <aside className="w-[280px] flex-shrink-0 bg-white flex flex-col justify-between z-30 shadow-[4px_0_24px_rgba(0,0,0,0.03)] border-r border-gray-100 relative">
        <div className="flex flex-col h-full px-6 py-10">
          
          {/* Logo Branding */}
          <div className="flex flex-col items-center justify-center text-center mb-12">
            <div className="w-16 h-16 bg-gray-950 rounded-2xl flex items-center justify-center mb-5 shadow-xl shadow-gray-900/10">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <h1 className="text-xl font-extrabold tracking-tight text-gray-950">
              SmartStudy
            </h1>
            <span className="text-[11px] font-bold text-gray-400 tracking-[0.2em] uppercase mt-1">
              AI Task Manager
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {menus.map(menu => (
              <button
                key={menu.id}
                onClick={() => setActivePage(menu.id)}
                className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl text-[0.95rem] transition-all duration-300 ${
                  activePage === menu.id
                    ? 'bg-gray-950 text-white shadow-lg shadow-gray-900/15 font-medium scale-[1.02]'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-950 font-normal'
                }`}
              >
                <div className={`${activePage === menu.id ? 'text-white' : 'text-gray-400'}`}>
                  {menu.icon}
                </div>
                {menu.label}
              </button>
            ))}
          </nav>

          {/* Profil */}
          <div className="mt-8 pt-8 border-t border-gray-100">
            <div className="flex flex-col items-center text-center">
              <span className="text-sm font-bold text-gray-950">Kevin Daniswara Raditya</span>
              <span className="text-xs font-medium text-gray-500 mt-1">XI SIJA 1</span>
              <p className="text-[11px] text-gray-400 mt-3 max-w-[200px] leading-relaxed">
                Sistem rekap dan manajemen tugas sekolah terintegrasi.
              </p>
            </div>
          </div>
          
        </div>
      </aside>

      {/* AREA KONTEN UTAMA - Dengan Efek Mesh Gradient Background */}
      <div className="flex-1 flex flex-col h-full relative bg-gradient-to-br from-slate-50 via-gray-50 to-indigo-50/30 overflow-hidden">
        
        {/* === EFEK GRADASI BACKGROUND DI SINI === */}
        {/* Lampu Sorot Biru Kanan Atas */}
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-400/20 rounded-full mix-blend-multiply filter blur-[120px] pointer-events-none z-0"></div>
        {/* Lampu Sorot Indigo Kiri Bawah */}
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-400/15 rounded-full mix-blend-multiply filter blur-[120px] pointer-events-none z-0"></div>
        
        {/* Header - Tambahkan relative & z-10 agar berada di atas efek gradasi */}
        <header className="pt-20 px-12 pb-6 relative z-10">
          <div>
            <span className="text-xs font-bold tracking-widest text-blue-500 uppercase mb-2 block">
              Workspace Dashboard
            </span>
            <h2 className="text-4xl font-extrabold tracking-tight text-gray-950">
              {activeMenuLabel}
            </h2>
          </div>
        </header>

        {/* Scrollable Content - Tambahkan relative & z-10 */}
        <main className="flex-1 overflow-y-auto relative z-10">
          <div className="px-12 pb-20 pt-4 max-w-5xl animate-fade-in">
            {activePage === 'jadwal' && <JadwalMapel />}
            {activePage === 'tugas' && <DetailTugas />}
            {activePage === 'rekomendasi' && <RekomendasiTugas />}
            {activePage === 'prediksi' && <PrediksiMateri />}
          </div>
        </main>
        
      </div>
    </div>
  )
}