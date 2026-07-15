import { Link } from 'react-router-dom';
import Button from '../components/Button';

export default function Dashboard() {
  return (
    <div className="space-y-cobalt-lg">
      {/* Greeting */}
      <section>
        <h2 className="text-[2rem] font-bold tracking-[-0.02em] text-cobalt-primary">Halo, Kevin 👋</h2>
        <p className="text-cobalt-secondary text-[0.95rem] leading-[1.55]">Berikut rangkuman progres belajarmu hari ini.</p>
      </section>

      {/* Grid Cuplikan */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-cobalt-md">
        {/* Prioritas Tugas Card */}
        <div className="bg-cobalt-surface p-cobalt-lg rounded-cobalt-lg border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-cobalt-primary text-[0.95rem]">Prioritas Tugas</h3>
            <Link to="/rekomendasi" className="text-xs font-bold text-cobalt-tertiary hover:underline">Lihat Semua</Link>
          </div>
          <div className="space-y-3">
             <div className="p-3 bg-cobalt-neutral rounded-cobalt-sm text-cobalt-primary text-sm font-medium border border-gray-100">Matematika: Latihan Soal Hal 40</div>
             <div className="p-3 bg-cobalt-neutral rounded-cobalt-sm text-cobalt-primary text-sm font-medium border border-gray-100">Bahasa Inggris: Essay Chapter 2</div>
             <div className="p-3 bg-cobalt-neutral rounded-cobalt-sm text-cobalt-primary text-sm font-medium border border-gray-100">Fisika: Ringkasan Bab 3</div>
          </div>
        </div>

        {/* Prediksi Materi Card */}
        <div className="bg-cobalt-primary text-white p-cobalt-lg rounded-cobalt-lg flex flex-col justify-between">
          <div>
            <h3 className="text-gray-400 text-xs font-bold tracking-widest uppercase mb-2">Prediksi Materi Selanjutnya</h3>
            <p className="text-[2.25rem] font-bold tracking-tight mb-6">Integral Dasar</p>
          </div>
          <Link to="/prediksi">
            <Button 
              variant="neutral" 
              className="text-xs bg-white/10 hover:bg-white/20 text-white border-none px-4 py-2 w-fit"
            >
              Cek Detail Materi
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}