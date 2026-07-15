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
        {/* Root Layout */}
        <Route path="/" element={<MainLayout />}>
          {/* Sub-routes */}
          <Route index element={<Dashboard />} />
          <Route path="tugas" element={<DetailTugas />} />
          <Route path="jadwal" element={<JadwalMapel />} />
          <Route path="rekomendasi" element={<RekomendasiTugas />} />
          <Route path="prediksi" element={<PrediksiMateri />} />
          
          {/* Catch-all redirect to Dashboard */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}