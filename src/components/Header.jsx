import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { PetalLogo } from './PetalLogo';
import { Icon } from './Icon';

export const Header = ({ activeTab, setActiveTab }) => {
  const { userProfile, totalSolved, tasks } = useApp();
  const { signOut, user } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const pendingTasks = tasks.filter((t) => !t.completed).length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'potted_plant' },
    { id: 'roadmap', label: 'DSA Roadmap', icon: 'account_tree', badge: `${totalSolved}/157` },
    { id: 'tasks', label: 'My Tasks', icon: 'checklist', badge: pendingTasks > 0 ? `${pendingTasks}` : null },
    { id: 'focus-room', label: 'Focus Room', icon: 'hourglass_top' },
    { id: 'garden', label: 'Motivation Garden', icon: 'local_florist' },
    { id: 'progress', label: 'Mastery Progress', icon: 'spa' },
  ];

  const getSubLabel = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Dashboard';
      case 'roadmap':
        return 'Roadmap';
      case 'tasks':
        return 'Tasks';
      case 'focus-room':
        return 'Focus';
      case 'garden':
        return 'Garden';
      case 'progress':
        return 'Progress';
      case 'settings':
        return 'Settings';
      default:
        return 'Sanctuary';
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface/90 backdrop-blur-xl border-b border-outline-variant/30 pt-safe shadow-[0_2px_16px_rgba(216,140,166,0.10)]">
      <div className="h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between max-w-7xl mx-auto relative">
        {/* Brand Logo & Title */}
        <button 
          onClick={() => setActiveTab('dashboard')} 
          className="flex items-center gap-3 text-left hover:opacity-90 transition-opacity shrink-0"
        >
          <PetalLogo className="h-9 w-9 object-contain shrink-0" />
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-primary leading-tight font-bold">
              Petal Progress
            </span>
            <span className="font-label-sm text-label-sm text-secondary font-medium md:hidden flex items-center gap-1">
              <Icon name="local_florist" className="w-3 h-3 text-secondary" />
              {getSubLabel()}
            </span>
            <span className="hidden md:inline-block text-[11px] text-on-surface-variant font-medium tracking-wide">
              DSA & Mindful Productivity Sanctuary
            </span>
          </div>
        </button>

        {/* Desktop Primary Navigation Bar */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-semibold transition-all relative ${
                  isActive
                    ? 'bg-primary text-on-primary shadow-[0_4px_12px_rgba(108,54,75,0.25)]'
                    : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'
                }`}
              >
                <Icon name={item.icon} className={`w-4 h-4 ${isActive ? 'text-on-primary' : 'text-secondary'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`ml-1 text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive
                        ? 'bg-primary-fixed text-on-primary-fixed'
                        : 'bg-secondary-container text-on-secondary-container'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Streak Pill, Settings, Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Active Streak Counter */}
          <button 
            onClick={() => setActiveTab('progress')}
            title="View Streak & Progress"
            className="flex items-center gap-1.5 bg-surface-container-high px-3 py-1.5 rounded-full shadow-[0_2px_8px_rgba(216,140,166,0.15)] hover:bg-surface-container-highest transition-colors active:scale-95"
          >
            <Icon name="local_fire_department" className="w-4 h-4 text-primary" />
            <span className="font-label-md text-label-md text-primary font-bold">
              {userProfile.streakDays}d
            </span>
          </button>

          {/* Quick Settings Link (Desktop) */}
          <button
            onClick={() => setActiveTab('settings')}
            className={`hidden md:flex p-2 rounded-full hover:bg-surface-container transition-colors ${
              activeTab === 'settings' ? 'bg-surface-container text-primary' : 'text-on-surface-variant'
            }`}
            title="Sanctuary Settings"
          >
            <Icon name="settings" className="w-5 h-5" />
          </button>

          {/* Profile Avatar & Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu((prev) => !prev)}
              aria-label="Profile and Account"
              title="Account Options"
              className="min-h-[40px] min-w-[40px] p-0.5 flex items-center justify-center relative rounded-full hover:ring-2 hover:ring-primary/20 transition-all active:scale-95"
            >
              <div className="w-9 h-9 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-sm ring-2 ring-surface shadow-xs select-none">
                {userProfile.name ? userProfile.name.charAt(0).toUpperCase() : '🌸'}
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-surface"></span>
            </button>

            {/* Profile Dropdown Menu */}
            {showProfileMenu && (
              <div 
                className="absolute right-0 top-12 w-60 bg-surface-container-lowest rounded-2xl p-2.5 shadow-[0_16px_40px_-8px_rgba(135,77,99,0.25)] border border-outline-variant/30 z-50 flex flex-col gap-1 animate-petal"
              >
                <div className="px-3 py-2 border-b border-outline-variant/20">
                  <span className="font-label-md text-label-md text-primary font-bold block truncate">
                    {userProfile.name}
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant block truncate">
                    {user?.email || 'elena.rostova@petalprogress.demo'}
                  </span>
                </div>

                <button
                  onClick={() => {
                    setActiveTab('settings');
                    setShowProfileMenu(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-on-surface font-label-md text-label-md hover:bg-surface-container transition-colors text-left"
                >
                  <Icon name="settings" className="w-4 h-4 text-secondary" />
                  <span>Sanctuary Settings</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('progress');
                    setShowProfileMenu(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-on-surface font-label-md text-label-md hover:bg-surface-container transition-colors text-left"
                >
                  <Icon name="account_tree" className="w-4 h-4 text-secondary" />
                  <span>Mastery Analytics</span>
                </button>

                <button
                  onClick={async () => {
                    setShowProfileMenu(false);
                    await signOut();
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-error font-label-md text-label-md hover:bg-error-container/20 transition-colors text-left mt-1 border-t border-outline-variant/10"
                >
                  <Icon name="logout" className="w-4 h-4 text-error" />
                  <span>Log Out to Welcome Screen</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
