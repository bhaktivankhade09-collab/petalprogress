import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useAuth } from './AuthContext';
import { ALL_157_PROBLEMS } from '../data/dsaProblems';
import { INITIAL_QUOTES } from '../data/quotesData';
import {
  INITIAL_COMPLETED_PROBLEMS,
  INITIAL_PROBLEM_NOTES,
  INITIAL_TASKS,
  INITIAL_FOCUS_STATS,
  INITIAL_PLANTED_PETALS,
  INITIAL_QUOTE_FAVORITES,
  DEFAULT_DEMO_USER,
  DEFAULT_DEMO_PROFILE,
} from '../data/demoData';

const AppContext = createContext();

const KEY_PROBLEMS = 'petal_demo_problems';
const KEY_NOTES = 'petal_demo_notes';
const KEY_TASKS = 'petal_demo_tasks';
const KEY_FOCUS = 'petal_demo_focus';
const KEY_PETALS = 'petal_demo_petals';
const KEY_QUOTES = 'petal_demo_quotes';

export const AppProvider = ({ children }) => {
  const { user, profile } = useAuth();

  // State backed by localStorage with rich initial fallback
  const [completedProblems, setCompletedProblems] = useState(() => {
    try {
      const saved = localStorage.getItem(KEY_PROBLEMS);
      return saved ? JSON.parse(saved) : INITIAL_COMPLETED_PROBLEMS;
    } catch {
      return INITIAL_COMPLETED_PROBLEMS;
    }
  });

  const [problemNotes, setProblemNotes] = useState(() => {
    try {
      const saved = localStorage.getItem(KEY_NOTES);
      return saved ? JSON.parse(saved) : INITIAL_PROBLEM_NOTES;
    } catch {
      return INITIAL_PROBLEM_NOTES;
    }
  });

  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(KEY_TASKS);
      return saved ? JSON.parse(saved) : INITIAL_TASKS;
    } catch {
      return INITIAL_TASKS;
    }
  });

  const [focusStats, setFocusStats] = useState(() => {
    try {
      const saved = localStorage.getItem(KEY_FOCUS);
      return saved ? JSON.parse(saved) : INITIAL_FOCUS_STATS;
    } catch {
      return INITIAL_FOCUS_STATS;
    }
  });

  const [plantedPetals, setPlantedPetals] = useState(() => {
    try {
      const saved = localStorage.getItem(KEY_PETALS);
      return saved ? JSON.parse(saved) : INITIAL_PLANTED_PETALS;
    } catch {
      return INITIAL_PLANTED_PETALS;
    }
  });

  const [quoteFavorites, setQuoteFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(KEY_QUOTES);
      return saved ? JSON.parse(saved) : INITIAL_QUOTE_FAVORITES;
    } catch {
      return INITIAL_QUOTE_FAVORITES;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(KEY_PROBLEMS, JSON.stringify(completedProblems));
    } catch (e) { console.error(e); }
  }, [completedProblems]);

  useEffect(() => {
    try {
      localStorage.setItem(KEY_NOTES, JSON.stringify(problemNotes));
    } catch (e) { console.error(e); }
  }, [problemNotes]);

  useEffect(() => {
    try {
      localStorage.setItem(KEY_TASKS, JSON.stringify(tasks));
    } catch (e) { console.error(e); }
  }, [tasks]);

  useEffect(() => {
    try {
      localStorage.setItem(KEY_FOCUS, JSON.stringify(focusStats));
    } catch (e) { console.error(e); }
  }, [focusStats]);

  useEffect(() => {
    try {
      localStorage.setItem(KEY_PETALS, JSON.stringify(plantedPetals));
    } catch (e) { console.error(e); }
  }, [plantedPetals]);

  useEffect(() => {
    try {
      localStorage.setItem(KEY_QUOTES, JSON.stringify(quoteFavorites));
    } catch (e) { console.error(e); }
  }, [quoteFavorites]);

  // Reset to full demo dataset (great for an interview demo)
  const resetToDemoData = () => {
    setCompletedProblems(INITIAL_COMPLETED_PROBLEMS);
    setProblemNotes(INITIAL_PROBLEM_NOTES);
    setTasks(INITIAL_TASKS);
    setFocusStats(INITIAL_FOCUS_STATS);
    setPlantedPetals(INITIAL_PLANTED_PETALS);
    setQuoteFavorites(INITIAL_QUOTE_FAVORITES);

    localStorage.setItem(KEY_PROBLEMS, JSON.stringify(INITIAL_COMPLETED_PROBLEMS));
    localStorage.setItem(KEY_NOTES, JSON.stringify(INITIAL_PROBLEM_NOTES));
    localStorage.setItem(KEY_TASKS, JSON.stringify(INITIAL_TASKS));
    localStorage.setItem(KEY_FOCUS, JSON.stringify(INITIAL_FOCUS_STATS));
    localStorage.setItem(KEY_PETALS, JSON.stringify(INITIAL_PLANTED_PETALS));
    localStorage.setItem(KEY_QUOTES, JSON.stringify(INITIAL_QUOTE_FAVORITES));
  };

  // Actions
  const toggleProblem = (problemId) => {
    setCompletedProblems((prev) => {
      const next = { ...prev };
      if (next[problemId]) {
        delete next[problemId];
      } else {
        next[problemId] = true;
      }
      return next;
    });
  };

  const saveProblemNote = (problemId, noteText) => {
    setProblemNotes((prev) => ({
      ...prev,
      [problemId]: noteText,
    }));
  };

  const toggleTask = (taskId) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const newStatus = !t.completed;
          return {
            ...t,
            completed: newStatus,
            completed_at: newStatus ? new Date().toISOString() : null,
          };
        }
        return t;
      })
    );
  };

  const addTask = (title, priority = 'Medium', duration = '30 mins', category = 'Practice') => {
    if (!title?.trim()) return;
    const newTask = {
      id: `task-${Date.now()}`,
      title: title.trim(),
      priority,
      duration,
      category,
      completed: false,
      created_at: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const deleteTask = (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const logFocusSession = (minutes, label = 'Deep Work Session') => {
    if (!minutes || minutes <= 0) return;

    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const durationStr = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;

    const newLogItem = {
      id: `focus-${Date.now()}`,
      title: label,
      time: 'Just now',
      duration: durationStr,
      color: 'primary',
      created_at: new Date().toISOString(),
    };

    setFocusStats((prev) => ({
      ...prev,
      accumulatedMinutes: prev.accumulatedMinutes + minutes,
      completedCycles: prev.completedCycles + 1,
      logs: [newLogItem, ...prev.logs],
    }));

    // Auto-bloom a petal reflection in garden
    plantPetal(`“Completed a focused ${durationStr} session on ${label}.”`, 'Focus Blossom');
  };

  const plantPetal = (text, flower = 'Blush Rose') => {
    if (!text?.trim()) return;
    const newPetal = {
      id: `petal-${Date.now()}`,
      text: text.trim(),
      createdAt: 'Today',
      flower,
      tag: 'Mindful Growth',
    };
    setPlantedPetals((prev) => [newPetal, ...prev]);
  };

  const toggleQuoteFavorite = (quoteId) => {
    setQuoteFavorites((prev) => {
      const next = { ...prev };
      if (next[quoteId]) {
        delete next[quoteId];
      } else {
        next[quoteId] = true;
      }
      return next;
    });
  };

  // Derived metrics
  const totalSolved = Object.keys(completedProblems).length;
  const level1Solved = ALL_157_PROBLEMS.filter((p) => p.level === 1 && completedProblems[p.id]).length;
  const level2Solved = ALL_157_PROBLEMS.filter((p) => p.level === 2 && completedProblems[p.id]).length;
  const level3Solved = ALL_157_PROBLEMS.filter((p) => p.level === 3 && completedProblems[p.id]).length;

  // Streak: 14 active days in demo mode + dynamically incrementing
  const streakDays = 14;

  // Derived quotes array
  const quotes = useMemo(() => {
    return INITIAL_QUOTES.map((q) => ({
      ...q,
      isFavorite: Boolean(quoteFavorites[q.id]),
    }));
  }, [quoteFavorites]);

  // Merged user profile
  const userProfile = useMemo(() => {
    return {
      name: profile?.full_name || user?.user_metadata?.full_name || 'Elena Rostova',
      email: profile?.email || user?.email || 'elena.rostova@petalprogress.demo',
      avatar: profile?.avatar_url || '',
      streakDays: streakDays,
      bestStreak: 18,
      dailyProblemTarget: profile?.daily_problem_target || 3,
      focusGoalHours: profile?.focus_goal_hours || 4,
      soundscape: profile?.soundscape || 'Gentle Rain & Soft Piano ♫',
    };
  }, [profile, user, streakDays]);

  return (
    <AppContext.Provider
      value={{
        isLoadingData: false,
        completedProblems,
        toggleProblem,
        problemNotes,
        saveProblemNote,
        tasks,
        toggleTask,
        addTask,
        deleteTask,
        quotes,
        toggleQuoteFavorite,
        plantedPetals,
        plantPetal,
        focusStats,
        logFocusSession,
        userProfile,
        totalSolved,
        level1Solved,
        level2Solved,
        level3Solved,
        resetToDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
