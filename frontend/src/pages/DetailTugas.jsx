import { useState } from 'react';

export default function DetailTugas() {
  const [difficulty, setDifficulty] = useState(3);

  return (
    <div className="space-y-8 max-w-4xl py-6 relative">
      
      {/* 1. Efek Glow Gradasi Blur di Background */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-10 pointer-events-none"></div>
      
      {/* Header */}
      <div className="relative z-10">
        <button className="text-gray-400 hover:text-gray-900 transition-colors text-sm font-medium mb-4 flex items-center gap-2">
          &larr; Kembali ke Dashboard
        </button>
      </div>

      {/* Form dengan gaya Modular & Elevasi */}
      <div className="relative z-10 bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-8 space-y-6 overflow-hidden">
        
        {/* 2. Aksen Garis Gradasi di Atas Card */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-600"></div>

        {/* Input Mata Pelajaran */}
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Mata Pelajaran</label>
          <input type="text" className="w-full bg-gray-50/50 border border-gray-200 rounded-xl p-4 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none" placeholder="Masukkan nama mata pelajaran..." />
        </div>

        {/* Input Materi */}
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Nama Materi</label>
          <textarea className="w-full bg-gray-50/50 border border-gray-200 rounded-xl p-4 h-32 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none resize-none" placeholder="Jelaskan detail tugas atau materi yang harus dipelajari..."></textarea>
        </div>

        {/* Baris bawah: Deadline & Kesulitan */}
        <div className="grid grid-cols-2 gap-8 items-end">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Deadline</label>
            <input type="date" className="w-full bg-gray-50/50 border border-gray-200 rounded-xl p-4 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Tingkat Kesulitan</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button 
                  key={n} 
                  type="button"
                  onClick={() => setDifficulty(n)} 
                  className={`w-12 h-12 rounded-xl font-bold transition-all ${
                    difficulty === n 
                      ? 'bg-gray-950 text-white shadow-xl shadow-gray-950/20' 
                      : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Tombol Simpan - Gradasi Biru Mewah */}
        <div className="pt-6">
          <button type="button" className="w-full bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-700 hover:via-blue-600 hover:to-indigo-700 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-blue-500/30 active:scale-[0.99]">
            Simpan Tugas ke Sistem
          </button>
        </div>
      </div>
    </div>
  );
}