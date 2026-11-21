import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { GARDEN_CATEGORIES } from '../data/quotesData';
import { Icon } from '../components/Icon';

export const MotivationGardenView = () => {
  const { quotes, toggleQuoteFavorite, plantedPetals, plantPetal, userProfile } = useApp();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [featuredQuoteIndex, setFeaturedQuoteIndex] = useState(0);
  const [newNote, setNewNote] = useState('');
  const [plantedToast, setPlantedToast] = useState(false);
  const [copiedQuoteId, setCopiedQuoteId] = useState(null);

  // Filtered quotes based on category
  const filteredQuotes = useMemo(() => {
    if (selectedCategory === 'All') return quotes;
    return quotes.filter((q) => q.category === selectedCategory);
  }, [quotes, selectedCategory]);

  const featuredQuote = quotes[featuredQuoteIndex % quotes.length] || quotes[0];
  const savedFavoritesCount = quotes.filter((q) => q.isFavorite).length;

  const handleShuffleQuote = () => {
    setFeaturedQuoteIndex((prev) => (prev + 1) % quotes.length);
  };

  const handlePlantSubmit = (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    plantPetal(newNote.trim());
    setNewNote('');
    setPlantedToast(true);
    setTimeout(() => setPlantedToast(false), 2500);
  };

  const handleCopyQuote = (quote) => {
    navigator.clipboard?.writeText(`"${quote.text}" — ${quote.author}`);
    setCopiedQuoteId(quote.id);
    setTimeout(() => setCopiedQuoteId(null), 2000);
  };

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-16">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-1">
        <div>
          <div className="flex items-center gap-1.5 text-secondary">
            <Icon name="local_florist" className="w-4 h-4 text-secondary" />
            <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
              Mindful Sanctuary
            </span>
          </div>
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-primary font-bold mt-1">
            Motivation Garden
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
            Water your mindset with encouraging algorithmic wisdom & personal reflection petals
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-surface-container-high px-4 py-2 rounded-full text-secondary border border-outline-variant/30 font-semibold text-sm">
            <span>🌸</span>
            <span>{savedFavoritesCount} Saved in Greenhouse</span>
          </div>
        </div>
      </div>

      {/* Top 2-Column Desktop Hero Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Featured Quote Hero Card */}
        <div className="lg:col-span-7">
          <div className="relative overflow-hidden rounded-3xl bg-surface-container-lowest p-6 sm:p-8 shadow-[0_12px_32px_-6px_rgba(216,140,166,0.22)] border border-outline-variant/20 h-full flex flex-col justify-between">
            <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-gradient-to-br from-surface-container-high via-secondary-container/40 to-transparent blur-2xl pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none opacity-20 flex items-end justify-end p-2">
              <svg viewBox="0 0 100 100" className="w-28 h-28 text-primary">
                <path d="M50 10 C60 30 75 40 95 50 C75 60 60 70 50 90 C40 70 25 60 5 50 C25 40 40 30 50 10 Z" fill="#d88ca6" opacity="0.6" />
                <circle cx="50" cy="50" r="16" fill="#ffd9e4" />
                <circle cx="50" cy="50" r="8" fill="#874d63" />
              </svg>
            </div>

            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-secondary font-label-sm text-xs font-semibold">
                  <Icon name="spa" className="w-3.5 h-3.5 text-secondary" />
                  <span>{featuredQuote.tag || 'Seed of the Day'}</span>
                </span>
                <span className="font-label-sm text-xs text-on-surface-variant font-medium">
                  Daily Bloom #{featuredQuoteIndex + 1}
                </span>
              </div>

              <blockquote className="my-2 font-headline-sm text-xl md:text-2xl text-primary font-semibold leading-relaxed">
                “{featuredQuote.text}”
              </blockquote>

              <div className="flex items-center gap-2 pt-1 text-on-surface-variant">
                <Icon name="local_florist" className="w-4 h-4 text-secondary" />
                <span className="font-label-md text-sm font-semibold text-secondary">
                  {featuredQuote.author} • {featuredQuote.subtext}
                </span>
              </div>

              {/* Action Buttons Row */}
              <div className="flex items-center justify-between pt-4 border-t border-outline-variant/20 mt-2">
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => toggleQuoteFavorite(featuredQuote.id)}
                    className={`min-h-[44px] px-5 py-2 rounded-full font-label-md text-sm font-semibold flex items-center gap-2 active:scale-95 transition-all shadow-sm ${
                      featuredQuote.isFavorite
                        ? 'bg-secondary-container text-on-secondary-container'
                        : 'bg-surface-container text-on-surface-variant hover:text-primary hover:bg-surface-container-high'
                    }`}
                  >
                    <span>{featuredQuote.isFavorite ? '❤️' : '🤍'}</span>
                    <span>{featuredQuote.isFavorite ? 'Saved in Greenhouse' : 'Bookmark to Greenhouse'}</span>
                  </button>

                  <button
                    onClick={() => handleCopyQuote(featuredQuote)}
                    title="Copy Quote"
                    className="min-h-[44px] min-w-[44px] p-2 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center active:scale-95 hover:bg-surface-container-high transition-colors"
                  >
                    <span>{copiedQuoteId === featuredQuote.id ? '✓' : '📋'}</span>
                  </button>
                </div>

                <button
                  onClick={handleShuffleQuote}
                  className="min-h-[44px] px-4 py-2 rounded-full bg-surface-container-low text-secondary font-label-md text-sm font-semibold flex items-center gap-1.5 hover:bg-surface-container transition-colors active:scale-95"
                >
                  <Icon name="restart_alt" className="w-4 h-4" />
                  <span>Next Seed</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Plant Your Reflection Petal Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-3xl bg-surface-container p-6 shadow-[0_8px_24px_-4px_rgba(216,140,166,0.16)] border border-outline-variant/20 flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0 shadow-xs">
                <Icon name="local_florist" className="w-5 h-5 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="font-label-lg text-base text-primary font-bold">Plant Your Reflection</span>
                <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
                  What algorithmic breakthrough or mindset shifted during your last study session?
                </p>
              </div>
            </div>

            <form onSubmit={handlePlantSubmit} className="flex flex-col gap-3">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="e.g. Mastered Monotonic Stack for Daily Temperatures! Consistency is blooming..."
                rows={3}
                className="w-full rounded-2xl bg-surface-container-lowest p-3.5 font-body-md text-sm text-on-surface placeholder:text-outline outline-none shadow-inner resize-none focus:ring-2 focus:ring-secondary/40 transition-all border border-outline-variant/30"
              />

              <div className="flex items-center justify-between">
                <span className="text-xs text-secondary font-medium flex items-center gap-1">
                  <span>🔒</span>
                  <span>Saved locally to your Sanctuary</span>
                </span>

                <button
                  type="submit"
                  className="min-h-[42px] px-5 py-2 rounded-full bg-primary text-on-primary font-label-md text-sm font-semibold shadow-sm active:scale-95 transition-all flex items-center gap-1.5 hover:bg-primary-container"
                >
                  <span>Plant Petal</span>
                  <Icon name="arrow_forward" className="w-4 h-4" />
                </button>
              </div>
            </form>

            {plantedToast && (
              <div className="p-3 rounded-2xl bg-tertiary-fixed text-tertiary text-center font-label-md text-sm font-semibold animate-petal shadow-xs">
                🌸 Petal planted in your Garden Greenhouse!
              </div>
            )}
          </div>

          {/* Greenhouse Stats Pill */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/20 shadow-xs">
              <span className="text-xs text-on-surface-variant font-medium block">Daily Streak</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-bold text-primary">{userProfile.streakDays}</span>
                <span className="text-xs text-secondary font-semibold">days active</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/20 shadow-xs">
              <span className="text-xs text-on-surface-variant font-medium block">Greenhouse Blooms</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-bold text-primary">
                  {savedFavoritesCount + plantedPetals.length}
                </span>
                <span className="text-xs text-secondary font-semibold">petals collected</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <span className="font-label-lg text-lg text-primary font-bold">Explore Garden Paths</span>
          <span className="font-label-sm text-sm text-on-surface-variant font-medium">
            {filteredQuotes.length} Wisdom Petals
          </span>
        </div>

        <div className="flex gap-2.5 overflow-x-auto pb-2 no-scrollbar">
          {GARDEN_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-full font-label-md text-sm transition-all flex items-center gap-1.5 font-semibold ${
                selectedCategory === cat
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container-lowest text-on-surface-variant hover:text-primary border border-outline-variant/30'
              }`}
            >
              <span>{cat}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Motivational Quote Feed (3-Column Desktop Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQuotes.map((quote) => (
          <div
            key={quote.id}
            className="rounded-3xl bg-surface-container-lowest p-6 shadow-[0_6px_20px_-4px_rgba(216,140,166,0.14)] border border-outline-variant/20 flex flex-col justify-between gap-4 transition-all hover:shadow-md hover:border-primary/30"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-surface-container-high text-primary font-label-sm text-xs font-semibold">
                  {quote.tag}
                </span>
                <button
                  onClick={() => toggleQuoteFavorite(quote.id)}
                  aria-label="Save Quote"
                  className="p-1 text-base transition-transform active:scale-90"
                >
                  <span>{quote.isFavorite ? '❤️' : '🤍'}</span>
                </button>
              </div>

              <p className="font-body-lg text-base text-on-surface leading-relaxed font-medium">
                “{quote.text}”
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-outline-variant/20 text-xs">
              <span className="text-on-surface-variant font-medium">{quote.author}</span>
              <button
                onClick={() => handleCopyQuote(quote)}
                className="text-secondary font-semibold hover:text-primary transition-colors"
              >
                {copiedQuoteId === quote.id ? 'Copied! ✓' : 'Share 📋'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* User Planted Petals Section (3-Column Desktop Grid) */}
      {plantedPetals.length > 0 && (
        <section className="space-y-4 pt-4 border-t border-outline-variant/20">
          <div className="flex items-center justify-between">
            <h2 className="font-headline-sm text-xl text-primary font-bold flex items-center gap-2">
              <span>🌸</span>
              <span>Your Planted Reflections ({plantedPetals.length})</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {plantedPetals.map((p) => (
              <div
                key={p.id}
                className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/20 shadow-xs flex flex-col justify-between gap-3"
              >
                <p className="font-body-md text-sm text-on-surface italic leading-relaxed">
                  {p.text}
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-outline-variant/15 text-xs">
                  <span className="text-secondary font-semibold">{p.flower || 'Sanctuary Flower'}</span>
                  <span className="text-on-surface-variant">{p.createdAt}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
