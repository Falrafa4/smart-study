import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Button from '../components/Button';

export default function DetailTugas() {
  const [judul, setJudul] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [deadline, setDeadline] = useState('');
  const [prioritas, setPrioritas] = useState(3);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Map prioritas number to string that makes sense for the backend
      const prioritasMap = {
        1: "Sangat Rendah",
        2: "Rendah",
        3: "Menengah",
        4: "Tinggi",
        5: "Sangat Tinggi"
      };

      const payload = {
        mapel_id: 1,
        judul,
        deskripsi,
        prioritas: prioritasMap[prioritas] || "Menengah",
      };

      // Handle deadline format for Pydantic datetime validation
      // If deadline is an empty string, we set it to null or omit it
      if (deadline) {
        // Appending time to make it a valid ISO 8601 datetime string, 
        // e.g. "2026-07-15T00:00:00.000Z"
        payload.deadline = new Date(deadline).toISOString();
      } else {
        payload.deadline = null;
      }

      const response = await api.post('/tugas', payload);
      
      if (response.status === 201) {
        alert("Tugas Berhasil Disimpan!");
        setJudul('');
        setDeskripsi('');
        setDeadline('');
        setPrioritas(3);
      }
    } catch (error) {
      // Show more detailed error message if available
      const errorMsg = error.response?.data?.detail 
        ? JSON.stringify(error.response.data.detail) 
        : error.message;
      alert("Gagal: " + errorMsg);
    }
  };

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
      <form onSubmit={handleSubmit} className="bg-cobalt-surface rounded-cobalt-lg border border-gray-200 p-cobalt-lg space-y-6">
        {/* Input Mata Pelajaran */}
        <div>
          <label className="block text-[0.75rem] font-bold text-cobalt-secondary uppercase tracking-[0.02em] mb-2">Mata Pelajaran (Judul Tugas)</label>
          <input 
            type="text" 
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            className="w-full bg-cobalt-neutral border border-gray-200 rounded-cobalt-md p-4 text-cobalt-primary focus:ring-2 focus:ring-cobalt-tertiary focus:border-cobalt-tertiary transition-all outline-none" 
            placeholder="Masukkan judul tugas..." 
            required
          />
        </div>

        {/* Input Materi */}
        <div>
          <label className="block text-[0.75rem] font-bold text-cobalt-secondary uppercase tracking-[0.02em] mb-2">Nama Materi (Deskripsi)</label>
          <textarea 
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
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
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full bg-cobalt-neutral border border-gray-200 rounded-cobalt-md p-4 text-cobalt-primary focus:ring-2 focus:ring-cobalt-tertiary focus:border-cobalt-tertiary transition-all outline-none" 
              required
            />
          </div>
          <div>
            <label className="block text-[0.75rem] font-bold text-cobalt-secondary uppercase tracking-[0.02em] mb-2">Tingkat Kesulitan / Prioritas</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <Button 
                  key={n} 
                  type="button"
                  variant={prioritas === n ? 'dark' : 'neutral'}
                  onClick={() => setPrioritas(n)} 
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
            type="submit" 
            variant="primary" 
            className="w-full"
          >
            Simpan Tugas ke Sistem
          </Button>
        </div>
      </form>
    </div>
  );
}