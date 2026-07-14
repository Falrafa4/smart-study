import { useState } from 'react'
import JadwalMapel from './pages/JadwalMapel'
import DetailTugas from './pages/DetailTugas'
import RekomendasiTugas from './pages/RekomendasiTugas'
import PrediksiMateri from './pages/PrediksiMateri'

export default function App() {
  const [activePage, setActivePage] = useState('jadwal')

  const menus = [
    { id: 'jadwal', label: 'Jadwal Pelajaran' },
    { id: 'tugas', label: 'Input Tugas' },
    { id: 'rekomendasi', label: 'Rekomendasi AI' },
    { id: 'prediksi', label: 'Prediksi Materi' },
  ]

  return (
    <div className="flex min-h-screen bg-cobalt-neutral font-sans text-cobalt-primary">
      {/* Sidebar Notion-style */}
      <aside className="w-64 bg-cobalt-surface border-r border-gray-200 fixed h-full flex flex-col">
        <div className="p-6">
          <h1 className="text-xl font-bold tracking-tight mb-8">SmartStudy AI.</h1>
          <nav className="flex flex-col gap-2">
            {menus.map(menu => (
              <button
                key={menu.id}
                onClick={() => setActivePage(menu.id)}
                className={`text-left px-4 py-2 rounded-md text-[0.95rem] transition-colors ${
                  activePage === menu.id 
                    ? 'bg-cobalt-neutral text-cobalt-tertiary font-semibold' 
                    : 'text-cobalt-secondary hover:bg-gray-50'
                }`}
              >
                {menu.label}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="ml-64 flex-1 p-12 max-w-5xl">
        {activePage === 'jadwal' && <JadwalMapel />}
        {activePage === 'tugas' && <DetailTugas />}
        {activePage === 'rekomendasi' && <RekomendasiTugas />}
        {activePage === 'prediksi' && <PrediksiMateri />}
      </main>
    </div>
  )
}