import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const menus = [
    { 
      path: '/dashboard', 
      label: 'Dashboard',
      end: true,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      )
    },
    { 
      path: '/dashboard/tugas', 
      label: 'Rekapan Tugas',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    { 
      path: '/dashboard/jadwal', 
      label: 'Jadwal Pelajaran',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
      )
    },
    { 
      path: '/dashboard/rekomendasi', 
      label: 'Prioritas AI',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423-1.423z" />
        </svg>
      )
    },
    { 
      path: '/dashboard/prediksi', 
      label: 'Alur Materi',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      )
    },
  ];

  return (
    <aside className="w-[280px] flex-shrink-0 bg-cobalt-surface flex flex-col justify-between z-30 border-r border-gray-200 relative">
      <div className="flex flex-col h-full px-6 py-10">
        
        {/* Logo Branding */}
        <div className="flex flex-col items-center justify-center text-center mb-12">
          <div className="w-16 h-16 bg-cobalt-primary rounded-cobalt-lg flex items-center justify-center mb-5">
            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-cobalt-primary">
            SmartStudy
          </h1>
          <span className="text-[11px] font-bold text-cobalt-secondary tracking-[0.2em] uppercase mt-1">
            AI Task Manager
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {menus.map(menu => (
            <NavLink
              key={menu.path}
              to={menu.path}
              end={menu.end}
              className={({ isActive }) => 
                `w-full flex items-center gap-4 px-5 py-3 rounded-cobalt-md text-[0.95rem] transition-all duration-200 ${
                  isActive
                    ? 'bg-cobalt-primary text-white font-medium shadow-none'
                    : 'text-cobalt-secondary hover:bg-cobalt-neutral hover:text-cobalt-primary font-normal'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className={`${isActive ? 'text-white' : 'text-cobalt-secondary'}`}>
                    {menu.icon}
                  </div>
                  {menu.label}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Profil */}
        <div className="mt-8 pt-8 border-t border-gray-100">
          <div className="flex flex-col items-center text-center">
            <span className="text-sm font-bold text-cobalt-primary">Kevin Daniswara Raditya</span>
            <span className="text-xs font-medium text-cobalt-secondary mt-1">XI SIJA 1</span>
            <p className="text-[11px] text-cobalt-secondary mt-3 max-w-[200px] leading-relaxed">
              Sistem rekap dan manajemen tugas sekolah terintegrasi.
            </p>
          </div>
        </div>
        
      </div>
    </aside>
  );
}
