import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const QuickAddModal = ({ isOpen, onClose, setActiveTab }) => {
  const { addTask, plantPetal } = useApp();
  const [mode, setMode] = useState('task'); // 'task' | 'reflection'
  const [taskTitle, setTaskTitle] = useState('');
  const [priority, setPriority] = useState('High');
  const [duration, setDuration] = useState('30 mins');
  const [reflectionText, setReflectionText] = useState('');

  if (!isOpen) return null;

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;
    addTask(taskTitle.trim(), priority, duration);
    setTaskTitle('');
    onClose();
  };

  const handleReflectionSubmit = (e) => {
    e.preventDefault();
    if (!reflectionText.trim()) return;
    plantPetal(reflectionText.trim());
    setReflectionText('');
    setActiveTab('garden');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/40 backdrop-blur-sm transition-opacity">
      <div 
        className="w-full max-w-md bg-surface-container-lowest rounded-3xl p-5 shadow-[0_16px_40px_-8px_rgba(135,77,99,0.25)] border border-outline-variant/30 flex flex-col gap-4 relative animate-petal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
              <span className="material-symbols-outlined text-[18px]">local_florist</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-primary">Quick Sanctuary Action</h3>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Mode Selector */}
        <div className="flex rounded-xl bg-surface-container-low p-1 gap-1">
          <button
            type="button"
            onClick={() => setMode('task')}
            className={`flex-1 py-1.5 rounded-lg font-label-md text-label-md flex items-center justify-center gap-1.5 transition-all ${
              mode === 'task'
                ? 'bg-primary text-on-primary shadow-sm font-semibold'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">checklist</span>
            <span>New Task</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('reflection')}
            className={`flex-1 py-1.5 rounded-lg font-label-md text-label-md flex items-center justify-center gap-1.5 transition-all ${
              mode === 'reflection'
                ? 'bg-primary text-on-primary shadow-sm font-semibold'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">eco</span>
            <span>Plant Note</span>
          </button>
        </div>

        {mode === 'task' ? (
          <form onSubmit={handleTaskSubmit} className="flex flex-col gap-3">
            <div>
              <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1">
                Task / Study Goal
              </label>
              <input
                type="text"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="e.g. Solve 2 Graph BFS questions..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md border border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/30"
                autoFocus
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1">
                  Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-surface-container-low text-on-surface font-label-md text-label-md border border-outline-variant/40 focus:outline-none"
                >
                  <option value="High">🌸 High Priority</option>
                  <option value="Medium">🌿 Medium</option>
                  <option value="Low">🌱 Low</option>
                </select>
              </div>

              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1">
                  Estimated Time
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-surface-container-low text-on-surface font-label-md text-label-md border border-outline-variant/40 focus:outline-none"
                >
                  <option value="15 mins">15 mins</option>
                  <option value="30 mins">30 mins</option>
                  <option value="45 mins">45 mins</option>
                  <option value="1 hr">1 hr</option>
                  <option value="2 hrs">2 hrs</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-full bg-surface-container text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-high transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-full bg-primary text-on-primary font-label-md text-label-md font-semibold shadow-[0_4px_14px_rgba(108,54,75,0.3)] hover:bg-primary-container active:scale-95 transition-all"
              >
                Bloom Task
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleReflectionSubmit} className="flex flex-col gap-3">
            <div>
              <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1">
                Mindful Note / Learning Insight
              </label>
              <textarea
                value={reflectionText}
                onChange={(e) => setReflectionText(e.target.value)}
                placeholder="What encouraging thought helped you solve your last problem? Write a tiny petal to your future self..."
                rows={3}
                className="w-full p-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md border border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                autoFocus
              />
            </div>
            <div className="flex justify-end gap-2 mt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-full bg-surface-container text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-high transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-full bg-primary text-on-primary font-label-md text-label-md font-semibold shadow-[0_4px_14px_rgba(108,54,75,0.3)] hover:bg-primary-container active:scale-95 transition-all flex items-center gap-1"
              >
                <span>Plant in Garden</span>
                <span className="material-symbols-outlined text-[16px]">spa</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
