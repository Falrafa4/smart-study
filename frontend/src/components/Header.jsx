import { useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  const titleMap = {
    '/': 'Dashboard Utama',
    '/tugas': 'Rekapan Tugas',
    '/jadwal': 'Jadwal Pelajaran',
    '/rekomendasi': 'Prioritas AI',
    '/prediksi': 'Alur Materi'
  };

  const currentTitle = titleMap[location.pathname] || 'SmartStudy Workspace';

  return (
    <header className="pt-20 px-12 pb-6 relative z-10">
      <div>
        <span className="text-xs font-bold tracking-widest text-blue-500 uppercase mb-2 block">
          Workspace Dashboard
        </span>
        <h2 className="text-4xl font-extrabold tracking-tight text-gray-950">
          {currentTitle}
        </h2>
      </div>
    </header>
  );
}
