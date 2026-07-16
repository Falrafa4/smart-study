import { useEffect, useState, useRef } from "react";
import api from "../services/api";
import ToastModal from "../components/ToastModal";
import useDebounce from "../hooks/useDebounce";

export default function PrediksiMateri() {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all subjects on mount
  useEffect(() => {
    api
      .get("/mapel")
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        setSubjects(data);
        if (data.length > 0) {
          setSelectedSubjectId(data[0].id);
        }
      })
      .catch((err) => {
        const errMsg = err.response?.data?.detail || "Gagal memuat daftar mata pelajaran";
        setError(errMsg);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Debounced fetch function to get predictions
  const fetchPredictionRef = useRef(null);

  const debouncedFetch = useDebounce((subjectId) => {
    if (!subjectId) return;
    setIsLoading(true);
    setError("");

    api
      .post("/prediksi-materi", { mapel_id: parseInt(subjectId), user_id: 1 })
      .then((res) => {
        setPrediction(res.data);
      })
      .catch((err) => {
        const errMsg = err.response?.data?.detail || "Gagal memuat prediksi materi";
        setPrediction(null);
        setError(errMsg);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, 500);

  // Keep ref always pointing to latest debounced function
  useEffect(() => {
    fetchPredictionRef.current = debouncedFetch;
  });

  // Trigger prediction fetch when selected subject changes
  useEffect(() => {
    if (selectedSubjectId) {
      fetchPredictionRef.current(selectedSubjectId);
    }
  }, [selectedSubjectId]);

  const selectedSubject = subjects.find((s) => s.id === parseInt(selectedSubjectId));

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
        <div className="flex items-center gap-2">
          <label htmlFor="subject-select" className="text-xs font-bold text-cobalt-secondary uppercase tracking-[0.02em] whitespace-nowrap">
            PILIH MAPEL:
          </label>
          <select
            id="subject-select"
            value={selectedSubjectId}
            onChange={(e) => setSelectedSubjectId(e.target.value)}
            className="bg-white border border-gray-200 rounded-cobalt-md px-4 py-2.5 text-[0.95rem] text-cobalt-primary font-semibold focus:ring-2 focus:ring-cobalt-tertiary focus:border-cobalt-tertiary outline-none transition-all cursor-pointer shadow-sm"
          >
            {(subjects || []).map((subj) => (
              <option key={subj.id} value={subj.id}>
                {subj.nama}
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
              5 MATERI TERAKHIR: {selectedSubject ? selectedSubject.nama.toUpperCase() : "-"}
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
                      style={{ backgroundColor: selectedSubject?.kode_warna || "#E5E7EB" }}
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
                    <div className="h-full bg-cobalt-tertiary rounded-full" style={{ width: "85%" }}></div>
                  </div>
                  <span className="text-lg font-bold text-cobalt-primary">85%</span>
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