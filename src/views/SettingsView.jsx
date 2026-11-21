import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { Icon } from '../components/Icon';

export const SettingsView = () => {
  const { userProfile, totalSolved, tasks, resetToDemoData } = useApp();
  const { user, signOut, updateProfile } = useAuth();
  const [nameInput, setNameInput] = useState(userProfile.name);
  const [dailyTarget, setDailyTarget] = useState(userProfile.dailyProblemTarget || 3);
  const [focusGoal, setFocusGoal] = useState(userProfile.focusGoalHours || 4);
  const [soundscape, setSoundscape] = useState(userProfile.soundscape || 'Gentle Rain & Soft Piano ♫');
  const [savedNotice, setSavedNotice] = useState(false);
  const [resetNotice, setResetNotice] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    await updateProfile({
      full_name: nameInput.trim() || 'Elena Rostova',
      daily_problem_target: Number(dailyTarget),
      focus_goal_hours: Number(focusGoal),
      soundscape,
    });
    setIsSaving(false);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const handleResetDemo = () => {
    resetToDemoData();
    setNameInput('Elena Rostova');
    setDailyTarget(3);
    setFocusGoal(4);
    setSoundscape('Gentle Rain & Soft Piano ♫');
    updateProfile({
      full_name: 'Elena Rostova',
      daily_problem_target: 3,
      focus_goal_hours: 4,
      soundscape: 'Gentle Rain & Soft Piano ♫',
    });
    setResetNotice(true);
    setTimeout(() => setResetNotice(false), 3000);
  };

  const handleExportData = () => {
    const data = {
      account: {
        id: user?.id,
        email: user?.email,
        name: userProfile.name,
      },
      stats: {
        totalSolved,
        dailyTarget,
        focusGoalHours: focusGoal,
        tasksCount: tasks.length,
      },
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `petal-progress-demo-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-outline-variant/30 pb-4">
        <div>
          <div className="flex items-center gap-1.5 text-secondary">
            <Icon name="settings" className="w-4 h-4 text-secondary" />
            <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
              Preferences & Configuration
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-primary mt-1 font-bold">
            Sanctuary Settings
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Manage your account profile, study goals, soundscape, and client-side demo state
          </p>
        </div>

        <button
          onClick={() => signOut()}
          className="self-start sm:self-auto px-4 py-2 rounded-full bg-surface-container text-error font-label-md text-label-md font-semibold hover:bg-error-container/20 transition-all flex items-center gap-1.5 active:scale-95 border border-outline-variant/20"
          title="Return to Welcome Screen"
        >
          <Icon name="logout" className="w-4 h-4 text-error" />
          <span>Log Out</span>
        </button>
      </div>

      {/* Main 2-Column Desktop Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Profile & Target Preferences Form (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl bg-surface-container-lowest p-6 sm:p-7 shadow-[0_12px_32px_-6px_rgba(216,140,166,0.18)] space-y-5 border border-outline-variant/30">
            {/* Account Info Pill */}
            <div className="flex items-center justify-between pb-4 border-b border-outline-variant/20">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-xl ring-2 ring-surface shadow-xs select-none">
                  {userProfile.name ? userProfile.name.charAt(0).toUpperCase() : '🌸'}
                </div>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold leading-tight">
                    {userProfile.name}
                  </h3>
                  <span className="font-label-sm text-label-sm text-secondary font-medium">
                    {user?.email || 'elena.rostova@petalprogress.demo'} • {userProfile.streakDays}-day streak
                  </span>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full bg-surface-container font-label-sm text-xs font-semibold text-primary">
                Demo Account
              </span>
            </div>

            {/* Profile & Target Form */}
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1.5 font-semibold">
                  Display Name
                </label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1.5 font-semibold">
                  Daily LeetCode Problem Target
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 5].map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setDailyTarget(count)}
                      className={`py-2 rounded-xl font-label-md text-label-md font-semibold transition-all ${
                        dailyTarget === count
                          ? 'bg-primary text-on-primary shadow-sm'
                          : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                      }`}
                    >
                      {count} / day
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1.5 font-semibold">
                  Daily Focus Target
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[2, 4, 6, 8].map((hours) => (
                    <button
                      key={hours}
                      type="button"
                      onClick={() => setFocusGoal(hours)}
                      className={`py-2 rounded-xl font-label-md text-label-md font-semibold transition-all ${
                        focusGoal === hours
                          ? 'bg-secondary text-on-secondary shadow-sm'
                          : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                      }`}
                    >
                      {hours}h / day
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1.5 font-semibold">
                  Ambient Soundscape Preset
                </label>
                <select
                  value={soundscape}
                  onChange={(e) => setSoundscape(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="Gentle Rain & Soft Piano ♫">Gentle Rain & Soft Piano ♫</option>
                  <option value="Forest Birdsong & Whispering Pines 🌿">Forest Birdsong & Whispering Pines 🌿</option>
                  <option value="Quiet Zen Water Stream 💧">Quiet Zen Water Stream 💧</option>
                  <option value="Warm Hearth & Crackling Ember 🔥">Warm Hearth & Crackling Ember 🔥</option>
                </select>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-outline-variant/20">
                <button
                  type="button"
                  onClick={handleResetDemo}
                  className="px-4 py-2 rounded-full bg-surface-container text-secondary font-label-md text-label-md font-semibold hover:bg-surface-container-high active:scale-95 transition-all flex items-center gap-1.5"
                  title="Reset all tasks, problems, and timer stats to default demo state"
                >
                  <Icon name="restart_alt" className="w-4 h-4" />
                  <span>Reset Demo Data</span>
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2 rounded-full bg-primary text-on-primary font-label-md text-label-md font-semibold shadow-sm hover:bg-primary-container active:scale-95 transition-all disabled:opacity-60"
                >
                  {isSaving ? 'Saving...' : 'Save Preferences'}
                </button>
              </div>
            </form>

            {savedNotice && (
              <div className="p-3 rounded-xl bg-tertiary-fixed text-tertiary text-center font-label-sm text-label-sm animate-petal">
                🌸 Preferences saved gracefully!
              </div>
            )}

            {resetNotice && (
              <div className="p-3 rounded-xl bg-secondary-container text-on-secondary-container text-center font-label-sm text-label-sm animate-petal">
                ✨ Demo state restored: 48 problems bloomed, 14d streak, 5 active tasks.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Architecture & Data Inspection (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl bg-surface-container-lowest p-6 sm:p-7 shadow-[0_12px_32px_-6px_rgba(216,140,166,0.18)] space-y-4 border border-outline-variant/30">
            <h3 className="font-headline-sm text-headline-sm text-primary flex items-center gap-2 font-bold">
              <Icon name="spa" className="w-5 h-5 text-secondary" />
              <span>Frontend Architecture</span>
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Petal Progress is running as a <strong>100% client-side functional web application</strong>. All problem completions, notes, tasks, pomodoro sessions, and reflections are managed via <strong>React Context API</strong> and synchronized with browser <code>localStorage</code>.
            </p>

            <div className="space-y-2 pt-2 border-t border-outline-variant/20">
              <div className="flex items-center justify-between text-xs text-on-surface-variant">
                <span>Architecture</span>
                <span className="font-semibold text-primary">React 18 + Vite + Tailwind</span>
              </div>
              <div className="flex items-center justify-between text-xs text-on-surface-variant">
                <span>Storage Layer</span>
                <span className="font-semibold text-secondary">Browser localStorage</span>
              </div>
              <div className="flex items-center justify-between text-xs text-on-surface-variant">
                <span>Curated DSA Curriculum</span>
                <span className="font-semibold text-tertiary">157 Problems Verified</span>
              </div>
              <div className="flex items-center justify-between text-xs text-on-surface-variant">
                <span>External APIs / Backend</span>
                <span className="font-semibold text-emerald-600">Zero Dependencies (Demo Ready)</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-outline-variant/20">
              <button
                onClick={handleExportData}
                className="px-4 py-2 rounded-full bg-surface-container text-on-surface font-label-md text-label-md flex items-center gap-1.5 hover:bg-surface-container-high transition-colors font-semibold"
              >
                <span>📥</span>
                <span>Export Demo JSON</span>
              </button>
              <span className="text-xs text-secondary font-medium">Interview Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
