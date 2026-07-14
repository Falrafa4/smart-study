export default function RekomendasiTugas() {
  const tasks = [
    { mapel: 'Matematika', tugas: 'Persamaan Linear', deadline: 'Besok', diff: 5, status: 'Urgent' },
    { mapel: 'Bahasa Inggris', tugas: 'Essay Chapter 2', deadline: '3 Hari lagi', diff: 2, status: 'Normal' },
  ]

  return (
    <div className="animate-fade-in max-w-3xl">
      <h2 className="text-3xl font-bold tracking-tight mb-6">Prioritas Tugas</h2>
      
      {/* AI Explanation Callout (Notion Style) */}
      <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-6 mb-8 flex gap-4">
        <div className="text-2xl">✨</div>
        <div>
          <h3 className="text-[0.95rem] font-bold text-cobalt-primary mb-1">AI Explanation</h3>
          <p className="text-[0.95rem] text-cobalt-secondary leading-relaxed">
            Disarankan mengerjakan tugas <span className="font-semibold text-cobalt-primary">Matematika</span> terlebih dahulu karena memiliki deadline paling dekat (Besok) dan tingkat kesulitan yang tinggi (Level 5).
          </p>
        </div>
      </div>

      {/* Task Cards (Classroom + Todoist Style) */}
      <div className="flex flex-col gap-3">
        {tasks.map((task, idx) => (
          <div key={idx} className="bg-cobalt-surface flex items-center p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-1 h-12 rounded-full mr-4 ${task.diff >= 4 ? 'bg-red-500' : 'bg-yellow-400'}`}></div>
            <div className="w-5 h-5 border-2 border-gray-300 rounded-sm mr-4 cursor-pointer hover:bg-gray-50"></div>
            <div className="flex-1">
              <h4 className="font-semibold text-[0.95rem]">{task.tugas}</h4>
              <p className="text-xs tracking-wider text-cobalt-secondary mt-1">{task.mapel}</p>
            </div>
            <div className="text-right flex flex-col items-end gap-2">
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${task.status === 'Urgent' ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-600'}`}>
                {task.deadline}
              </span>
              <span className="text-xs text-cobalt-secondary">Kesulitan: {task.diff}/5</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}