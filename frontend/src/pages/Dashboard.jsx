import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        const [tugasRes, prediksiRes] = await Promise.all([
          api.get("/tugas"),
          // Fetch prediction for subject 1 (Matematika) by default
          api.post("/prediksi-materi", { mapel_id: 1, user_id: 1 }).catch(() => null),
        ]);

        if (tugasRes && tugasRes.data) {
          // Only show uncompleted tasks on dashboard, limit to 3
          setTasks(tugasRes.data.filter((t) => !t.is_selesai).slice(0, 3));
        }
        if (prediksiRes && prediksiRes.data) {
          setPrediction(prediksiRes.data);
        }
      } catch (err) {
        console.error("Gagal memuat data dashboard:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getSubjectColorAndIcon = (mapelId) => {
    // Basic mapping based on seed.py IDs
    const mapping = {
      1: { color: "text-blue-500", svg: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /> },
      2: { color: "text-indigo-500", svg: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /> },
      3: { color: "text-teal-500", svg: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /> }
    };
    return mapping[mapelId] || { color: "text-gray-500", svg: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /> };
  };

  return (
    <div className="space-y-10">
      
      {/* Greeting Section */}
      <section className="animate-fade-in">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
          Halo, Kevin{" "}
          <span className="hover:rotate-[20deg] cursor-default transition-transform duration-300 origin-bottom-right inline-block">👋</span>
        </h2>
        <p className="text-gray-500 text-[0.95rem] mt-1">
          Berikut rangkuman progres belajarmu hari ini.
        </p>
      </section>

      {/* Grid Cuplikan */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        
        {/* KARTU 1: Prioritas Tugas (Interaktif) */}
        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col h-full transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h3 className="font-extrabold text-gray-950 text-xl tracking-tight">Prioritas Tugas</h3>
              <p className="text-sm text-gray-400 font-medium mt-1">
                {isLoading ? "Memuat tugas..." : `${tasks.length} tugas menunggumu`}
              </p>
            </div>
            <Link to="/rekomendasi" className="text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline transition-colors pb-1">
              Lihat Semua &rarr;
            </Link>
          </div>
          
          <div className="space-y-3 flex-1 flex flex-col justify-center">
            {isLoading ? (
              <div className="flex justify-center py-6">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cobalt-tertiary"></div>
              </div>
            ) : tasks.length > 0 ? (
              tasks.map((task) => {
                const iconInfo = getSubjectColorAndIcon(task.mapel_id);
                return (
                  <Link
                    key={task.id}
                    to="/rekomendasi"
                    className="group flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-blue-50/50 border border-transparent hover:border-blue-100 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center ${iconInfo.color} font-bold group-hover:scale-110 transition-transform`}>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          {iconInfo.svg}
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                          {task.judul}
                        </h4>
                        <p className="text-xs font-medium text-gray-500 mt-0.5">
                          {task.deskripsi || "Tidak ada deskripsi"}
                        </p>
                      </div>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-xs font-bold bg-white px-3 py-1.5 rounded-lg text-blue-600 shadow-sm">
                        Kerjakan
                      </span>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="text-center py-8 text-gray-400 text-sm">
                Tidak ada tugas aktif. Kamu bebas hari ini! 🎉
              </div>
            )}
          </div>
        </div>

        {/* KARTU 2: Prediksi Materi (Mewah & Berdimensi) */}
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-950 p-8 rounded-[2rem] flex flex-col justify-between h-full shadow-2xl hover:shadow-indigo-900/30 transition-all hover:-translate-y-1 group">
          
          {/* Efek Ambient Glow di dalam Card */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-[60px] group-hover:bg-indigo-500/30 transition-colors pointer-events-none"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-[40px] pointer-events-none"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <h3 className="text-gray-300 text-xs font-black tracking-[0.2em] uppercase">Prediksi Materi Selanjutnya</h3>
            </div>
            
            {isLoading ? (
              <div className="py-6">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              </div>
            ) : prediction ? (
              <>
                <p className="text-[2rem] leading-tight font-extrabold text-white tracking-tight mb-2">
                  {prediction.prediksi_materi_berikutnya}
                </p>
                <p className="text-gray-400 text-sm font-medium mb-8 max-w-xs line-clamp-3">
                  {prediction.alasan}
                </p>
              </>
            ) : (
              <>
                <p className="text-[2rem] leading-tight font-extrabold text-white tracking-tight mb-2">
                  Integral<br/>Dasar
                </p>
                <p className="text-gray-400 text-sm font-medium mb-8 max-w-xs">
                  Berdasarkan pola belajarmu, AI merekomendasikan materi ini untuk persiapan ujian minggu depan.
                </p>
              </>
            )}
          </div>

          <div className="relative z-10 mt-auto">
            <Link to="/prediksi" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white font-bold py-3.5 px-6 rounded-xl transition-all active:scale-95 w-fit">
              Cek Detail Materi
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}