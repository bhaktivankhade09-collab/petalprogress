import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ALL_157_PROBLEMS } from '../data/dsaProblems';
import { Icon } from '../components/Icon';

export const DashboardView = ({ setActiveTab }) => {
  const {
    userProfile,
    totalSolved,
    level1Solved,
    level2Solved,
    level3Solved,
    tasks,
    toggleTask,
    focusStats,
    completedProblems,
    toggleProblem,
  } = useApp();

  // Find the user's next recommended problem (first uncompleted problem or Day 1 for new user)
  const todaysProblem = useMemo(() => {
    return ALL_157_PROBLEMS.find((p) => !completedProblems[p.id]) || ALL_157_PROBLEMS[0];
  }, [completedProblems]);

  const isTodayProblemSolved = Boolean(completedProblems[todaysProblem.id]);

  // Micro Pomodoro Timer
  const [pomoSeconds, setPomoSeconds] = useState(25 * 60);
  const [isPomoRunning, setIsPomoRunning] = useState(false);
  const [pomoStatus, setPomoStatus] = useState('25m deep session • Ready');

  useEffect(() => {
    let timer = null;
    if (isPomoRunning && pomoSeconds > 0) {
      timer = setInterval(() => {
        setPomoSeconds((prev) => prev - 1);
      }, 1000);
    } else if (pomoSeconds === 0) {
      setIsPomoRunning(false);
      setPomoStatus('Session complete! Take a gentle sip of tea. 🍵');
    }
    return () => clearInterval(timer);
  }, [isPomoRunning, pomoSeconds]);

  const togglePomo = () => {
    if (!isPomoRunning) {
      setIsPomoRunning(true);
      setPomoStatus('Softly blooming... stay present');
    } else {
      setIsPomoRunning(false);
      setPomoStatus('Pencil paused • Breathe');
    }
  };

  const formatPomoTime = (sec) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const formatFocusTime = (mins) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h}h ${m}m`;
  };

  // Calculate problems solved today
  const solvedTodayCount = isTodayProblemSolved ? 1 : 0;
  const targetCount = userProfile.dailyProblemTarget || 3;
  const progressRatio = Math.min(100, Math.round((solvedTodayCount / targetCount) * 100));

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pb-12">
      {/* Welcome & Motivation Banner */}
      <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-1">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="font-headline-lg-mobile md:font-headline-lg text-primary tracking-tight font-bold">
              Hey, {userProfile.name}
            </h1>
            <span className="text-secondary text-2xl animate-pulse">♡</span>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
            Welcome back to your mindful DSA interview sanctuary
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-high text-on-secondary-container shadow-[0_2px_10px_rgba(216,140,166,0.14)] border border-outline-variant/30">
            <Icon name="local_florist" className="w-4 h-4 text-secondary" />
            <span className="font-label-md text-label-md font-semibold">Today • Placement Track</span>
          </div>
          <button
            onClick={() => setActiveTab('roadmap')}
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-on-primary font-label-md text-label-md font-semibold shadow-sm hover:bg-primary-container active:scale-95 transition-all"
          >
            <span>Continue 157 DSA</span>
            <Icon name="arrow_forward" className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Floral Affirmation Card */}
      <section className="relative overflow-hidden rounded-2xl bg-surface-container-lowest p-5 shadow-[0_8px_24px_-4px_rgba(216,140,166,0.14)] border border-outline-variant/20">
        <div className="absolute -right-8 -bottom-8 w-36 h-36 opacity-30 pointer-events-none rounded-full bg-gradient-to-tr from-secondary-container to-surface-container-high blur-xl"></div>
        <div className="flex items-start gap-3.5 relative z-10">
          <div className="w-11 h-11 rounded-2xl bg-surface-container flex items-center justify-center shrink-0 text-primary shadow-xs">
            <Icon name="spa" className="w-6 h-6 text-primary" />
          </div>
          <div className="flex flex-col space-y-1">
            <span className="font-label-sm text-label-sm text-secondary tracking-widest uppercase font-bold">
              Daily Blossom Thought
            </span>
            <p className="font-body-md text-body-md text-on-surface leading-relaxed font-medium">
              "Small steps, soft hearts, stronger futures. Every single problem you solve is a seed planted for tomorrow's engineering offer letter."
            </p>
          </div>
        </div>
      </section>

      {/* Daily Vital Stats Grid (4 columns on Desktop, 2 on Mobile) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="font-label-lg text-label-lg text-primary font-bold flex items-center gap-1.5">
            <Icon name="spa" className="w-4 h-4 text-secondary" />
            <span>Daily Bloom Metrics</span>
          </h2>
          <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
            Live Workspace Data
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Today's Target */}
          <div className="bg-surface-container-lowest p-4 rounded-2xl shadow-[0_4px_16px_rgba(216,140,166,0.10)] border border-outline-variant/20 flex flex-col justify-between hover:shadow-md transition-all">
            <div className="flex items-center justify-between text-on-surface-variant">
              <span className="font-label-sm text-label-sm font-semibold">Problems Today</span>
              <Icon name="check_circle" className="w-5 h-5 text-secondary" />
            </div>
            <div className="my-2.5 flex items-baseline gap-1.5">
              <span className="font-headline-md text-3xl text-primary font-bold">
                {solvedTodayCount}
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">
                / {targetCount} target
              </span>
            </div>
            <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden">
              <div
                className="bg-primary h-full rounded-full transition-all duration-500"
                style={{ width: `${progressRatio}%` }}
              ></div>
            </div>
          </div>

          {/* Card 2: DSA 157 Progress */}
          <div 
            onClick={() => setActiveTab('roadmap')}
            className="bg-surface-container-lowest p-4 rounded-2xl shadow-[0_4px_16px_rgba(216,140,166,0.10)] border border-outline-variant/20 flex flex-col justify-between cursor-pointer hover:shadow-md transition-all active:scale-[0.99] group"
          >
            <div className="flex items-center justify-between text-on-surface-variant">
              <span className="font-label-sm text-label-sm font-semibold group-hover:text-primary transition-colors">
                Total DSA Mastery
              </span>
              <Icon name="account_tree" className="w-5 h-5 text-secondary" />
            </div>
            <div className="my-2.5 flex items-baseline gap-1.5">
              <span className="font-headline-md text-3xl text-primary font-bold">{totalSolved}</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">/ 157 petals</span>
            </div>
            <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden">
              <div
                className="bg-secondary h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.round((totalSolved / 157) * 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Card 3: Streak */}
          <div 
            onClick={() => setActiveTab('progress')}
            className="bg-surface-container-lowest p-4 rounded-2xl shadow-[0_4px_16px_rgba(216,140,166,0.10)] border border-outline-variant/20 flex flex-col justify-between cursor-pointer hover:shadow-md transition-all active:scale-[0.99] group"
          >
            <div className="flex items-center justify-between text-on-surface-variant">
              <span className="font-label-sm text-label-sm font-semibold group-hover:text-primary transition-colors">
                Active Streak
              </span>
              <Icon name="local_fire_department" className="w-5 h-5 text-primary" />
            </div>
            <div className="my-2.5 flex items-baseline gap-1.5">
              <span className="font-headline-md text-3xl text-primary font-bold">
                {userProfile.streakDays}
              </span>
              <span className="font-label-md text-label-md text-secondary font-medium">
                Days glowing
              </span>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
              <span>🏆</span>
              <span>Best: {userProfile.bestStreak} Days</span>
            </span>
          </div>

          {/* Card 4: Focus Time */}
          <div 
            onClick={() => setActiveTab('focus-room')}
            className="bg-surface-container-lowest p-4 rounded-2xl shadow-[0_4px_16px_rgba(216,140,166,0.10)] border border-outline-variant/20 flex flex-col justify-between cursor-pointer hover:shadow-md transition-all active:scale-[0.99] group"
          >
            <div className="flex items-center justify-between text-on-surface-variant">
              <span className="font-label-sm text-label-sm font-semibold group-hover:text-primary transition-colors">
                Mindful Focus
              </span>
              <Icon name="hourglass_top" className="w-5 h-5 text-secondary" />
            </div>
            <div className="my-2.5 flex items-baseline gap-1.5">
              <span className="font-headline-md text-3xl text-primary font-bold">
                {formatFocusTime(focusStats.accumulatedMinutes)}
              </span>
            </div>
            <span className="font-label-sm text-label-sm text-tertiary font-medium flex items-center gap-1">
              <Icon name="check_circle" className="w-3.5 h-3.5 text-tertiary" />
              <span>{focusStats.completedCycles} cycles bloomed</span>
            </span>
          </div>
        </div>
      </section>

      {/* Main Responsive Grid Layout (Desktop 2 Columns: 7 cols & 5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
        {/* Left Column (Main Problem & Roadmap Breakdown) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Scheduled LeetCode Problem Spotlight */}
          <section className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h2 className="font-label-lg text-label-lg text-primary font-bold flex items-center gap-1.5">
                <Icon name="account_tree" className="w-4 h-4 text-secondary" />
                <span>Today's Curated Problem Spotlight</span>
              </h2>
              <span className="font-label-sm text-label-sm px-3 py-1 rounded-full bg-surface-container-high text-primary font-semibold">
                Day {todaysProblem.globalDay} of 157
              </span>
            </div>

            <div className="rounded-2xl bg-surface-container-lowest p-5 shadow-[0_8px_24px_-4px_rgba(216,140,166,0.15)] border border-outline-variant/20 flex flex-col space-y-4 relative overflow-hidden">
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full bg-surface-container-highest text-primary font-label-sm text-label-sm font-semibold">
                      {todaysProblem.difficulty} Blossom
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm">
                      Level {todaysProblem.level} • {todaysProblem.topic}
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-xl md:text-2xl text-primary font-bold leading-tight pt-1">
                    {todaysProblem.title}
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center shrink-0 text-primary shadow-xs">
                  <Icon name="local_florist" className="w-5 h-5 text-primary" />
                </div>
              </div>

              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Algorithmic Pattern: <span className="font-semibold text-on-surface">{todaysProblem.pattern}</span>. Traverse optimal states and minimize auxiliary memory.
              </p>

              {/* Action Buttons Row */}
              <div className="flex items-center gap-3 pt-1">
                <button
                  onClick={() => toggleProblem(todaysProblem.id)}
                  className={`flex-1 min-h-[46px] px-4 rounded-full font-label-md text-label-md font-semibold flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(108,54,75,0.25)] active:scale-95 transition-all ${
                    isTodayProblemSolved
                      ? 'bg-tertiary-fixed text-tertiary'
                      : 'bg-primary text-on-primary hover:bg-primary-container'
                  }`}
                >
                  <Icon name={isTodayProblemSolved ? 'check_circle' : 'spa'} className="w-5 h-5" />
                  <span>{isTodayProblemSolved ? 'Bloomed! 🌸' : 'Mark Problem Complete'}</span>
                </button>

                <a
                  className="min-h-[46px] px-5 rounded-full bg-surface-container-high text-primary font-label-md text-label-md font-semibold flex items-center justify-center gap-1.5 hover:bg-surface-container-highest active:scale-95 transition-all"
                  href={todaysProblem.leetcodeUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span>Open LeetCode</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          </section>

          {/* 3-Tier Roadmap Milestone Tracker */}
          <section className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h2 className="font-label-lg text-label-lg text-primary font-bold flex items-center gap-1.5">
                <Icon name="potted_plant" className="w-4 h-4 text-secondary" />
                <span>Curriculum Roadmap Stages</span>
              </h2>
              <button
                onClick={() => setActiveTab('roadmap')}
                className="font-label-sm text-label-sm text-secondary font-semibold hover:underline"
              >
                View Full 157-Day Tree →
              </button>
            </div>

            <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-[0_8px_24px_-4px_rgba(216,140,166,0.12)] border border-outline-variant/20 space-y-4">
              {/* Level 1 */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-tertiary"></div>
                    <span className="font-label-md text-label-md text-on-surface font-bold">
                      Level 1 — Seedling Foundation
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-tertiary font-bold">
                    {level1Solved} / 45 ({Math.round((level1Solved / 45) * 100)}%)
                  </span>
                </div>
                <div className="w-full bg-surface-container-low rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-tertiary-container h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.round((level1Solved / 45) * 100)}%` }}
                  ></div>
                </div>
                <p className="font-label-sm text-label-sm text-on-surface-variant">
                  Arrays, Strings, Hashmaps, Two Pointers, Linked Lists & Binary Search
                </p>
              </div>

              {/* Level 2 (Active) */}
              <div className="space-y-1.5 pt-2 border-t border-outline-variant/15">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></div>
                    <span className="font-label-md text-label-md text-primary font-bold">
                      Level 2 — Core Blooming Interview
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-primary font-bold">
                    {level2Solved} / 62 ({Math.round((level2Solved / 62) * 100)}%)
                  </span>
                </div>
                <div className="w-full bg-surface-container-low rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-primary h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.round((level2Solved / 62) * 100)}%` }}
                  ></div>
                </div>
                <p className="font-label-sm text-label-sm text-on-surface-variant">
                  Binary Trees, Graphs BFS/DFS, Heaps, Backtracking & Dynamic Programming
                </p>
              </div>

              {/* Level 3 */}
              <div className="space-y-1.5 pt-2 border-t border-outline-variant/15">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-secondary"></div>
                    <span className="font-label-md text-label-md text-on-surface font-semibold">
                      Level 3 — Wild Blossom Mastery
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                    {level3Solved} / 50 ({Math.round((level3Solved / 50) * 100)}%)
                  </span>
                </div>
                <div className="w-full bg-surface-container-low rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-secondary h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.round((level3Solved / 50) * 100)}%` }}
                  ></div>
                </div>
                <p className="font-label-sm text-label-sm text-on-surface-variant">
                  Advanced Tries, Segment Trees, Bit Manipulation & Multi-Dimensional DP
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column (Tasks & Quick Focus Pomodoro) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Focus Bloom Widget */}
          <section className="bg-surface-container-lowest p-5 rounded-2xl shadow-[0_8px_24px_-4px_rgba(216,140,166,0.12)] border border-outline-variant/20 flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-surface-container flex items-center justify-center text-primary shrink-0">
                  <Icon name="hourglass_top" className="w-5 h-5 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-primary font-bold">Quick Focus Timer</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">{pomoStatus}</span>
                </div>
              </div>
              <span className="font-headline-md text-2xl text-primary font-bold tabular-nums">
                {formatPomoTime(pomoSeconds)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={togglePomo}
                className="flex-1 py-2.5 rounded-full bg-primary text-on-primary font-label-md text-label-md font-semibold shadow-sm hover:bg-primary-container active:scale-95 transition-all flex items-center justify-center gap-1.5"
              >
                <Icon name={isPomoRunning ? 'pause' : 'play_arrow'} className="w-4 h-4" />
                <span>{isPomoRunning ? 'Pause Session' : 'Start 25m Timer'}</span>
              </button>
              <button
                onClick={() => setActiveTab('focus-room')}
                className="px-4 py-2.5 rounded-full bg-surface-container text-on-surface-variant font-label-md text-label-md hover:text-primary transition-colors text-center"
              >
                Full Room →
              </button>
            </div>
          </section>

          {/* Interactive Daily Study Tasks */}
          <section className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h2 className="font-label-lg text-label-lg text-primary font-bold flex items-center gap-1.5">
                <Icon name="checklist" className="w-4 h-4 text-secondary" />
                <span>Today's Study Tasks</span>
              </h2>
              <button
                onClick={() => setActiveTab('tasks')}
                className="font-label-sm text-label-sm text-secondary hover:text-primary transition-colors flex items-center gap-0.5"
              >
                <span>View All ({tasks.length})</span>
                <Icon name="arrow_forward" className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="bg-surface-container-lowest p-4 rounded-2xl shadow-[0_8px_24px_-4px_rgba(216,140,166,0.12)] border border-outline-variant/20 space-y-2.5">
              {tasks.length > 0 ? (
                tasks.slice(0, 4).map((task) => (
                  <div
                    key={task.id}
                    className="p-3 rounded-xl bg-surface-container-low flex items-center justify-between gap-3 transition-colors hover:shadow-xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-transform active:scale-90 border ${
                          task.completed
                            ? 'bg-tertiary text-on-tertiary border-tertiary'
                            : 'bg-surface-container-high text-primary border-outline-variant/40'
                        }`}
                      >
                        {task.completed && <span className="text-xs">✓</span>}
                      </button>
                      <div className="flex flex-col min-w-0">
                        <span
                          className={`font-body-md text-body-md truncate font-medium ${
                            task.completed ? 'text-on-surface-variant line-through' : 'text-on-surface'
                          }`}
                        >
                          {task.title}
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          {task.duration} • {task.priority} Priority
                        </span>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm shrink-0 ${
                        task.completed
                          ? 'bg-surface-container text-on-surface-variant'
                          : 'bg-surface-container-high text-primary font-semibold'
                      }`}
                    >
                      {task.completed ? 'Done' : task.priority}
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-body-sm text-on-surface-variant">
                  No tasks today. Tap below to plant your first task!
                </div>
              )}

              <button
                onClick={() => setActiveTab('tasks')}
                className="w-full py-2 rounded-xl bg-surface-container text-primary font-label-sm text-label-sm hover:bg-surface-container-high transition-colors font-semibold flex items-center justify-center gap-1"
              >
                <span>+ Manage Flower Bed Tasks</span>
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
