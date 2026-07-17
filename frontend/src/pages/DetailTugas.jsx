import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Button from '../components/Button';

export default function DetailTugas() {
  const [judul, setJudul] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [deadline, setDeadline] = useState('');
  const [prioritas, setPrioritas] = useState(3);
  const [mapelList, setMapelList] = useState([]);
  const [selectedMapelId, setSelectedMapelId] = useState('');
  const [newMapelName, setNewMapelName] = useState('');
  const [isAddingNew, setIsAddingNew] = useState(false);

  useEffect(() => {
    api.get('/mapel')
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        setMapelList(data);
        if (data.length > 0) {
          setSelectedMapelId(String(data[0].id));
        }
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const prioritasMap = {
        1: "Sangat Rendah",
        2: "Rendah",
        3: "Menengah",
        4: "Tinggi",
        5: "Sangat Tinggi"
      };

      let mapelIdToUse = parseInt(selectedMapelId);

      // If user typed a new subject, create it first
      if (isAddingNew && newMapelName.trim()) {
        const colors = ["#EF4444","#10B981","#3B82F6","#8B5CF6","#EC4899","#06B6D4","#F59E0B"];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const newMapelRes = await api.post('/mapel', {
          nama: newMapelName.trim(),
          kode_warna: randomColor,
          user_id: 1,
        });
        mapelIdToUse = newMapelRes.data.id;
      }

      if (!mapelIdToUse) {
        alert("Pilih atau buat mata pelajaran terlebih dahulu!");
        return;
      }

      const payload = {
        mapel_id: mapelIdToUse,
        judul,
        deskripsi,
        prioritas: prioritasMap[prioritas] || "Menengah",
      };

      if (deadline) {
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
        setNewMapelName('');
        setIsAddingNew(false);
        // Refresh mapel list in case a new one was created
        const refreshed = await api.get('/mapel');
        const data = Array.isArray(refreshed.data) ? refreshed.data : [];
        setMapelList(data);
      }
    } catch (error) {
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
          to="/dashboard"
          className="text-cobalt-secondary hover:text-cobalt-primary transition-colors text-sm font-medium flex items-center gap-2"
        >
          &larr; Kembali ke Dashboard
        </Link>
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="bg-cobalt-surface rounded-cobalt-lg border border-gray-200 p-cobalt-lg space-y-6">
        {/* Mata Pelajaran Selector */}
        <div>
          <label className="block text-[0.75rem] font-bold text-cobalt-secondary uppercase tracking-[0.02em] mb-2">Mata Pelajaran</label>
          {!isAddingNew ? (
            <div className="flex flex-col sm:flex-row gap-2">
              <select
                value={selectedMapelId}
                onChange={(e) => setSelectedMapelId(e.target.value)}
                className="w-full sm:flex-1 bg-cobalt-neutral border border-gray-200 rounded-cobalt-md p-4 text-cobalt-primary focus:ring-2 focus:ring-cobalt-tertiary focus:border-cobalt-tertiary transition-all outline-none"
              >
                {mapelList.length === 0 && <option value="" disabled>Pilih mata pelajaran...</option>}
                {mapelList.map((m) => (
                  <option key={m.id} value={m.id}>{m.nama}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setIsAddingNew(true)}
                className="w-full sm:w-auto px-4 py-3 sm:py-2 bg-cobalt-tertiary hover:bg-blue-700 text-white font-bold rounded-cobalt-md transition-colors text-sm whitespace-nowrap"
              >
                + Baru
              </button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={newMapelName}
                onChange={(e) => setNewMapelName(e.target.value)}
                placeholder="Contoh: Bahasa Arab..."
                className="w-full sm:flex-1 bg-cobalt-neutral border border-gray-200 rounded-cobalt-md p-4 text-cobalt-primary focus:ring-2 focus:ring-cobalt-tertiary focus:border-cobalt-tertiary transition-all outline-none"
                required
              />
              <button
                type="button"
                onClick={() => { setIsAddingNew(false); setNewMapelName(''); }}
                className="w-full sm:w-auto px-4 py-3 sm:py-2 bg-gray-200 hover:bg-gray-300 text-cobalt-primary font-bold rounded-cobalt-md transition-colors text-sm"
              >
                Batal
              </button>
            </div>
          )}
        </div>

        {/* Input Judul Tugas */}
        <div>
          <label className="block text-[0.75rem] font-bold text-cobalt-secondary uppercase tracking-[0.02em] mb-2">Judul Tugas</label>
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

        {/* Tombol Simpan */}
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