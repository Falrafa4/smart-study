import { useEffect, useState, useCallback, useRef } from "react";
import api from "../services/api";
import ToastModal from "../components/ToastModal";

export default function PrediksiMateri() {
  const [mapelList, setMapelList] = useState([]);
  const [selectedMapelId, setSelectedMapelId] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch tasks + mapel on mount, build dropdown from ACTUAL task data
  useEffect(() => {
    Promise.all([api.get("/tugas"), api.get("/mapel")])
      .then(([tugasRes, mapelRes]) => {
        const tasks = Array.isArray(tugasRes.data) ? tugasRes.data : [];
        const mapels = Array.isArray(mapelRes.data) ? mapelRes.data : [];

        // Build a lookup: mapel_id → mapel object
        const mapelMap = {};
        mapels.forEach((m) => { mapelMap[m.id] = m; });

        // Extract unique mapel_ids from tasks, resolve to mapel objects
        const seenIds = new Set();
        const unique = [];
        tasks.forEach((t) => {
          if (!seenIds.has(t.mapel_id)) {
            seenIds.add(t.mapel_id);
            const found = mapelMap[t.mapel_id];
            if (found) {
              unique.push(found);
            }
          }
        });

        setMapelList(unique);
        if (unique.length > 0) {
          setSelectedMapelId(String(unique[0].id));
        } else {
          setIsLoading(false);
        }
      })
      .catch(() => {
        setError("Gagal memuat data mata pelajaran");
        setIsLoading(false);
      });
  }, []);

  // Stable prediction fetch function (no debounce needed — runs on select change)
  const abortRef = useRef(null);

  const fetchPrediction = useCallback((mapelId) => {
    // ── GUARD: Skip API call entirely if mapelId is falsy ──
    if (!mapelId) {
      setPrediction(null);
      setIsLoading(false);
      return;
    }

    // Cancel any previous in-flight request
    if (abortRef.current) {
      abortRef.current.abort();
    }
    const controller = new AbortController();
    abortRef.current = controller;

    setIsLoading(true);
    setError("");

    api
      .post(
        "/prediksi-materi",
        { mapel_id: parseInt(mapelId), user_id: 1 },
        { signal: controller.signal }
      )
      .then((res) => {
        const data = res.data;

        // ── GUARD: Backend returned empty history → show empty state, NOT an error ──
        if (!data || !data.riwayat_materi || data.riwayat_materi.length === 0) {
          setPrediction(null);
          setIsLoading(false);
          return;
        }

        setPrediction(data);
        setIsLoading(false);
      })
      .catch((err) => {
        // Ignore aborted requests (user switched subject quickly)
        if (err?.code === "ERR_CANCELED") return;

        // AI service unavailable — show fallback, NOT error toast
        setPrediction(null);
        setIsLoading(false);
      });
  }, []);

  // Trigger prediction fetch when selected subject changes
  useEffect(() => {
    if (selectedMapelId) {
      requestAnimationFrame(() => fetchPrediction(selectedMapelId));
    }
  }, [selectedMapelId, fetchPrediction]);

  const selectedMapel = mapelList.find((m) => m.id === parseInt(selectedMapelId));

  return (
    <div className="space-y-cobalt-md py-4">
      {/* Toast Error Alert */}
      {error && <ToastModal message={error} onClose={() => setError("")} />}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <p className="text-cobalt-secondary text-[0.95rem]">
            Persiapkan diri lebih awal berdasarkan alur kurikulum bertenaga AI.
          </p>
        </div>

        {/* Sleek Custom Subject Select Selector */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
          <label htmlFor="subject-select" className="text-xs font-bold text-cobalt-secondary uppercase tracking-[0.02em] whitespace-nowrap">
            PILIH MAPEL:
          </label>
          <select
            id="subject-select"
            value={selectedMapelId}
            onChange={(e) => setSelectedMapelId(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-cobalt-md px-4 py-2.5 text-[0.95rem] text-cobalt-primary font-semibold focus:ring-2 focus:ring-cobalt-tertiary focus:border-cobalt-tertiary outline-none transition-all cursor-pointer shadow-sm"
          >
            {mapelList.length === 0 && (
              <option value="" disabled>-- Pilih Mata Pelajaran --</option>
            )}
            {mapelList.map((m) => (
              <option key={m.id} value={m.id}>
                {m.nama}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-cobalt-md">
        {/* History Materi */}
        <div className="bg-cobalt-surface p-6 rounded-cobalt-lg border border-gray-200 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold tracking-[0.02em] text-cobalt-secondary mb-6 uppercase">
              5 MATERI TERAKHIR: {selectedMapel ? selectedMapel.nama.toUpperCase() : "-"}
            </h3>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cobalt-tertiary"></div>
              </div>
            ) : prediction && prediction.riwayat_materi && prediction.riwayat_materi.length > 0 ? (
              <div className="relative border-l-2 border-gray-100 ml-3">
                {(prediction.riwayat_materi || []).map((materi, idx) => (
                  <div key={idx} className="mb-6 ml-6 relative">
                    <span
                      className="absolute -left-[1.95rem] top-1 h-3 w-3 rounded-full border-2 border-white"
                      style={{ backgroundColor: selectedMapel?.kode_warna || "#E5E7EB" }}
                    ></span>
                    <p className="text-[0.95rem] text-cobalt-primary font-medium">{materi}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-cobalt-secondary">
                <svg
                  className="w-12 h-12 mx-auto text-gray-300 mb-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
                Belum ada riwayat tugas / materi untuk mata pelajaran ini.
              </div>
            )}
          </div>
        </div>

        {/* Hasil Prediksi AI */}
        <div className="bg-cobalt-surface border border-gray-200 p-8 rounded-cobalt-lg flex flex-col justify-center gap-6 min-h-[300px]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-cobalt-tertiary"></div>
              <p className="text-xs font-bold text-cobalt-secondary tracking-widest uppercase">Menganalisis materi...</p>
            </div>
          ) : prediction ? (
            <>
              <div>
                <span className="text-[0.75rem] font-bold tracking-[0.02em] text-cobalt-secondary uppercase block mb-1">
                  AI PREDICTION
                </span>
                <h1 className="text-[2.25rem] font-extrabold text-cobalt-primary tracking-tight leading-tight">
                  {String(prediction.prediksi_materi_berikutnya || "")}
                </h1>
              </div>

              <div className="bg-cobalt-neutral border border-gray-100 p-5 rounded-cobalt-md">
                <p className="text-[0.95rem] text-cobalt-secondary leading-[1.6]">
                  {String(prediction.alasan || "")}
                </p>
              </div>

              <div>
                <span className="text-[0.75rem] font-bold tracking-[0.02em] text-cobalt-secondary block mb-2">
                  CONFIDENCE LEVEL
                </span>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-cobalt-tertiary rounded-full" style={{ width: `${prediction.confidence || 50}%` }}></div>
                  </div>
                  <span className="text-lg font-bold text-cobalt-primary">{prediction.confidence || 50}%</span>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center text-cobalt-secondary py-8">
              <svg
                className="w-16 h-16 mx-auto text-gray-300 mb-4 animate-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <h4 className="font-bold text-cobalt-primary mb-1">Prediksi Tidak Tersedia</h4>
              <p className="text-sm max-w-xs mx-auto">
                Silakan tambahkan tugas/materi terlebih dahulu untuk memulai prediksi AI.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}