import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function MainLayout() {
  // 1. Panggil hook useLocation untuk melacak perubahan URL
  const location = useLocation();

  return (
    <div className="flex h-screen bg-cobalt-surface text-cobalt-primary font-sans overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full bg-cobalt-neutral overflow-hidden">
        {/* Header */}
        <Header />

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto">
          {/* 
            2. Sisipkan key={location.pathname} dan class 'animate-fade-in' 
            Trik ini memaksa komponen untuk re-render dari awal tiap ganti menu,
            sehingga animasinya selalu terpicu.
          */}
          <div key={location.pathname} className="px-12 pb-20 pt-4 max-w-5xl animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}