import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ALL_157_PROBLEMS } from '../data/dsaProblems';
import { Icon } from '../components/Icon';

export const ProgressView = () => {
  const { totalSolved, level1Solved, level2Solved, level3Solved, userProfile, completedProblems } = useApp();

  // Topic mastery calculation
  const topicStats = useMemo(() => {
    const stats = {};
    ALL_157_PROBLEMS.forEach((p) => {
      if (!stats[p.topic]) {
        stats[p.topic] = { total: 0, completed: 0 };
      }
      stats[p.topic].total += 1;
      if (completedProblems[p.id]) {
        stats[p.topic].completed += 1;
      }
    });

    return Object.entries(stats).map(([topic, data]) => ({
      topic,
      ...data,
      pct: Math.round((data.completed / data.total) * 100),
    })).sort((a, b) => b.completed - a.completed);
  }, [completedProblems]);

  const milestones = [
    { title: 'First Seed', desc: 'Solved first LeetCode problem', unlocked: totalSolved >= 1, icon: 'spa' },
    { title: '7-Day Bloom', desc: 'Maintained 7 consecutive active days', unlocked: userProfile.streakDays >= 7, icon: 'local_fire_department' },
    { title: 'Foundation Master', desc: 'Complete 30 Level 1 problems', unlocked: level1Solved >= 30, icon: 'nest_eco_leaf' },
    { title: '50-Petal Bouquet', desc: 'Reach 50 solved roadmap problems', unlocked: totalSolved >= 50, icon: 'local_florist' },
    { title: 'Graph Explorer', desc: 'Complete 5 Graph BFS/DFS drills', unlocked: true, icon: 'hub' },
    { title: 'DSA Interview Ready', desc: 'Complete all 157 milestones', unlocked: totalSolved === 157, icon: 'military_tech' },
  ];

  const overallPct = Math.round((totalSolved / 157) * 100);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-outline-variant/30 pb-4">
        <div>
          <div className="flex items-center gap-1.5 text-secondary">
            <Icon name="insights" className="w-4 h-4 text-secondary" />
            <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
              Mastery Analytics & Growth
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-primary mt-1 font-bold">
            Botanical Progress Sanctuary
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Watch your problem-solving abilities blossom into full interview readiness
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-label-md text-label-md bg-secondary-container text-on-secondary-container px-3.5 py-1.5 rounded-full font-bold shadow-xs">
            {overallPct}% Overall Readiness
          </span>
          <span className="font-label-md text-label-md bg-surface-container-high text-primary px-3.5 py-1.5 rounded-full font-bold shadow-xs">
            {totalSolved} / 157 Bloomed
          </span>
        </div>
      </div>

      {/* Top Grid: Hero Mastery (5 cols) + Milestones (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Hero Mastery Card */}
        <div className="lg:col-span-5 rounded-3xl bg-surface-container-lowest p-6 sm:p-7 shadow-[0_12px_32px_-6px_rgba(216,140,166,0.18)] border border-outline-variant/30 flex flex-col justify-between gap-6 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-label-sm text-label-sm text-secondary uppercase font-semibold tracking-wider">
                Curated LeetCode 157 Mastery
              </span>
              <div className="flex items-baseline gap-2.5 mt-1.5">
                <span className="font-headline-xl text-headline-xl text-primary font-bold text-4xl sm:text-5xl">
                  {totalSolved}
                </span>
                <span className="font-headline-sm text-headline-sm text-on-surface-variant font-medium">
                  / 157 Petals Bloomed
                </span>
              </div>
            </div>
            <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-primary text-3xl shadow-sm shrink-0">
              🌸
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-on-surface-variant">
              <span>Overall Completion</span>
              <span className="text-primary">{overallPct}%</span>
            </div>
            <div className="w-full bg-surface-container rounded-full h-3.5 overflow-hidden">
              <div
                className="bg-primary h-full rounded-full transition-all duration-700 shadow-xs"
                style={{ width: `${overallPct}%` }}
              ></div>
            </div>
          </div>

          {/* Level Breakdown Grid */}
          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-outline-variant/20 text-center">
            <div className="p-3 rounded-2xl bg-surface-container-low border border-outline-variant/20">
              <span className="font-label-xs text-[11px] text-on-surface-variant block uppercase font-medium">Level 1</span>
              <span className="font-label-lg text-label-lg text-tertiary font-bold block mt-0.5">
                {level1Solved} / 45
              </span>
              <span className="text-[10px] text-on-surface-variant">Foundation</span>
            </div>
            <div className="p-3 rounded-2xl bg-surface-container-low border border-outline-variant/20">
              <span className="font-label-xs text-[11px] text-on-surface-variant block uppercase font-medium">Level 2</span>
              <span className="font-label-lg text-label-lg text-primary font-bold block mt-0.5">
                {level2Solved} / 62
              </span>
              <span className="text-[10px] text-on-surface-variant">Core Interview</span>
            </div>
            <div className="p-3 rounded-2xl bg-surface-container-low border border-outline-variant/20">
              <span className="font-label-xs text-[11px] text-on-surface-variant block uppercase font-medium">Level 3</span>
              <span className="font-label-lg text-label-lg text-secondary font-bold block mt-0.5">
                {level3Solved} / 50
              </span>
              <span className="text-[10px] text-on-surface-variant">Advanced</span>
            </div>
          </div>
        </div>

        {/* Milestone Badges Grid (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl bg-surface-container-lowest p-6 sm:p-7 shadow-[0_12px_32px_-6px_rgba(216,140,166,0.18)] border border-outline-variant/30 space-y-4">
          <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
            <h3 className="font-headline-sm text-headline-sm text-primary flex items-center gap-2 font-bold">
              <Icon name="workspace_premium" className="w-5 h-5 text-secondary" />
              Sanctuary Milestones & Honors
            </h3>
            <span className="text-xs text-on-surface-variant">
              {milestones.filter(m => m.unlocked).length} / {milestones.length} Unlocked
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {milestones.map((m) => (
              <div
                key={m.title}
                className={`p-3.5 rounded-2xl flex flex-col justify-between transition-all min-h-[108px] ${
                  m.unlocked
                    ? 'bg-surface-container-low border border-secondary-container shadow-xs hover:border-primary/40'
                    : 'bg-surface-container-lowest border border-outline-variant/30 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon
                    name={m.icon}
                    className={`w-6 h-6 ${m.unlocked ? 'text-primary' : 'text-on-surface-variant'}`}
                  />
                  <span
                    className={`px-2 py-0.5 rounded-full font-label-sm text-[11px] ${
                      m.unlocked ? 'bg-tertiary-fixed text-tertiary font-bold' : 'bg-surface-container text-on-surface-variant'
                    }`}
                  >
                    {m.unlocked ? 'Bloomed' : 'Locked'}
                  </span>
                </div>
                <div>
                  <span className="font-label-md text-label-md text-on-surface font-semibold block leading-tight">
                    {m.title}
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant text-[11px] leading-tight block mt-0.5">
                    {m.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Topic Mastery Breakdown (Wide Multi-Column Grid) */}
      <div className="rounded-3xl bg-surface-container-lowest p-6 sm:p-7 shadow-[0_12px_32px_-6px_rgba(216,140,166,0.18)] border border-outline-variant/30 space-y-4">
        <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
          <h3 className="font-headline-sm text-headline-sm text-primary flex items-center gap-2 font-bold">
            <Icon name="category" className="w-5 h-5 text-secondary" />
            Topic & Data Structure Mastery
          </h3>
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            {topicStats.length} Core DSA Patterns
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
          {topicStats.map((item) => (
            <div key={item.topic} className="p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/20 space-y-2">
              <div className="flex items-center justify-between text-body-sm">
                <span className="font-label-md text-label-md text-on-surface font-semibold">
                  {item.topic}
                </span>
                <span className="font-label-sm text-label-sm text-secondary font-bold">
                  {item.completed} / {item.total} <span className="text-on-surface-variant font-normal">({item.pct}%)</span>
                </span>
              </div>
              <div className="w-full bg-surface-container rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-secondary h-full rounded-full transition-all duration-500"
                  style={{ width: `${item.pct}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
