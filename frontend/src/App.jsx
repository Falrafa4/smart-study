import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
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
        {/* Landing Page — standalone, no sidebar/header */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Dashboard App — with sidebar/header layout */}
        <Route path="/dashboard" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="tugas" element={<DetailTugas />} />
          <Route path="jadwal" element={<JadwalMapel />} />
          <Route path="rekomendasi" element={<RekomendasiTugas />} />
          <Route path="prediksi" element={<PrediksiMateri />} />
        </Route>
        
        {/* Catch-all route untuk menangani URL yang tidak terdaftar */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
