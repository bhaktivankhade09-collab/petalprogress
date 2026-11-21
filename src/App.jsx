import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { WelcomeView } from './views/WelcomeView';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { QuickAddModal } from './components/QuickAddModal';
import { DashboardView } from './views/DashboardView';
import { RoadmapView } from './views/RoadmapView';
import { TasksView } from './views/TasksView';
import { FocusRoomView } from './views/FocusRoomView';
import { MotivationGardenView } from './views/MotivationGardenView';
import { ProgressView } from './views/ProgressView';
import { SettingsView } from './views/SettingsView';

export function App() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);

  // 1. Initial Authentication Check Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-surface text-primary">
        <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-primary text-3xl shadow-md animate-bounce mb-3">
          🌸
        </div>
        <span className="font-headline-sm text-headline-sm tracking-tight">Petal Progress</span>
        <span className="font-body-sm text-body-sm text-on-surface-variant mt-1 flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px] text-tertiary">spa</span>
          Preparing your botanical sanctuary...
        </span>
      </div>
    );
  }

  // 2. Unauthenticated Gate: Fresh visitors see Welcome / Sign In / Sign Up
  if (!user) {
    return <WelcomeView />;
  }

  // 3. Authenticated Private Application Shell
  const renderView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView setActiveTab={setActiveTab} />;
      case 'roadmap':
        return <RoadmapView />;
      case 'tasks':
        return <TasksView />;
      case 'focus-room':
        return <FocusRoomView />;
      case 'garden':
        return <MotivationGardenView />;
      case 'progress':
        return <ProgressView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface antialiased font-sans selection:bg-secondary-container selection:text-on-secondary-container">
      {/* Persistent Global Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Protected View Container */}
      <main className="flex-1 w-full bg-surface pt-20 pb-24 md:pb-12">
        {renderView()}
      </main>

      {/* Floating Quick Action Button (+) */}
      <aside className="fixed right-6 bottom-24 md:bottom-8 z-40">
        <button
          onClick={() => setIsQuickAddOpen(true)}
          aria-label="Quick Add"
          title="Add Task or Reflection"
          className="w-13 h-13 md:w-14 md:h-14 rounded-full bg-primary text-on-primary shadow-[0_8px_24px_rgba(108,54,75,0.35)] flex items-center justify-center active:scale-95 transition-all hover:bg-primary-container"
        >
          <span className="material-symbols-outlined text-2xl md:text-3xl">add</span>
        </button>
      </aside>

      {/* Quick Add Modal */}
      <QuickAddModal
        isOpen={isQuickAddOpen}
        onClose={() => setIsQuickAddOpen(false)}
        setActiveTab={setActiveTab}
      />

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;
