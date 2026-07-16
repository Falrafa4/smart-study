import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import ToastModal from "../components/ToastModal";

export default function RekomendasiTugas() {
  const [recommendedTasks, setRecommendedTasks] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError("");
      try {
        // Fetch all subjects and tasks
        const [mapelRes, tugasRes, recommendationRes] = await Promise.all([
          api.get("/mapel"),
          api.get("/tugas"),
          api.post("/jadwal/generate-ai", { user_id: 1, strategi: "default" }),
        ]);

        const mapels = mapelRes.data;
        const allTasks = tugasRes.data;
        const recommendationData = recommendationRes.data;

        setSubjects(mapels);

        if (recommendationData.urutan && allTasks.length > 0) {
          // Sort tasks based on AI recommendation list
          const sorted = [];
          
          // Map tasks by title for easy lookup
          const taskMap = allTasks.reduce((acc, t) => {
            acc[t.judul.toLowerCase().trim()] = t;
            return acc;
          }, {});

          // Build sorted list from recommendation titles
          recommendationData.urutan.forEach((title) => {
            const matched = taskMap[title.toLowerCase().trim()];
            if (matched) {
              sorted.push(matched);
            }
          });

          // Add any tasks not returned in recommendation to the end
          allTasks.forEach((t) => {
            if (!sorted.find((s) => s.id === t.id) && !t.is_selesai) {
              sorted.push(t);
            }
          });

          setRecommendedTasks(sorted.filter((t) => !t.is_selesai));
        } else {
          // Fallback to active tasks
          setRecommendedTasks(allTasks.filter((t) => !t.is_selesai));
        }
      } catch (err) {
        setError(err.response?.data?.detail || "Gagal memuat rekomendasi tugas dari AI");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Find mapel details for a task
  const getMapelDetails = (mapelId) => {
    return subjects.find((m) => m.id === mapelId) || { nama: "Mata Pelajaran", kode_warna: "#E5E7EB" };
  };

  const getPriorityStyle = (priority) => {
    switch (priority.toLowerCase()) {
      case "sangat tinggi":
      case "tinggi":
        return { border: "border-red-500", text: "text-red-600", bg: "bg-red-50" };
      case "menengah":
        return { border: "border-yellow-500", text: "text-yellow-600", bg: "bg-yellow-50" };
      default:
        return { border: "border-gray-200", text: "text-gray-600", bg: "bg-gray-100" };
    }
  };

  return (
    <div className="max-w-3xl space-y-6 py-4">
      {/* Toast Error Alert */}
      {error && <ToastModal message={error} onClose={() => setError("")} />}

      <div className="flex justify-between items-center">
        <Link
          to="/dashboard"
          className="text-cobalt-secondary hover:text-cobalt-primary transition-colors text-sm font-medium flex items-center gap-2"
        >
          &larr; Kembali ke Dashboard
        </Link>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cobalt-tertiary"></div>
          <p className="text-sm font-bold text-cobalt-secondary tracking-wider uppercase">Mengurutkan prioritas tugas...</p>
        </div>
      ) : recommendedTasks.length > 0 ? (
        <>
          {/* AI Explanation Callout */}
          <div className="bg-cobalt-neutral border border-gray-200 rounded-cobalt-lg p-6 flex gap-4 animate-fade-in">
            <div className="text-xl">✨</div>
            <div>
              <h3 className="text-[0.95rem] font-bold text-cobalt-primary mb-1">AI Explanation</h3>
              <p className="text-[0.95rem] text-cobalt-secondary leading-[1.55]">
                AI telah memprioritaskan tugas <span className="font-semibold text-cobalt-primary">{recommendedTasks[0].judul}</span> ({getMapelDetails(recommendedTasks[0].mapel_id).nama}) terlebih dahulu karena deadline terdekat dan tingkat urgensi yang tinggi.
              </p>
            </div>
          </div>

          {/* Task Cards */}
          <div className="flex flex-col gap-3">
            {recommendedTasks.map((task) => {
              const mapel = getMapelDetails(task.mapel_id);
              const styles = getPriorityStyle(task.prioritas);
              const formattedDate = task.deadline
                ? new Date(task.deadline).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                  })
                : "Tidak ada deadline";

              return (
                <div
                  key={task.id}
                  className="bg-cobalt-surface flex items-center p-5 rounded-cobalt-lg border border-gray-200 hover:shadow-md transition-all duration-200 group"
                >
                  <div
                    className="w-1.5 h-12 rounded-full mr-4 transition-transform group-hover:scale-y-110"
                    style={{ backgroundColor: mapel.kode_warna }}
                  ></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-[0.98rem] text-cobalt-primary group-hover:text-cobalt-tertiary transition-colors">
                        {task.judul}
                      </h4>
                      <span className={`text-[0.7rem] font-black uppercase px-2 py-0.5 rounded-full ${styles.bg} ${styles.text}`}>
                        {task.prioritas}
                      </span>
                    </div>
                    <p className="text-xs text-cobalt-secondary mt-1 flex items-center gap-1.5 font-medium">
                      <span
                        className="inline-block w-2.5 h-2.5 rounded-full border border-white"
                        style={{ backgroundColor: mapel.kode_warna }}
                      ></span>
                      {mapel.nama} {task.deskripsi && `• ${task.deskripsi}`}
                    </p>
                  </div>
                  <div className="text-right flex flex-col items-end gap-1.5">
                    <span className="text-[0.8rem] font-bold text-cobalt-primary bg-cobalt-neutral border border-gray-150 px-3 py-1.5 rounded-cobalt-sm">
                      📅 {formattedDate}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="text-center py-20 bg-cobalt-surface border border-gray-200 rounded-cobalt-lg">
          <svg
            className="w-16 h-16 mx-auto text-gray-300 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <h4 className="font-bold text-cobalt-primary text-lg mb-1">Semua Tugas Selesai!</h4>
          <p className="text-cobalt-secondary text-sm max-w-xs mx-auto mb-6">
            Hebat, tidak ada tugas yang tersisa. Silakan bersantai atau tambahkan tugas baru.
          </p>
          <Link
            to="/dashboard/tugas"
            className="inline-flex items-center gap-2 bg-cobalt-tertiary hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-cobalt-md transition-colors"
          >
            Tambah Tugas Baru
          </Link>
        </div>
      )}
    </div>
  );
}