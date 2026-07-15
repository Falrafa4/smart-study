export default function PrediksiMateri() {
  const history = [
    "Persamaan Linear", "SPLDV", "Fungsi", "Fungsi Kuadrat", "Turunan"
  ];

  return (
    <div className="space-y-cobalt-md">
      <p className="text-cobalt-secondary text-[0.95rem] mb-6">Persiapkan diri lebih awal berdasarkan alur kurikulum.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-cobalt-md">
        {/* History Materi */}
        <div className="bg-cobalt-surface p-6 rounded-cobalt-lg border border-gray-200">
          <h3 className="text-xs font-bold tracking-[0.02em] text-cobalt-secondary mb-6 uppercase">5 MATERI TERAKHIR: MATEMATIKA</h3>
          <div className="relative border-l-2 border-gray-100 ml-3">
            {history.map((materi, idx) => (
              <div key={idx} className="mb-6 ml-6 relative">
                <span className="absolute -left-[1.95rem] top-1 h-3 w-3 rounded-full bg-gray-200 border-2 border-white"></span>
                <p className="text-[0.95rem] text-cobalt-primary">{materi}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hasil Prediksi AI */}
        <div className="bg-cobalt-surface border border-gray-200 p-8 rounded-cobalt-lg flex flex-col justify-center gap-4">
          <div>
            <span className="text-[0.75rem] font-bold tracking-[0.02em] text-cobalt-secondary uppercase block mb-1">AI PREDICTION</span>
            <h1 className="text-[2.25rem] font-bold text-cobalt-primary tracking-tight">Integral Dasar</h1>
          </div>
          
          <div className="bg-cobalt-neutral border border-gray-100 p-4 rounded-cobalt-sm">
            <p className="text-[0.95rem] text-cobalt-secondary leading-[1.55]">
              Biasanya setelah materi Turunan pada kurikulum SMA akan masuk ke Integral sebagai materi lanjutan kalkulus.
            </p>
          </div>

          <div>
            <span className="text-[0.75rem] font-bold tracking-[0.02em] text-cobalt-secondary block mb-2">CONFIDENCE LEVEL</span>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-cobalt-tertiary w-[75%]"></div>
              </div>
              <span className="text-lg font-bold text-cobalt-primary">75%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}