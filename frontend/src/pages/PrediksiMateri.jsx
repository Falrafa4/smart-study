export default function PrediksiMateri() {
  const history = [
    "Persamaan Linear", "SPLDV", "Fungsi", "Fungsi Kuadrat", "Turunan"
  ]

  return (
    <div className="animate-fade-in max-w-4xl">
      <h2 className="text-3xl font-bold tracking-tight mb-2">Prediksi Materi</h2>
      <p className="text-cobalt-secondary text-[0.95rem] mb-8">Persiapkan diri lebih awal berdasarkan alur kurikulum.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Kolom Kiri: History Materi */}
        <div className="bg-cobalt-surface p-6 rounded-xl border border-gray-100">
          <h3 className="text-xs font-semibold tracking-wider text-cobalt-secondary mb-4">5 MATERI TERAKHIR: MATEMATIKA</h3>
          <div className="relative border-l-2 border-gray-100 ml-3">
            {history.map((materi, idx) => (
              <div key={idx} className="mb-6 ml-6 relative">
                <span className="absolute -left-[1.95rem] top-1 h-3 w-3 rounded-full bg-gray-200 border-2 border-white"></span>
                <p className="text-[0.95rem] text-cobalt-secondary">{materi}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Kolom Kanan: Hasil Prediksi AI */}
        <div className="bg-cobalt-primary text-white p-8 rounded-xl flex flex-col justify-center">
          <span className="text-xs font-semibold tracking-wider text-cobalt-secondary mb-2">AI PREDICTION</span>
          <h1 className="text-4xl font-bold tracking-tight mb-4">Integral Dasar</h1>
          
          <div className="bg-gray-800/50 p-4 rounded-md mb-6">
            <p className="text-[0.95rem] text-gray-300 leading-relaxed">
              Biasanya setelah materi Turunan pada kurikulum SMA akan masuk ke Integral sebagai materi lanjutan kalkulus.
            </p>
          </div>

          <div>
            <span className="text-xs font-semibold tracking-wider text-gray-400 block mb-1">CONFIDENCE LEVEL</span>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-cobalt-tertiary w-[75%]"></div>
              </div>
              <span className="text-xl font-bold">75%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}