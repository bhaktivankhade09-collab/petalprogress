import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Icon } from '../components/Icon';

export const FocusRoomView = () => {
  const { focusStats, logFocusSession, userProfile } = useApp();

  const [selectedDurationMins, setSelectedDurationMins] = useState(25); // 25 mins default Pomodoro
  const [remainingSeconds, setRemainingSeconds] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [shortBreakMins] = useState(5);
  const [selectedSoundscape, setSelectedSoundscape] = useState('Gentle Rain & Soft Piano ♫');
  const [resetConfirm, setResetConfirm] = useState(false);
  const [sessionCompletedNotice, setSessionCompletedNotice] = useState(false);

  const presets = [
    { label: '25m Pomodoro', mins: 25 },
    { label: '45m Deep Work', mins: 45 },
    { label: '60m Marathon', mins: 60 },
    { label: '90m Flow State', mins: 90 },
    { label: '2h Extended', mins: 120 },
    { label: '3h Full Sanctuary', mins: 180 },
  ];

  const soundscapes = [
    'Gentle Rain & Soft Piano ♫',
    'Morning Garden Birds & Breeze 🕊️',
    'Binaural Alpha Waves (432Hz) 🌊',
    'Quiet Library Raindrops 🌧️',
    'Deep Space Ambient Hum 🌌',
  ];

  // Tick countdown timer
  useEffect(() => {
    let interval = null;
    if (isRunning && remainingSeconds > 0) {
      interval = setInterval(() => {
        setRemainingSeconds((prev) => prev - 1);
      }, 1000);
    } else if (remainingSeconds === 0 && isRunning) {
      setIsRunning(false);
      logFocusSession(selectedDurationMins, isBreak ? 'Restful Break' : 'Deep Work Session');
      setSessionCompletedNotice(true);
      setTimeout(() => setSessionCompletedNotice(false), 3500);
    }
    return () => clearInterval(interval);
  }, [isRunning, remainingSeconds, selectedDurationMins, isBreak, logFocusSession]);

  const handleSelectPreset = (mins) => {
    setIsRunning(false);
    setSelectedDurationMins(mins);
    setRemainingSeconds(mins * 60);
    setIsBreak(false);
  };

  const togglePlay = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    if (!resetConfirm) {
      setResetConfirm(true);
      setTimeout(() => setResetConfirm(false), 2500);
    } else {
      setIsRunning(false);
      setRemainingSeconds(selectedDurationMins * 60);
      setResetConfirm(false);
    }
  };

  const handleSkipToBreak = () => {
    setIsRunning(false);
    setIsBreak(true);
    setSelectedDurationMins(shortBreakMins);
    setRemainingSeconds(shortBreakMins * 60);
  };

  const handleQuickLogSession = () => {
    logFocusSession(30, 'Deep Work • Algorithmic Patterns');
    setSessionCompletedNotice(true);
    setTimeout(() => setSessionCompletedNotice(false), 3500);
  };

  // Circular SVG ring calculation (radius 112 -> circumference ~703.7)
  const totalDurationSecs = selectedDurationMins * 60;
  const progressRatio = totalDurationSecs > 0 ? (totalDurationSecs - remainingSeconds) / totalDurationSecs : 0;
  const circumference = 2 * Math.PI * 112;
  const strokeDashoffset = circumference * (1 - progressRatio);

  const formatCountdown = (totalSec) => {
    const hours = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    const pad = (n) => String(n).padStart(2, '0');
    if (hours > 0) {
      return `${hours}:${pad(mins)}:${pad(secs)}`;
    }
    return `${pad(mins)}:${pad(secs)}`;
  };

  const totalFocusHours = (focusStats.accumulatedMinutes / 60).toFixed(1);
  const goalProgressPct = Math.min(100, Math.round((focusStats.accumulatedMinutes / (userProfile.focusGoalHours * 60)) * 100));

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pt-1">
        <div>
          <div className="flex items-center gap-1.5 text-secondary">
            <Icon name="hourglass_top" className="w-4 h-4 text-secondary" />
            <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
              Deep Work Space
            </span>
          </div>
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-primary font-bold mt-1">
            Focus Room Sanctuary
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
            Calm circular countdown, customizable presets, and peaceful focus sessions
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-label-sm text-label-sm bg-surface-container-high px-3.5 py-1.5 rounded-full text-primary font-semibold border border-outline-variant/30 flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full bg-emerald-500 ${isRunning ? 'animate-ping' : ''}`}></span>
            <span>{isRunning ? 'Flow State Active' : 'Resting State'}</span>
          </span>
        </div>
      </div>

      {sessionCompletedNotice && (
        <div className="p-3.5 rounded-2xl bg-tertiary-fixed text-tertiary font-label-md text-label-md text-center shadow-sm animate-petal">
          🌸 Session logged! +30 mins focus time and a new petal bloomed in your garden!
        </div>
      )}

      {/* Main 2-Column Responsive Layout on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (Circular Timer & Ambient Sound) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Ambient Inspiration & Status Banner */}
          <section className="relative w-full rounded-2xl overflow-hidden bg-surface-container-low shadow-[0_8px_24px_-4px_rgba(216,140,166,0.14)] p-5 flex flex-col justify-between border border-outline-variant/20">
            <div className="absolute inset-0 opacity-30 pointer-events-none bg-gradient-to-br from-secondary-container/50 via-surface-container to-transparent"></div>
            <div className="relative z-10 flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container shadow-xs">
                  <Icon name="spa" className="w-4 h-4 text-primary" />
                </span>
                <div>
                  <span className="font-label-lg text-label-lg text-primary font-bold block leading-tight">
                    Mindful Focus Room
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Quiet thoughts, deep algorithmic intuition.
                  </span>
                </div>
              </div>
            </div>
            <div className="relative z-10 mt-3 pt-2.5 bg-surface-container-lowest/80 backdrop-blur-sm rounded-xl p-3 shadow-xs">
              <p className="font-body-sm text-body-sm text-on-surface italic text-center">
                “In quiet moments of deep work, your skills take deep root and bloom with grace. ♡”
              </p>
            </div>
          </section>

          {/* Circular Focus Timer Card */}
          <section className="relative w-full bg-surface-container-lowest rounded-3xl p-6 sm:p-8 shadow-[0_12px_32px_-6px_rgba(216,140,166,0.18)] flex flex-col items-center overflow-hidden border border-outline-variant/20">
            <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full opacity-25 pointer-events-none bg-gradient-to-br from-primary via-secondary to-transparent blur-2xl"></div>

            {/* Session Header */}
            <div className="flex flex-col items-center mb-2">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold bg-surface-container px-3.5 py-1 rounded-full mb-1.5 border border-outline-variant/30">
                {isBreak ? 'Refreshing Break' : `Focus Session • ${Math.floor(selectedDurationMins / 60) > 0 ? `${Math.floor(selectedDurationMins / 60)}h ` : ''}${selectedDurationMins % 60}m`}
              </span>
              <h2 className="font-headline-sm text-xl md:text-2xl text-on-surface text-center font-bold">
                {isBreak ? 'Breathe & Rest Your Eyes' : 'Deep Work • Botanical Mindset'}
              </h2>
            </div>

            {/* Circular Progress Ring */}
            <div className="relative my-6 flex items-center justify-center">
              <svg className="w-72 h-72 transform -rotate-90">
                {/* Background Base Ring */}
                <circle
                  className="text-surface-container"
                  cx="144"
                  cy="144"
                  fill="transparent"
                  r="112"
                  stroke="currentColor"
                  strokeWidth="12"
                ></circle>
                {/* Soft decorative ticks */}
                <circle
                  className="text-secondary-container opacity-60"
                  cx="144"
                  cy="144"
                  fill="transparent"
                  r="112"
                  stroke="currentColor"
                  strokeDasharray="3 20"
                  strokeWidth="12"
                ></circle>
                {/* Active Progress Stroke */}
                <circle
                  className="text-primary transition-all duration-1000 ease-linear shadow-[0_0_12px_rgba(135,77,99,0.35)]"
                  cx="144"
                  cy="144"
                  fill="transparent"
                  r="112"
                  stroke="currentColor"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  strokeWidth="12"
                ></circle>
              </svg>

              {/* Center Countdown Display */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className={`text-secondary text-2xl mb-1 ${isRunning ? 'animate-bounce' : ''}`}>
                  🌸
                </span>
                <span className="font-headline-xl text-5xl text-primary tracking-tight font-bold tabular-nums">
                  {formatCountdown(remainingSeconds)}
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant mt-1.5 flex items-center gap-1">
                  <Icon name="spa" className="w-3.5 h-3.5 text-tertiary" />
                  <span>{isRunning ? 'Petals blossoming softly' : 'Timer on standby'}</span>
                </span>
              </div>
            </div>

            {/* Controls: Reset, Play/Pause, Break */}
            <div className="flex items-center gap-3.5 mt-2">
              <button
                onClick={handleReset}
                className="min-h-[46px] px-5 py-2 rounded-full bg-surface-container-high text-on-secondary-container hover:bg-surface-container-highest transition-all flex items-center justify-center gap-1.5 active:scale-95 font-semibold text-sm"
              >
                <Icon name="restart_alt" className="w-4 h-4" />
                <span>{resetConfirm ? 'Sure?' : 'Reset'}</span>
              </button>

              <button
                onClick={togglePlay}
                className="min-h-[50px] px-10 py-3 rounded-full bg-primary text-on-primary shadow-[0_6px_20px_rgba(108,54,75,0.35)] hover:bg-primary-container active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Icon name={isRunning ? 'pause' : 'play_arrow'} className="w-5 h-5" />
                <span className="font-label-lg text-base font-semibold tracking-wide">
                  {isRunning ? 'Pause' : 'Start Focus'}
                </span>
              </button>

              <button
                onClick={handleSkipToBreak}
                className="min-h-[46px] px-5 py-2 rounded-full bg-surface-container-high text-on-secondary-container hover:bg-surface-container-highest transition-all flex items-center justify-center gap-1.5 active:scale-95 font-semibold text-sm"
              >
                <Icon name="coffee" className="w-4 h-4" />
                <span>Break</span>
              </button>
            </div>

            {/* Quick Demo Session Button */}
            <button
              onClick={handleQuickLogSession}
              className="mt-4 text-xs text-secondary hover:text-primary font-semibold underline flex items-center justify-center gap-1 mx-auto transition-colors"
              title="Instantly simulate completing a 30m focus session for demo"
            >
              <span>✨ Complete & Log 30m Focus Session (Demo Quick-Action)</span>
            </button>

            {/* Ambient Soundscape Selector */}
            <div className="mt-5 w-full flex items-center justify-between bg-surface-container-low px-4 py-3 rounded-2xl border border-outline-variant/20">
              <div className="flex items-center gap-2.5 truncate mr-2">
                <span className="text-lg">🎵</span>
                <span className="font-label-sm text-sm text-on-surface font-medium truncate">
                  {selectedSoundscape}
                </span>
              </div>
              <button
                onClick={() => {
                  const nextIndex = (soundscapes.indexOf(selectedSoundscape) + 1) % soundscapes.length;
                  setSelectedSoundscape(soundscapes[nextIndex]);
                }}
                className="px-3.5 py-1.5 rounded-full bg-surface-container-highest text-primary font-label-sm text-xs font-semibold hover:bg-secondary-container transition-colors shrink-0"
              >
                Switch Sound
              </button>
            </div>
          </section>
        </div>

        {/* Right Column (Presets & History Log) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Daily Goal Overview Card */}
          <section className="w-full bg-surface-container-lowest rounded-2xl p-5 shadow-[0_6px_20px_-4px_rgba(216,140,166,0.12)] border border-outline-variant/20 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">
                Daily Focus Target
              </span>
              <span className="text-xs font-bold text-primary">
                {totalFocusHours}h / {userProfile.focusGoalHours}h ({goalProgressPct}%)
              </span>
            </div>

            <div className="w-full bg-surface-container rounded-full h-3 overflow-hidden">
              <div
                className="bg-primary h-full rounded-full transition-all duration-500"
                style={{ width: `${goalProgressPct}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between text-xs text-on-surface-variant pt-1">
              <span>{focusStats.completedCycles} cycles completed</span>
              <span>Goal: {userProfile.focusGoalHours} hours</span>
            </div>
          </section>

          {/* Duration Presets Section */}
          <section className="w-full bg-surface-container-lowest rounded-2xl p-5 shadow-[0_6px_20px_-4px_rgba(216,140,166,0.12)] border border-outline-variant/20">
            <span className="font-label-sm text-label-sm text-on-surface-variant font-bold block mb-3">
              Select Focus Duration Preset
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {presets.map((p) => {
                const isSelected = selectedDurationMins === p.mins && !isBreak;
                return (
                  <button
                    key={p.label}
                    onClick={() => handleSelectPreset(p.mins)}
                    className={`py-2.5 px-2 rounded-xl text-center font-label-md text-sm font-semibold transition-all ${
                      isSelected
                        ? 'bg-primary text-on-primary shadow-sm'
                        : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Focus History Log */}
          <section className="w-full bg-surface-container-lowest rounded-2xl p-5 shadow-[0_6px_20px_-4px_rgba(216,140,166,0.12)] border border-outline-variant/20 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                <h3 className="font-label-lg font-bold text-on-surface">Recent Focus Cycles</h3>
              </div>
              <span className="text-xs text-secondary font-medium">
                {focusStats.completedCycles} cycles today
              </span>
            </div>

            <div className="space-y-2.5">
              {focusStats.logs.map((log) => (
                <div
                  key={log.id}
                  className="p-3.5 rounded-xl bg-surface-container-low flex items-center justify-between text-body-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-primary text-base">🌸</span>
                    <div>
                      <span className="font-medium text-on-surface block leading-tight">{log.title}</span>
                      <span className="text-xs text-on-surface-variant">{log.time}</span>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-surface-container text-primary font-bold text-xs">
                    {log.duration}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
