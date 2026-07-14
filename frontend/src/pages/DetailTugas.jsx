import { useState } from 'react'

export default function DetailTugas() {
  const [difficulty, setDifficulty] = useState(3)

  return (
    <div className="animate-fade-in max-w-2xl">
      <h2 className="text-3xl font-bold tracking-tight mb-2">Input Tugas Baru</h2>
      <p className="text-cobalt-secondary text-[0.95rem] mb-8">Masukkan detail tugas sekolahmu di sini.</p>
      
      <div className="bg-cobalt-surface p-8 rounded-xl border border-gray-100 shadow-sm">
        <form className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold tracking-wider text-cobalt-secondary mb-2">MATA PELAJARAN</label>
              <input type="text" placeholder="Matematika" className="w-full bg-cobalt-neutral border-none rounded-md p-3 text-[0.95rem] focus:ring-2 focus:ring-cobalt-tertiary" />
            </div>
            <div>
              <label className="block text-xs font-semibold tracking-wider text-cobalt-secondary mb-2">DEADLINE</label>
              <input type="date" className="w-full bg-cobalt-neutral border-none rounded-md p-3 text-[0.95rem] text-cobalt-secondary focus:ring-2 focus:ring-cobalt-tertiary" />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-semibold tracking-wider text-cobalt-secondary mb-2">NAMA MATERI / TUGAS</label>
            <input type="text" placeholder="Latihan Soal Trigonometri Hal 40" className="w-full bg-cobalt-neutral border-none rounded-md p-3 text-[0.95rem] focus:ring-2 focus:ring-cobalt-tertiary" />
          </div>

          <div>
            <label className="block text-xs font-semibold tracking-wider text-cobalt-secondary mb-3">TINGKAT KESULITAN (1 Sangat Mudah - 5 Sangat Sulit)</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(num => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setDifficulty(num)}
                  className={`w-12 h-12 rounded-md font-bold transition-all ${
                    difficulty === num 
                      ? 'bg-cobalt-primary text-white' 
                      : 'bg-cobalt-neutral text-cobalt-secondary hover:bg-gray-200'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <button type="button" className="bg-cobalt-tertiary text-white py-3 px-6 rounded-md text-[0.95rem] font-medium hover:bg-blue-700 transition-colors">
              Simpan Tugas
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}