import React from 'react';
import { useApp } from '../context/AppContext';
import { Icon } from './Icon';

export const BottomNav = ({ activeTab, setActiveTab }) => {
  const { tasks, totalSolved } = useApp();
  const pendingTasks = tasks.filter((t) => !t.completed).length;

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: 'potted_plant' },
    { id: 'roadmap', label: 'DSA 157', icon: 'account_tree', badge: `${totalSolved}/157` },
    { id: 'tasks', label: 'Tasks', icon: 'checklist', badge: pendingTasks > 0 ? `${pendingTasks}` : null },
    { id: 'focus-room', label: 'Focus', icon: 'hourglass_top' },
    { id: 'garden', label: 'Garden', icon: 'local_florist' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 pb-safe bg-surface/90 backdrop-blur-xl border-t border-outline-variant/30 shadow-[0_-4px_24px_-4px_rgba(216,140,166,0.16)]">
      <div className="flex justify-around items-center h-20 px-2 max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center min-h-[44px] min-w-[56px] px-2 py-1 transition-all rounded-xl relative ${
                isActive
                  ? 'text-primary font-semibold'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              <div className="relative">
                <Icon
                  name={tab.icon}
                  className="w-6 h-6"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                />
                {tab.badge && !isActive && (
                  <span className="absolute -top-1 -right-2 text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-secondary-container text-on-secondary-container scale-90">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="font-label-sm text-label-sm mt-0.5 leading-tight">{tab.label}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-0.5"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
