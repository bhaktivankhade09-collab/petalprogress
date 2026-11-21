import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { PetalLogo } from '../components/PetalLogo';
import { Icon } from '../components/Icon';

export const WelcomeView = () => {
  const { signIn, signUp, resetPassword, loginAsDemo } = useAuth();

  // Mode: 'overview' | 'login' | 'signup' | 'forgot'
  const [authMode, setAuthMode] = useState('overview');

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Status states
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetMessages = () => {
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleSwitchMode = (mode) => {
    resetMessages();
    setAuthMode(mode);
    if (mode === 'login' && !email) {
      setEmail('elena.rostova@petalprogress.demo');
      setPassword('petal123');
    }
  };

  const handleQuickDemoAccess = () => {
    resetMessages();
    loginAsDemo();
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    resetMessages();

    if (!email.trim() || !password) {
      setErrorMessage('Please enter both your email and password.');
      return;
    }

    setIsSubmitting(true);
    const { error } = await signIn(email.trim(), password);
    setIsSubmitting(false);

    if (error) {
      setErrorMessage(error.message || 'Unable to sign in. Please try again.');
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    resetMessages();

    if (!email.trim() || !password) {
      setErrorMessage('Please provide an email and password.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please re-enter.');
      return;
    }

    setIsSubmitting(true);
    const { error } = await signUp(email.trim(), password, fullName.trim());
    setIsSubmitting(false);

    if (error) {
      setErrorMessage(error.message || 'Unable to create account. Please try again.');
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    resetMessages();

    if (!email.trim()) {
      setErrorMessage('Please enter your email address to receive password recovery instructions.');
      return;
    }

    setIsSubmitting(true);
    await resetPassword(email.trim());
    setIsSubmitting(false);
    setSuccessMessage('🌸 Password recovery link simulated! You can now log in directly.');
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between selection:bg-secondary-container selection:text-on-secondary-container">
      {/* Top Welcome Header */}
      <header className="w-full bg-surface/90 backdrop-blur-md pt-safe border-b border-outline-variant/30 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => handleSwitchMode('overview')}
            className="flex items-center gap-2.5 hover:opacity-90 transition-opacity"
          >
            <PetalLogo className="h-8 w-8 object-contain shrink-0" />
            <div className="flex flex-col text-left">
              <span className="font-headline-sm text-headline-sm text-primary leading-tight">Petal Progress</span>
              <span className="text-[11px] text-secondary font-medium tracking-wide">Interactive Demo Edition</span>
            </div>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleQuickDemoAccess}
              className="px-3.5 py-1.5 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-label-md font-semibold hover:bg-secondary-container/80 transition-all flex items-center gap-1 shadow-sm active:scale-95"
              title="Enter instantly as Elena Rostova"
            >
              <span>✨</span>
              <span>1-Click Demo</span>
            </button>
            {authMode !== 'login' && (
              <button
                onClick={() => handleSwitchMode('login')}
                className="px-4 py-1.5 rounded-full bg-surface-container text-primary font-label-md text-label-md hover:bg-surface-container-high transition-colors"
              >
                Log In
              </button>
            )}
            {authMode !== 'signup' && (
              <button
                onClick={() => handleSwitchMode('signup')}
                className="px-4 py-1.5 rounded-full bg-primary text-on-primary font-label-md text-label-md font-semibold shadow-sm hover:bg-primary-container active:scale-95 transition-all"
              >
                Sign Up
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 flex flex-col justify-center">
        {/* OVERVIEW / LANDING MODE */}
        {authMode === 'overview' && (
          <div className="flex flex-col items-center text-center space-y-6 max-w-2xl mx-auto py-4">
            {/* Soft Botanical Emblem */}
            <div className="w-20 h-20 rounded-full bg-surface-container-high flex items-center justify-center text-primary shadow-[0_8px_24px_rgba(216,140,166,0.25)] animate-petal">
              <Icon name="local_florist" className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 font-label-md text-label-md text-secondary uppercase tracking-widest font-semibold bg-surface-container px-3.5 py-1 rounded-full">
                <span>🌸</span>
                <span>Mindful Technical Productivity</span>
              </div>
              <h1 className="font-headline-xl text-headline-xl text-primary font-bold tracking-tight">
                Grow Your Skills in a Botanical Sanctuary
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed max-w-xl mx-auto">
                DSA interview preparation reimagined through calm aesthetics, structured algorithms, gentle focus timers, and personal reflection.
              </p>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 w-full text-left pt-2">
              <div className="p-4 rounded-2xl bg-surface-container-lowest shadow-[0_6px_20px_-4px_rgba(216,140,166,0.12)] space-y-1.5 border border-outline-variant/20 hover:border-primary/40 transition-all">
                <Icon name="account_tree" className="w-7 h-7 text-primary mb-1" />
                <h3 className="font-label-lg font-bold text-on-surface">Curated 157 DSA</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  45 Foundation, 62 Core Interview, and 50 Advanced problems. Interactive checkboxes, search, and notes.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-surface-container-lowest shadow-[0_6px_20px_-4px_rgba(216,140,166,0.12)] space-y-1.5 border border-outline-variant/20 hover:border-secondary/40 transition-all">
                <Icon name="hourglass_top" className="w-7 h-7 text-secondary mb-1" />
                <h3 className="font-label-lg font-bold text-on-surface">Focus Room</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Circular countdown timer, presets (25m to 60m), break reminders, and synthesized calm soundscapes.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-surface-container-lowest shadow-[0_6px_20px_-4px_rgba(216,140,166,0.12)] space-y-1.5 border border-outline-variant/20 hover:border-tertiary/40 transition-all">
                <Icon name="spa" className="w-7 h-7 text-tertiary mb-1" />
                <h3 className="font-label-lg font-bold text-on-surface">Motivation Garden</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Daily encouragement, personal reflection notes, and private greenhouse bookmarks.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 w-full sm:w-auto">
              <button
                onClick={handleQuickDemoAccess}
                className="w-full sm:w-auto min-h-[48px] px-8 rounded-full bg-primary text-on-primary font-label-lg font-semibold shadow-[0_6px_20px_rgba(108,54,75,0.30)] hover:bg-primary-container active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>✨ Launch Demo Sanctuary</span>
                <Icon name="arrow_forward" className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleSwitchMode('login')}
                className="w-full sm:w-auto min-h-[48px] px-8 rounded-full bg-surface-container-lowest text-primary border border-outline-variant/40 font-label-lg font-semibold hover:bg-surface-container transition-all flex items-center justify-center"
              >
                <span>Sign In With Account</span>
              </button>
            </div>

            <div className="text-xs text-on-surface-variant/80 pt-2 flex items-center justify-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>100% Client-Side Interactive Demo • Zero Setup Required</span>
            </div>
          </div>
        )}

        {/* SIGN IN FORM */}
        {authMode === 'login' && (
          <div className="w-full max-w-md mx-auto bg-surface-container-lowest rounded-3xl p-6 sm:p-8 shadow-[0_16px_40px_-8px_rgba(135,77,99,0.20)] border border-outline-variant/30 space-y-5 animate-petal">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-full bg-surface-container mx-auto flex items-center justify-center text-primary mb-2">
                <Icon name="lock_open" className="w-6 h-6" />
              </div>
              <h2 className="font-headline-sm text-headline-sm text-primary">Welcome Back</h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Sign in to resume tending your algorithms and garden
              </p>
            </div>

            {/* Quick Demo Fill Pill */}
            <div className="p-3 rounded-2xl bg-secondary-container/40 border border-secondary/20 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-on-secondary-container">
                <span>🌸</span>
                <span><strong>Demo Account:</strong> Elena Rostova</span>
              </div>
              <button
                type="button"
                onClick={handleQuickDemoAccess}
                className="font-bold text-primary hover:underline"
              >
                1-Click Login →
              </button>
            </div>

            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-error-container text-on-error-container text-body-sm flex items-start gap-2.5">
                <Icon name="error" className="w-5 h-5 text-error shrink-0 mt-0.5" />
                <span className="leading-snug">{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="p-3.5 rounded-xl bg-tertiary-fixed text-tertiary text-body-sm flex items-start gap-2.5">
                <Icon name="check_circle" className="w-5 h-5 shrink-0 mt-0.5" />
                <span className="leading-snug">{successMessage}</span>
              </div>
            )}

            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md border border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-label-sm text-label-sm text-on-surface-variant">Password</label>
                  <button
                    type="button"
                    onClick={() => handleSwitchMode('forgot')}
                    className="font-label-sm text-label-sm text-secondary hover:text-primary transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md border border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary flex items-center justify-center p-1"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    <Icon name={showPassword ? 'visibility_off' : 'visibility'} className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full min-h-[46px] rounded-full bg-primary text-on-primary font-label-lg font-semibold shadow-[0_4px_16px_rgba(108,54,75,0.30)] hover:bg-primary-container active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              >
                <span>Enter Sanctuary</span>
                <Icon name="arrow_forward" className="w-5 h-5" />
              </button>
            </form>

            <div className="text-center pt-2 border-t border-outline-variant/20 font-body-sm text-body-sm text-on-surface-variant flex items-center justify-between">
              <button
                onClick={() => handleSwitchMode('overview')}
                className="text-xs text-secondary hover:underline"
              >
                &larr; Back to Overview
              </button>
              <div>
                <span>New here? </span>
                <button
                  onClick={() => handleSwitchMode('signup')}
                  className="font-semibold text-primary hover:underline"
                >
                  Create Account
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SIGN UP FORM */}
        {authMode === 'signup' && (
          <div className="w-full max-w-md mx-auto bg-surface-container-lowest rounded-3xl p-6 sm:p-8 shadow-[0_16px_40px_-8px_rgba(135,77,99,0.20)] border border-outline-variant/30 space-y-5 animate-petal">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-full bg-surface-container mx-auto flex items-center justify-center text-primary mb-2">
                <Icon name="spa" className="w-6 h-6" />
              </div>
              <h2 className="font-headline-sm text-headline-sm text-primary">Plant Your Account</h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Create a fresh personal workspace to track your DSA journey
              </p>
            </div>

            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-error-container text-on-error-container text-body-sm flex items-start gap-2.5">
                <Icon name="error" className="w-5 h-5 text-error shrink-0 mt-0.5" />
                <span className="leading-snug">{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSignUp} className="space-y-3.5">
              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Maya Lin"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md border border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md border border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1">
                  Password (min. 6 characters)
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md border border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md border border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full min-h-[46px] rounded-full bg-primary text-on-primary font-label-lg font-semibold shadow-[0_4px_16px_rgba(108,54,75,0.30)] hover:bg-primary-container active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              >
                <span>Create Sanctuary & Enter</span>
                <Icon name="arrow_forward" className="w-5 h-5" />
              </button>
            </form>

            <div className="text-center pt-2 border-t border-outline-variant/20 font-body-sm text-body-sm text-on-surface-variant flex items-center justify-between">
              <button
                onClick={() => handleSwitchMode('overview')}
                className="text-xs text-secondary hover:underline"
              >
                &larr; Back to Overview
              </button>
              <div>
                <span>Already registered? </span>
                <button
                  onClick={() => handleSwitchMode('login')}
                  className="font-semibold text-primary hover:underline"
                >
                  Log In
                </button>
              </div>
            </div>
          </div>
        )}

        {/* FORGOT PASSWORD FORM */}
        {authMode === 'forgot' && (
          <div className="w-full max-w-md mx-auto bg-surface-container-lowest rounded-3xl p-6 sm:p-8 shadow-[0_16px_40px_-8px_rgba(135,77,99,0.20)] border border-outline-variant/30 space-y-5 animate-petal">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-full bg-surface-container mx-auto flex items-center justify-center text-secondary mb-2">
                <Icon name="restart_alt" className="w-6 h-6" />
              </div>
              <h2 className="font-headline-sm text-headline-sm text-primary">Password Recovery</h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Enter your account email to receive a recovery link
              </p>
            </div>

            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-error-container text-on-error-container text-body-sm flex items-start gap-2.5">
                <Icon name="error" className="w-5 h-5 text-error shrink-0 mt-0.5" />
                <span className="leading-snug">{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="p-3.5 rounded-xl bg-tertiary-fixed text-tertiary text-body-sm flex items-start gap-2.5">
                <Icon name="check_circle" className="w-5 h-5 shrink-0 mt-0.5" />
                <span className="leading-snug">{successMessage}</span>
              </div>
            )}

            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1">
                  Registered Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md border border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full min-h-[46px] rounded-full bg-primary text-on-primary font-label-lg font-semibold shadow-[0_4px_16px_rgba(108,54,75,0.30)] hover:bg-primary-container active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isSubmitting ? 'Simulating Recovery...' : 'Send Recovery Link'}
              </button>
            </form>

            <div className="text-center pt-2 border-t border-outline-variant/20 font-body-sm text-body-sm text-on-surface-variant">
              <button
                onClick={() => handleSwitchMode('login')}
                className="font-semibold text-secondary hover:text-primary transition-colors flex items-center justify-center gap-1 mx-auto"
              >
                <Icon name="arrow_back" className="w-4 h-4" />
                <span>Back to Log In</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-outline-variant/20 py-4 text-center font-body-sm text-body-sm text-on-surface-variant pb-safe flex flex-col sm:flex-row items-center justify-center gap-2 px-4">
        <span>Petal Progress &copy; 2026 • Crafted with botanical care</span>
        <span className="hidden sm:inline">•</span>
        <span className="text-xs text-secondary font-medium">Frontend Demo Showcase Edition</span>
      </footer>
    </div>
  );
};
