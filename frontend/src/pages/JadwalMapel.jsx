import { useState } from 'react';
import Button from '../components/Button';

export default function JadwalMapel() {
  const [jadwalList] = useState([
    { hari: 'Senin', jam: '07:00', mapel: 'Matematika' }
  ]);

  return (
    <div className="space-y-cobalt-md">
      <p className="text-cobalt-secondary text-[0.95rem] mb-6">Atur jadwal agar AI memahami konteks waktu belajar kamu.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-cobalt-md">
        {/* Form Card */}
        <div className="bg-cobalt-surface p-6 rounded-cobalt-lg border border-gray-200 col-span-1 h-fit flex flex-col gap-4">
          <form className="flex flex-col gap-4">
            <div>
              <label className="block text-[0.75rem] font-bold tracking-[0.02em] text-cobalt-secondary mb-1 uppercase">HARI</label>
              <select className="w-full bg-cobalt-neutral border border-gray-200 rounded-cobalt-sm p-2 text-cobalt-primary focus:ring-2 focus:ring-cobalt-tertiary outline-none">
                <option>Senin</option>
                <option>Selasa</option>
                <option>Rabu</option>
              </select>
            </div>
            <div>
              <label className="block text-[0.75rem] font-bold tracking-[0.02em] text-cobalt-secondary mb-1 uppercase">JAM</label>
              <input type="time" className="w-full bg-cobalt-neutral border border-gray-200 rounded-cobalt-sm p-2 text-cobalt-primary focus:ring-2 focus:ring-cobalt-tertiary outline-none" />
            </div>
            <div>
              <label className="block text-[0.75rem] font-bold tracking-[0.02em] text-cobalt-secondary mb-1 uppercase">MATA PELAJARAN</label>
              <input type="text" placeholder="Misal: Fisika" className="w-full bg-cobalt-neutral border border-gray-200 rounded-cobalt-sm p-2 text-cobalt-primary focus:ring-2 focus:ring-cobalt-tertiary outline-none" />
            </div>
            <Button 
              type="button" 
              variant="small" 
              className="mt-2 w-full"
            >
              Tambah Jadwal
            </Button>
          </form>
        </div>

        {/* Tabel Card */}
        <div className="col-span-2">
          <div className="bg-cobalt-surface rounded-cobalt-lg border border-gray-200 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-cobalt-neutral text-[0.75rem] tracking-[0.02em] text-cobalt-secondary border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 font-bold uppercase">Hari</th>
                  <th className="px-6 py-3 font-bold uppercase">Jam</th>
                  <th className="px-6 py-3 font-bold uppercase">Mata Pelajaran</th>
                </tr>
              </thead>
              <tbody className="text-[0.95rem] text-cobalt-primary">
                {jadwalList.map((item, idx) => (
                  <tr key={idx} className="border-b border-gray-100 last:border-0 hover:bg-cobalt-neutral/50">
                    <td className="px-6 py-4 font-medium">{item.hari}</td>
                    <td className="px-6 py-4 text-cobalt-secondary">{item.jam}</td>
                    <td className="px-6 py-4">{item.mapel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}