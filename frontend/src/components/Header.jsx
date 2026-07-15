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
    <header className="pt-16 px-12 pb-4">
      <div>
        <span className="text-[0.75rem] font-semibold tracking-[0.02em] text-cobalt-secondary uppercase mb-1 block">
          Workspace Dashboard
        </span>
        <h2 className="text-[2rem] font-bold tracking-[-0.02em] text-cobalt-primary leading-tight">
          {currentTitle}
        </h2>
      </div>
    </header>
  );
}
