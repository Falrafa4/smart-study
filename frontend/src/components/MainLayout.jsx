import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function MainLayout() {
  const location = useLocation();
  // State untuk mengontrol buka/tutup menu di HP
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Efek pintar: Otomatis menutup sidebar di HP setiap kali kamu pindah halaman
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-cobalt-surface text-cobalt-primary font-sans overflow-hidden w-full relative">
      
      {/* 1. OVERLAY GELAP (Hanya Muncul di HP saat menu terbuka) */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-gray-950/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)} // Klik area luar untuk menutup
        ></div>
      )}

      {/* 2. WRAPPER SIDEBAR (Responsif) */}
      {/* Di HP: Mengambang & disembunyikan ke kiri (-translate-x-full). Di Laptop: Nempel (relative) */}
      <aside className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}`}>
        <Sidebar />
      </aside>

      {/* 3. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-full bg-cobalt-neutral overflow-hidden relative w-full">
        
        {/* MOBILE TOP BAR (Pengganti Header di HP) */}
        <div className="lg:hidden flex items-center justify-between bg-white px-5 py-4 border-b border-gray-100 z-30 shadow-sm">
          <div className="flex items-center gap-3">
            {/* Logo Mini SmartStudy */}
            <div className="w-8 h-8 bg-gray-950 rounded-lg flex items-center justify-center shadow-md shadow-gray-900/20">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
            </div>
            <span className="font-extrabold text-gray-900 text-lg tracking-tight">SmartStudy</span>
          </div>
          
          {/* Tombol Hamburger */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2.5 bg-gray-50 text-gray-700 rounded-xl hover:bg-gray-100 active:scale-95 transition-all border border-gray-200"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* HEADER DESKTOP (Disembunyikan di HP agar tidak menumpuk) */}
        <div className="hidden lg:block">
          <Header />
        </div>

        {/* 4. SCROLLABLE CONTENT */}
        <main className="flex-1 overflow-y-auto relative z-10 w-full">
          <div key={location.pathname} className="px-4 md:px-8 lg:px-12 pb-20 pt-6 md:pt-8 max-w-6xl mx-auto animate-fade-in">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
}