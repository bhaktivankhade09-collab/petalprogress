import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ALL_157_PROBLEMS } from '../data/dsaProblems';

export const RoadmapView = () => {
  const {
    completedProblems,
    toggleProblem,
    problemNotes,
    saveProblemNote,
    totalSolved,
    level1Solved,
    level2Solved,
    level3Solved,
  } = useApp();

  const [activeLevel, setActiveLevel] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'pending' | 'completed'
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [celebrationId, setCelebrationId] = useState(null);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [noteDraft, setNoteDraft] = useState('');

  // Extract unique topics for the active level
  const activeLevelProblems = useMemo(() => {
    return ALL_157_PROBLEMS.filter((p) => p.level === activeLevel);
  }, [activeLevel]);

  const topics = useMemo(() => {
    const set = new Set();
    activeLevelProblems.forEach((p) => set.add(p.topic));
    return ['all', ...Array.from(set)];
  }, [activeLevelProblems]);

  // Filter problems based on search, status, and topic
  const filteredProblems = useMemo(() => {
    return activeLevelProblems.filter((p) => {
      const isCompleted = Boolean(completedProblems[p.id]);

      // Status filter
      if (statusFilter === 'pending' && isCompleted) return false;
      if (statusFilter === 'completed' && !isCompleted) return false;

      // Topic filter
      if (selectedTopic !== 'all' && p.topic !== selectedTopic) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesTopic = p.topic.toLowerCase().includes(q);
        const matchesPattern = p.pattern.toLowerCase().includes(q);
        return matchesTitle || matchesTopic || matchesPattern;
      }

      return true;
    });
  }, [activeLevelProblems, completedProblems, statusFilter, selectedTopic, searchQuery]);

  const handleBloomClick = (problemId) => {
    toggleProblem(problemId);
    if (!completedProblems[problemId]) {
      setCelebrationId(problemId);
      setTimeout(() => {
        setCelebrationId(null);
      }, 1400);
    }
  };

  const getDifficultyBadge = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return {
          label: 'Sprout • Easy',
          bg: 'bg-surface-container-high text-secondary',
        };
      case 'Medium':
        return {
          label: 'Blossom • Medium',
          bg: 'bg-surface-container-high text-secondary',
        };
      case 'Hard':
        return {
          label: 'Deep Orchid • Hard',
          bg: 'bg-secondary-container text-on-secondary-container font-bold',
        };
      default:
        return {
          label: difficulty,
          bg: 'bg-surface-container text-on-surface-variant',
        };
    }
  };

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pb-16">
      {/* Track Overview & Curated Milestones */}
      <section aria-label="Roadmap Levels" className="flex flex-col gap-space-sm pt-2">
        <div className="flex items-center justify-between">
          <span className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
              spa
            </span>
            Curated 157 Milestones
          </span>
          <span className="font-label-sm text-label-sm text-secondary font-semibold bg-surface-container px-2.5 py-0.5 rounded-full">
            Total: {totalSolved} / 157 Bloomed
          </span>
        </div>

        {/* Level Cards Grid (3 Columns on Desktop/Tablet) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Level 1 */}
          <button
            onClick={() => {
              setActiveLevel(1);
              setSelectedTopic('all');
            }}
            className={`w-full text-left p-space-sm rounded-xl transition-all relative overflow-hidden group ${
              activeLevel === 1
                ? 'bg-surface-container-lowest shadow-[0_8px_24px_-4px_rgba(216,140,166,0.22)] ring-2 ring-primary/40'
                : 'bg-surface-container-low opacity-80 hover:opacity-100 shadow-sm'
            }`}
          >
            <div className="absolute top-0 right-0 w-20 h-20 -mr-6 -mt-6 bg-secondary-container/30 rounded-full blur-xl pointer-events-none"></div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                Level 1
              </span>
              <span className="material-symbols-outlined text-primary text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                nest_eco_leaf
              </span>
            </div>
            <div className="font-headline-sm text-headline-sm text-on-surface mb-0.5 leading-snug">Foundation</div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-3">
              45 Days • {level1Solved}/45 Bloomed
            </p>
            <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden flex">
              <div
                className="bg-primary h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.round((level1Solved / 45) * 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center mt-1.5">
              <span className="font-label-sm text-label-sm text-primary font-bold">
                {Math.round((level1Solved / 45) * 100)}% Bloomed
              </span>
              <span className="font-label-sm text-label-sm text-secondary font-medium">
                {45 - level1Solved} Left
              </span>
            </div>
          </button>

          {/* Level 2 */}
          <button
            onClick={() => {
              setActiveLevel(2);
              setSelectedTopic('all');
            }}
            className={`w-full text-left p-space-sm rounded-xl transition-all relative overflow-hidden group ${
              activeLevel === 2
                ? 'bg-surface-container-lowest shadow-[0_8px_24px_-4px_rgba(216,140,166,0.22)] ring-2 ring-primary/40'
                : 'bg-surface-container-low opacity-80 hover:opacity-100 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                Level 2
              </span>
              <span className="material-symbols-outlined text-on-surface-variant text-[18px]">
                psychology
              </span>
            </div>
            <div className="font-headline-sm text-headline-sm text-on-surface mb-0.5 leading-snug">Core Interview</div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-3">
              62 Days • {level2Solved}/62 Bloomed
            </p>
            <div className="w-full bg-surface-container-highest rounded-full h-2 overflow-hidden flex">
              <div
                className="bg-secondary h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.round((level2Solved / 62) * 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center mt-1.5">
              <span className="font-label-sm text-label-sm text-secondary font-medium">
                {Math.round((level2Solved / 62) * 100)}% Bloomed
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                {62 - level2Solved} Left
              </span>
            </div>
          </button>

          {/* Level 3 */}
          <button
            onClick={() => {
              setActiveLevel(3);
              setSelectedTopic('all');
            }}
            className={`w-full text-left p-space-sm rounded-xl transition-all relative overflow-hidden group ${
              activeLevel === 3
                ? 'bg-surface-container-lowest shadow-[0_8px_24px_-4px_rgba(216,140,166,0.22)] ring-2 ring-primary/40'
                : 'bg-surface-container-low opacity-75 hover:opacity-100 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                Level 3
              </span>
              <span className="material-symbols-outlined text-on-surface-variant text-[18px]">
                workspace_premium
              </span>
            </div>
            <div className="font-headline-sm text-headline-sm text-on-surface mb-0.5 leading-snug">Advanced Patterns</div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-3">
              50 Days • {level3Solved}/50 Bloomed
            </p>
            <div className="w-full bg-surface-container-highest rounded-full h-2 overflow-hidden flex">
              <div
                className="bg-secondary/60 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.round((level3Solved / 50) * 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center mt-1.5">
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                {level3Solved > 0 ? `${Math.round((level3Solved / 50) * 100)}%` : 'Dormant'}
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                {50 - level3Solved} Left
              </span>
            </div>
          </button>
        </div>
      </section>

      {/* Search & Filters */}
      <section aria-label="Search and Category Filters" className="flex flex-col gap-space-sm">
        {/* Search Bar */}
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${activeLevelProblems.length} Level ${activeLevel} problems, patterns, or topics...`}
            className="w-full pl-10 pr-10 py-2.5 rounded-full bg-surface-container-lowest border border-outline-variant/30 text-on-surface font-body-md text-body-md placeholder:text-outline shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary/40 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary"
            >
              <span className="material-symbols-outlined text-[18px]">cancel</span>
            </button>
          )}
        </div>

        {/* Status Tabs */}
        <div className="flex p-1 bg-surface-container rounded-xl gap-1">
          <button
            onClick={() => setStatusFilter('all')}
            className={`flex-1 py-1.5 rounded-lg font-label-md text-label-md transition-all ${
              statusFilter === 'all'
                ? 'bg-surface-container-lowest text-primary shadow-sm font-semibold'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            All ({activeLevelProblems.length})
          </button>
          <button
            onClick={() => setStatusFilter('pending')}
            className={`flex-1 py-1.5 rounded-lg font-label-md text-label-md transition-all ${
              statusFilter === 'pending'
                ? 'bg-surface-container-lowest text-primary shadow-sm font-semibold'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            To Bloom ({activeLevelProblems.filter((p) => !completedProblems[p.id]).length})
          </button>
          <button
            onClick={() => setStatusFilter('completed')}
            className={`flex-1 py-1.5 rounded-lg font-label-md text-label-md transition-all ${
              statusFilter === 'completed'
                ? 'bg-surface-container-lowest text-primary shadow-sm font-semibold'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            Bloomed ({activeLevelProblems.filter((p) => completedProblems[p.id]).length})
          </button>
        </div>

        {/* Horizontal Topic Filter Chips */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar -mx-margin-mobile px-margin-mobile">
          {topics.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTopic(t)}
              className={`whitespace-nowrap px-3.5 py-1.5 rounded-full font-label-md text-label-md flex items-center gap-1 active:scale-95 transition-all ${
                selectedTopic === t
                  ? 'bg-primary text-on-primary shadow-sm font-semibold'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              <span>{t === 'all' ? 'All Topics' : t}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Problem Count Indicator */}
      <div className="flex items-center justify-between px-1">
        <span className="font-label-sm text-label-sm text-on-surface-variant">
          Showing {filteredProblems.length} of {activeLevelProblems.length} Problems
        </span>
        <span className="font-label-sm text-label-sm text-secondary font-medium">
          Level {activeLevel}
        </span>
      </div>

      {/* Problem Cards List (Responsive 2-column grid on desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredProblems.map((problem) => {
          const isDone = Boolean(completedProblems[problem.id]);
          const badge = getDifficultyBadge(problem.difficulty);
          const hasNote = problemNotes[problem.id];
          const isCelebrating = celebrationId === problem.id;

          return (
            <article
              key={problem.id}
              className={`rounded-2xl p-space-md flex flex-col gap-space-sm relative overflow-hidden transition-all duration-300 ${
                isDone
                  ? 'bg-surface-container-lowest/80 shadow-[0_4px_16px_-4px_rgba(216,140,166,0.08)]'
                  : 'bg-surface-container-lowest shadow-[0_8px_24px_-4px_rgba(216,140,166,0.16)]'
              }`}
            >
              {/* Confetti celebration banner */}
              {isCelebrating && (
                <div className="absolute inset-0 z-20 pointer-events-none bg-primary/10 flex items-center justify-center font-headline-sm text-primary transition-opacity duration-700 animate-pulse backdrop-blur-xs">
                  🌸 Blossomed into your Garden! ✨
                </div>
              )}

              {/* Card Top: Day and Difficulty & Bloom Toggle */}
              <div className="flex items-start justify-between gap-space-sm">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-surface-container-low text-on-surface-variant font-medium">
                    Day {problem.day}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full font-label-sm text-label-sm font-semibold ${badge.bg}`}>
                    {badge.label}
                  </span>
                </div>

                <button
                  onClick={() => handleBloomClick(problem.id)}
                  className={`flex items-center gap-1 px-3 py-1 rounded-full font-label-sm text-label-sm font-semibold active:scale-95 transition-all shadow-sm ${
                    isDone
                      ? 'bg-tertiary-fixed text-tertiary'
                      : 'bg-surface-container text-primary hover:bg-secondary-container'
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontVariationSettings: isDone ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    {isDone ? 'check_circle' : 'nest_eco_leaf'}
                  </span>
                  <span>{isDone ? 'Bloomed' : 'Mark Bloomed'}</span>
                </button>
              </div>

              {/* Title & Pattern */}
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface leading-tight">
                  {problem.title}
                </h3>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="inline-flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm bg-surface-container-low px-2 py-1 rounded-md">
                    <span className="material-symbols-outlined text-[14px] text-tertiary">park</span>
                    {problem.topic}
                  </span>
                  <span className="inline-flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm bg-surface-container-low px-2 py-1 rounded-md">
                    <span className="material-symbols-outlined text-[14px] text-secondary">filter_vintage</span>
                    {problem.pattern}
                  </span>
                </div>
              </div>

              {/* Saved Note Display */}
              {hasNote && editingNoteId !== problem.id && (
                <div className="p-2 rounded-xl bg-surface-container-low text-on-surface-variant font-body-sm text-body-sm flex items-center justify-between">
                  <span className="italic truncate mr-2">“{hasNote}”</span>
                  <button
                    onClick={() => {
                      setEditingNoteId(problem.id);
                      setNoteDraft(hasNote);
                    }}
                    className="text-secondary hover:text-primary font-label-sm shrink-0"
                  >
                    Edit
                  </button>
                </div>
              )}

              {/* Inline Note Editor */}
              {editingNoteId === problem.id && (
                <div className="flex flex-col gap-2 p-2 bg-surface-container-low rounded-xl">
                  <input
                    type="text"
                    value={noteDraft}
                    onChange={(e) => setNoteDraft(e.target.value)}
                    placeholder="e.g. Solved with queue BFS in 15 mins..."
                    className="w-full px-2.5 py-1.5 rounded-lg bg-surface-container-lowest text-on-surface text-body-sm focus:outline-none"
                    autoFocus
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setEditingNoteId(null)}
                      className="px-2 py-1 text-on-surface-variant text-label-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        saveProblemNote(problem.id, noteDraft);
                        setEditingNoteId(null);
                      }}
                      className="px-3 py-1 bg-primary text-on-primary rounded-md text-label-sm font-semibold"
                    >
                      Save Note
                    </button>
                  </div>
                </div>
              )}

              {/* Footer Actions: LeetCode link + Notes Toggle */}
              <div className="flex items-center justify-between pt-1 border-t border-outline-variant/20">
                <a
                  href={problem.leetcodeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-label-sm text-label-sm text-secondary hover:text-primary flex items-center gap-1 transition-colors"
                >
                  <span>Solve on LeetCode</span>
                  <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                </a>

                {editingNoteId !== problem.id && (
                  <button
                    onClick={() => {
                      setEditingNoteId(problem.id);
                      setNoteDraft(hasNote || '');
                    }}
                    className="text-on-surface-variant hover:text-primary font-label-sm text-label-sm flex items-center gap-0.5 transition-colors"
                  >
                    <span>{hasNote ? 'Edit Notes' : 'Add Notes'}</span>
                    <span className="material-symbols-outlined text-[14px]">edit_note</span>
                  </button>
                )}
              </div>
            </article>
          );
        })}

        {filteredProblems.length === 0 && (
          <div className="flex flex-col items-center justify-center p-space-xl bg-surface-container-lowest rounded-2xl text-center shadow-sm">
            <div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center text-primary mb-2">
              <span className="material-symbols-outlined text-[28px]">search_off</span>
            </div>
            <p className="font-headline-sm text-headline-sm text-on-surface mb-1">
              No matching petals found
            </p>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Try searching another pattern like 'DFS', 'Stack', or clear the active filter.
            </p>
          </div>
        )}
      </div>

      {/* Visual Respite Mindful Banner */}
      <div className="rounded-2xl overflow-hidden shadow-sm bg-surface-container-lowest p-3.5 flex items-center gap-3 border border-outline-variant/20">
        <div className="w-14 h-14 rounded-2xl bg-secondary-container/50 text-primary flex items-center justify-center flex-shrink-0 shadow-sm">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7 text-primary">
            <path d="M12 22s8-4 8-10c0-4.42-3.58-8-8-8s-8 3.58-8 8c0 6 8 10 8 10z" fill="#ffd9e4" />
            <path d="M12 2v20" stroke="#874d63" />
          </svg>
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">
            Mindful Note
          </span>
          <p className="font-body-sm text-body-sm text-on-surface truncate">
            "Consistency turns small seeds of logic into algorithmic mastery."
          </p>
          <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
            Level {activeLevel} Study Track • {filteredProblems.length} available
          </span>
        </div>
      </div>
    </div>
  );
};
