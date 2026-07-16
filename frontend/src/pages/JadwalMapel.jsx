import { useState } from 'react';

export default function JadwalMapel() {
  const [schedules, setSchedules] = useState([
    { id: 1, hari: 'Senin', jam: '07:00', mapel: 'Matematika Tingkat Lanjut' },
    { id: 2, hari: 'Selasa', jam: '08:30', mapel: 'Pemrograman Web & Perangkat Bergerak' },
    { id: 3, hari: 'Rabu', jam: '10:00', mapel: 'Administrasi Infrastruktur Jaringan' }
  ]);

  const [hari, setHari] = useState('Senin');
  const [jam, setJam] = useState('');
  const [mapel, setMapel] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!jam || !mapel) return;
    
    const newSchedule = { id: Date.now(), hari, jam, mapel };
    setSchedules([...schedules, newSchedule]);
    setJam(''); setMapel('');
  };

  const handleDelete = (id) => {
    setSchedules(schedules.filter(schedule => schedule.id !== id));
  };

  const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

  return (
    <div className="space-y-6 md:space-y-8 w-full">
      
      {/* Deskripsi */}
      <p className="text-gray-500 text-sm md:text-[0.95rem] -mt-2">
        Atur jadwal agar AI memahami konteks waktu belajar kamu.
      </p>

      {/* Grid Layout: Stack di HP (1 kolom), jadi 12 Kolom di Laptop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-8 items-start w-full">
        
        {/* KARTU FORM INPUT */}
        <div className="lg:col-span-4 bg-white p-5 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] lg:sticky lg:top-6">
          <h3 className="font-bold text-gray-900 text-base md:text-lg tracking-tight mb-5 md:mb-6">Tambah Jadwal</h3>
          
          <form onSubmit={handleAdd} className="space-y-4 md:space-y-5">
            <div>
              <label className="block text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 md:mb-2">Hari</label>
              <div className="relative">
                <select 
                  value={hari} onChange={(e) => setHari(e.target.value)}
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-xl p-3 md:p-3.5 appearance-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none text-sm font-medium text-gray-700"
                >
                  {days.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 md:mb-2">Jam</label>
              <input 
                type="time" value={jam} onChange={(e) => setJam(e.target.value)} required
                className="w-full bg-gray-50/50 border border-gray-200 rounded-xl p-3 md:p-3.5 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none text-sm font-medium text-gray-700"
              />
            </div>

            <div>
              <label className="block text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 md:mb-2">Mata Pelajaran</label>
              <input 
                type="text" value={mapel} onChange={(e) => setMapel(e.target.value)} required
                placeholder="Misal: Fisika Terapan..." 
                className="w-full bg-gray-50/50 border border-gray-200 rounded-xl p-3 md:p-3.5 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none text-sm font-medium text-gray-700"
              />
            </div>

            <div className="pt-1 md:pt-2">
              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-700 hover:via-blue-600 hover:to-indigo-700 text-white font-semibold py-3 md:py-3.5 rounded-xl transition-all shadow-xl shadow-blue-500/30 active:scale-[0.99] text-sm"
              >
                Simpan Jadwal
              </button>
            </div>
          </form>
        </div>

        {/* KARTU DAFTAR JADWAL */}
        <div className="lg:col-span-8 bg-white p-5 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] w-full">
          <div className="flex justify-between items-center mb-5 md:mb-6">
            <h3 className="font-bold text-gray-900 text-base md:text-lg tracking-tight">Daftar Kelas</h3>
            <span className="bg-blue-50 text-blue-600 py-1 px-2.5 md:px-3 rounded-lg text-[10px] md:text-[11px] font-bold tracking-widest uppercase">
              {schedules.length} Kelas
            </span>
          </div>

          <div className="space-y-3">
            {schedules.length === 0 ? (
              <div className="text-center py-8 md:py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <p className="text-gray-400 font-medium text-sm">Belum ada jadwal yang ditambahkan.</p>
              </div>
            ) : (
              schedules.map((item) => (
                <div key={item.id} className="group flex items-center justify-between p-3.5 md:p-4 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-lg hover:shadow-gray-200/50 border border-transparent hover:border-gray-100 transition-all">
                  
                  <div className="flex items-center gap-3 md:gap-4">
                    {/* Badge Hari diperkecil di HP */}
                    <div className="flex flex-col items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl shadow-sm border border-gray-100 text-blue-600 group-hover:scale-105 md:group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <span className="text-[9px] md:text-[10px] font-bold tracking-widest uppercase">{item.hari.slice(0,3)}</span>
                    </div>
                    
                    <div>
                      {/* Teks bisa memanjang ke bawah di HP jika terlalu panjang */}
                      <h4 className="font-semibold text-gray-800 text-sm md:text-[1.05rem] group-hover:text-blue-700 transition-colors leading-tight line-clamp-2 md:line-clamp-none">
                        {item.mapel}
                      </h4>
                      <div className="flex items-center gap-1.5 text-xs md:text-sm font-medium text-gray-500 mt-0.5 md:mt-1">
                        <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        {item.jam}
                      </div>
                    </div>
                  </div>

                  {/* Tombol Delete akan selalu sedikit terlihat di HP agar bisa ditap (sentuh), tapi full opacity di Hover laptop */}
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="opacity-100 md:opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-xl transition-all"
                    title="Hapus Jadwal"
                  >
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>

                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}