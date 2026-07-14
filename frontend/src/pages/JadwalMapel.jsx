import { useState } from 'react'

export default function JadwalMapel() {
  const [jadwalList, setJadwalList] = useState([
    { hari: 'Senin', jam: '07:00', mapel: 'Matematika' }
  ])

  return (
    <div className="animate-fade-in">
      <h2 className="text-3xl font-bold tracking-tight mb-2">Jadwal Pelajaran</h2>
      <p className="text-cobalt-secondary text-[0.95rem] mb-8">Atur jadwal agar AI memahami konteks waktu belajar kamu.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-cobalt-surface p-6 rounded-xl border border-gray-100 shadow-sm col-span-1 h-fit">
          <form className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold tracking-wider text-cobalt-secondary mb-1">HARI</label>
              <select className="w-full bg-cobalt-neutral border-none rounded-md p-2 text-[0.95rem] focus:ring-2 focus:ring-cobalt-tertiary">
                <option>Senin</option>
                <option>Selasa</option>
                <option>Rabu</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold tracking-wider text-cobalt-secondary mb-1">JAM</label>
              <input type="time" className="w-full bg-cobalt-neutral border-none rounded-md p-2 text-[0.95rem] focus:ring-2 focus:ring-cobalt-tertiary" />
            </div>
            <div>
              <label className="block text-xs font-semibold tracking-wider text-cobalt-secondary mb-1">MATA PELAJARAN</label>
              <input type="text" placeholder="Misal: Fisika" className="w-full bg-cobalt-neutral border-none rounded-md p-2 text-[0.95rem] focus:ring-2 focus:ring-cobalt-tertiary" />
            </div>
            <button type="button" className="mt-4 bg-cobalt-tertiary text-white py-2 px-4 rounded-md text-[0.95rem] font-medium hover:bg-blue-700 transition-colors">
              Tambah Jadwal
            </button>
          </form>
        </div>

        <div className="col-span-2">
          <div className="bg-cobalt-surface rounded-xl border border-gray-100 overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-cobalt-neutral text-xs tracking-wider text-cobalt-secondary border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3 font-semibold">Hari</th>
                  <th className="px-6 py-3 font-semibold">Jam</th>
                  <th className="px-6 py-3 font-semibold">Mata Pelajaran</th>
                </tr>
              </thead>
              <tbody className="text-[0.95rem]">
                {jadwalList.map((item, idx) => (
                  <tr key={idx} className="border-b border-gray-50 last:border-0">
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
  )
}