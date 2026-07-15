import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function MainLayout() {
  return (
    <div className="flex h-screen bg-white text-[#111111] font-sans selection:bg-blue-600 selection:text-white overflow-hidden">
      
      {/* Sidebar Modular */}
      <Sidebar />

      {/* Area Konten Utama */}
      <div className="flex-1 flex flex-col h-full relative bg-gradient-to-br from-slate-50 via-gray-50 to-indigo-50/30 overflow-hidden">
        
        {/* Glow Effects */}
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-400/20 rounded-full mix-blend-multiply filter blur-[120px] pointer-events-none z-0"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-400/15 rounded-full mix-blend-multiply filter blur-[120px] pointer-events-none z-0"></div>
        
        {/* Header Modular */}
        <Header />

        {/* Dynamic Outlet */}
        <main className="flex-1 overflow-y-auto relative z-10">
          <div className="px-12 pb-20 pt-4 max-w-5xl">
            <Outlet />
          </div>
        </main>
        
      </div>
    </div>
  );
}
