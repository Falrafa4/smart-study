import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard';
import JadwalMapel from './pages/JadwalMapel';
import DetailTugas from './pages/DetailTugas';
import RekomendasiTugas from './pages/RekomendasiTugas';
import PrediksiMateri from './pages/PrediksiMateri';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Root Layout - Mengatur struktur utama aplikasi */}
        <Route path="/" element={<MainLayout />}>
          {/* Halaman Default (Dashboard) */}
          <Route index element={<Dashboard />} />
          
          {/* Sub-routes untuk setiap menu */}
          <Route path="tugas" element={<DetailTugas />} />
          <Route path="jadwal" element={<JadwalMapel />} />
          <Route path="rekomendasi" element={<RekomendasiTugas />} />
          <Route path="prediksi" element={<PrediksiMateri />} />
          
          {/* Catch-all route untuk menangani URL yang tidak terdaftar */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}