import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function MainLayout() {
  return (
    <div className="flex h-screen bg-cobalt-surface text-cobalt-primary font-sans overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full bg-cobalt-neutral overflow-hidden">
        {/* Header */}
        <Header />

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="px-12 pb-20 pt-4 max-w-5xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
