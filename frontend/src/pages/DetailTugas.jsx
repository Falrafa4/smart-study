import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

export default function DetailTugas() {
  const [difficulty, setDifficulty] = useState(3);

  return (
    <div className="space-y-cobalt-md py-4">
      {/* Header */}
      <div>
        <Link 
          to="/" 
          className="text-cobalt-secondary hover:text-cobalt-primary transition-colors text-sm font-medium flex items-center gap-2"
        >
          &larr; Kembali ke Dashboard
        </Link>
      </div>

      {/* Form Card */}
      <div className="bg-cobalt-surface rounded-cobalt-lg border border-gray-200 p-cobalt-lg space-y-6">
        {/* Input Mata Pelajaran */}
        <div>
          <label className="block text-[0.75rem] font-bold text-cobalt-secondary uppercase tracking-[0.02em] mb-2">Mata Pelajaran</label>
          <input 
            type="text" 
            className="w-full bg-cobalt-neutral border border-gray-200 rounded-cobalt-md p-4 text-cobalt-primary focus:ring-2 focus:ring-cobalt-tertiary focus:border-cobalt-tertiary transition-all outline-none" 
            placeholder="Masukkan nama mata pelajaran..." 
          />
        </div>

        {/* Input Materi */}
        <div>
          <label className="block text-[0.75rem] font-bold text-cobalt-secondary uppercase tracking-[0.02em] mb-2">Nama Materi</label>
          <textarea 
            className="w-full bg-cobalt-neutral border border-gray-200 rounded-cobalt-md p-4 h-32 text-cobalt-primary focus:ring-2 focus:ring-cobalt-tertiary focus:border-cobalt-tertiary transition-all outline-none resize-none" 
            placeholder="Jelaskan detail tugas atau materi yang harus dipelajari..."
          />
        </div>

        {/* Deadline & Kesulitan */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[0.75rem] font-bold text-cobalt-secondary uppercase tracking-[0.02em] mb-2">Deadline</label>
            <input 
              type="date" 
              className="w-full bg-cobalt-neutral border border-gray-200 rounded-cobalt-md p-4 text-cobalt-primary focus:ring-2 focus:ring-cobalt-tertiary focus:border-cobalt-tertiary transition-all outline-none" 
            />
          </div>
          <div>
            <label className="block text-[0.75rem] font-bold text-cobalt-secondary uppercase tracking-[0.02em] mb-2">Tingkat Kesulitan</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <Button 
                  key={n} 
                  variant={difficulty === n ? 'dark' : 'neutral'}
                  onClick={() => setDifficulty(n)} 
                  className="w-12 h-12 rounded-cobalt-md"
                >
                  {n}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Tombol Simpan (Primary Action) */}
        <div className="pt-4">
          <Button 
            type="button" 
            variant="primary" 
            className="w-full"
          >
            Simpan Tugas ke Sistem
          </Button>
        </div>
      </div>
    </div>
  );
}