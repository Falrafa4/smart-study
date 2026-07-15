import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

export default function Dashboard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="space-y-8"
    >
      {/* Greeting */}
      <section>
        <h2 className="text-2xl font-bold text-black">Halo, Kevin 👋</h2>
        <p className="text-gray-500">Berikut rangkuman progres belajarmu hari ini.</p>
      </section>

      {/* Grid Cuplikan */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Prioritas AI (Cuplikan) */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold">Prioritas Tugas</h3>
            <Link to="/rekomendasi" className="text-xs font-bold text-blue-600 hover:underline">Lihat Semua</Link>
          </div>
          <div className="space-y-3">
             {/* Simulasi List 3 item */}
             <div className="p-3 bg-gray-50 rounded-xl text-sm font-medium">Matematika: Latihan Soal Hal 40</div>
             <div className="p-3 bg-gray-50 rounded-xl text-sm font-medium">Bahasa Inggris: Essay Chapter 2</div>
             <div className="p-3 bg-gray-50 rounded-xl text-sm font-medium">Fisika: Ringkasan Bab 3</div>
          </div>
        </div>

        {/* Prediksi Materi (Cuplikan) */}
        <div className="bg-black text-white p-6 rounded-3xl flex flex-col justify-between">
          <div>
            <h3 className="font-bold mb-2">Prediksi Materi Selanjutnya</h3>
            <p className="text-3xl font-black mb-4">Integral Dasar</p>
          </div>
          <Link to="/prediksi">
            <Button 
              variant="neutral" 
              className="text-xs bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-bold w-fit"
            >
              Cek Detail Materi
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}