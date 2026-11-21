import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Icon } from '../components/Icon';

export const TasksView = () => {
  const { tasks, toggleTask, addTask, deleteTask } = useApp();
  const [filter, setFilter] = useState('all'); // 'all' | 'pending' | 'completed'
  const [newTitle, setNewTitle] = useState('');
  const [newPriority, setNewPriority] = useState('High');
  const [newDuration, setNewDuration] = useState('30 mins');
  const [newCategory, setNewCategory] = useState('DSA Practice');

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'pending') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addTask(newTitle.trim(), newPriority, newDuration, newCategory);
    setNewTitle('');
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = tasks.length - completedCount;
  const completionPct = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pt-1">
        <div>
          <div className="flex items-center gap-1.5 text-secondary">
            <Icon name="checklist" className="w-4 h-4 text-secondary" />
            <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
              Flower Bed Tasks
            </span>
          </div>
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-primary font-bold mt-1">
            My Daily Study Tasks
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
            Organize your algorithm drills, system design practice, and mock revision routines
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-label-sm text-label-sm bg-surface-container-high px-3 py-1.5 rounded-full text-primary font-semibold border border-outline-variant/30">
            {completedCount} / {tasks.length} Completed ({completionPct}%)
          </span>
        </div>
      </div>

      {/* Main 2-Column Responsive Layout on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (Create Task & Summary Metrics) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Add Task Input Card */}
          <div className="rounded-2xl bg-surface-container-lowest p-5 shadow-[0_8px_24px_-4px_rgba(216,140,166,0.14)] border border-outline-variant/20 flex flex-col gap-3.5">
            <span className="font-label-md text-label-md text-primary font-bold flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-primary text-sm font-bold">
                +
              </span>
              <span>Bloom New Study Task</span>
            </span>

            <form onSubmit={handleCreate} className="flex flex-col gap-3">
              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1">
                  Task Title
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Implement LRU Cache or Solve 3 DP problems..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1">
                    Priority
                  </label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-surface-container-low text-on-surface font-label-md text-label-md border border-outline-variant/30 focus:outline-none"
                  >
                    <option value="High">🌸 High Priority</option>
                    <option value="Medium">🌿 Medium Priority</option>
                    <option value="Low">🌱 Low Priority</option>
                  </select>
                </div>

                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1">
                    Target Duration
                  </label>
                  <select
                    value={newDuration}
                    onChange={(e) => setNewDuration(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-surface-container-low text-on-surface font-label-md text-label-md border border-outline-variant/30 focus:outline-none"
                  >
                    <option value="15 mins">15 mins</option>
                    <option value="30 mins">30 mins</option>
                    <option value="45 mins">45 mins</option>
                    <option value="1 hr">1 hr</option>
                    <option value="2 hrs">2 hrs</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1">
                  Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-surface-container-low text-on-surface font-label-md text-label-md border border-outline-variant/30 focus:outline-none"
                >
                  <option value="DSA Practice">DSA Practice</option>
                  <option value="Placement Track">Placement Track</option>
                  <option value="Core Patterns">Core Patterns</option>
                  <option value="Focus Room">Focus Room</option>
                  <option value="Reflection">Reflection & Notes</option>
                </select>
              </div>

              <button
                type="submit"
                className="mt-1 w-full py-2.5 rounded-full bg-primary text-on-primary font-label-md text-label-md font-semibold shadow-sm hover:bg-primary-container active:scale-95 transition-all flex items-center justify-center gap-1.5"
              >
                <span>Plant Task in Flower Bed</span>
                <Icon name="arrow_forward" className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Quick Stats Card */}
          <div className="rounded-2xl bg-surface-container-lowest p-5 shadow-[0_8px_24px_-4px_rgba(216,140,166,0.12)] border border-outline-variant/20 space-y-3">
            <h3 className="font-label-lg font-bold text-primary flex items-center gap-1.5">
              <Icon name="spa" className="w-4 h-4 text-secondary" />
              <span>Study Tasks Summary</span>
            </h3>

            <div className="grid grid-cols-3 gap-2.5 text-center">
              <div className="p-3 rounded-xl bg-surface-container-low">
                <span className="text-xs text-on-surface-variant block">Total</span>
                <span className="text-xl font-bold text-primary">{tasks.length}</span>
              </div>
              <div className="p-3 rounded-xl bg-surface-container-low">
                <span className="text-xs text-on-surface-variant block">To Do</span>
                <span className="text-xl font-bold text-secondary">{pendingCount}</span>
              </div>
              <div className="p-3 rounded-xl bg-surface-container-low">
                <span className="text-xs text-on-surface-variant block">Done</span>
                <span className="text-xl font-bold text-tertiary">{completedCount}</span>
              </div>
            </div>

            <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden mt-2">
              <div
                className="bg-primary h-full rounded-full transition-all duration-500"
                style={{ width: `${completionPct}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Right Column (Tasks List & Filters) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Filter Tabs */}
          <div className="flex p-1 bg-surface-container rounded-2xl gap-1">
            <button
              onClick={() => setFilter('all')}
              className={`flex-1 py-2 rounded-xl font-label-md text-label-md transition-all font-semibold ${
                filter === 'all'
                  ? 'bg-surface-container-lowest text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              All Tasks ({tasks.length})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`flex-1 py-2 rounded-xl font-label-md text-label-md transition-all font-semibold ${
                filter === 'pending'
                  ? 'bg-surface-container-lowest text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              In Progress ({pendingCount})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`flex-1 py-2 rounded-xl font-label-md text-label-md transition-all font-semibold ${
                filter === 'completed'
                  ? 'bg-surface-container-lowest text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Completed ({completedCount})
            </button>
          </div>

          {/* Tasks List */}
          <div className="space-y-3">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-4 rounded-2xl bg-surface-container-lowest border shadow-sm flex items-center justify-between gap-4 transition-all hover:shadow-md ${
                    task.completed ? 'border-outline-variant/20 opacity-75' : 'border-outline-variant/30'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0 flex-1">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform active:scale-90 border ${
                        task.completed
                          ? 'bg-tertiary text-on-tertiary border-tertiary'
                          : 'bg-surface-container-high text-primary border-outline-variant/40 hover:border-primary'
                      }`}
                      aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
                    >
                      {task.completed && <span className="text-xs font-bold">✓</span>}
                    </button>

                    <div className="flex flex-col min-w-0">
                      <span
                        className={`font-body-md text-base leading-snug font-medium truncate ${
                          task.completed ? 'text-on-surface-variant line-through' : 'text-on-surface'
                        }`}
                      >
                        {task.title}
                      </span>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="font-label-sm text-xs text-on-surface-variant">
                          ⏱ {task.duration}
                        </span>
                        {task.category && (
                          <span className="text-[11px] px-2 py-0.5 rounded-full bg-surface-container-low text-secondary font-medium">
                            {task.category}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`px-2.5 py-1 rounded-full font-label-sm text-xs font-semibold ${
                        task.completed
                          ? 'bg-surface-container text-on-surface-variant'
                          : task.priority === 'High'
                          ? 'bg-secondary-container text-on-secondary-container'
                          : 'bg-surface-container-high text-primary'
                      }`}
                    >
                      {task.completed ? 'Done' : task.priority}
                    </span>

                    <button
                      onClick={() => deleteTask(task.id)}
                      className="p-1.5 rounded-full text-on-surface-variant hover:text-error hover:bg-error-container/20 transition-colors"
                      title="Delete Task"
                    >
                      <Icon name="close" className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 rounded-2xl bg-surface-container-lowest text-center space-y-2 border border-outline-variant/20 shadow-xs">
                <span className="text-3xl">🌸</span>
                <p className="font-body-md text-on-surface-variant">
                  {filter === 'completed'
                    ? 'No completed tasks yet. Check off an active task to see it here!'
                    : 'No tasks found. Use the form on the left to plant a study goal.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
