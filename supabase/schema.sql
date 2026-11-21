-- =====================================================================================
-- PETAL PROGRESS — DATABASE SCHEMA & ROW LEVEL SECURITY (RLS) POLICIES
-- Target: Supabase PostgreSQL
-- =====================================================================================

-- 1. PROFILES TABLE (Linked to Supabase Auth users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT DEFAULT 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVxEdwJ1F2yOOSNlL7z4MsffqvfzaGG9BIh0DylgtZ_1SmFNHj_AJ9-ztPVthP4HStlx5xnPiFhValvmyDmU8wICiFxRk-RcGxavVV7hEq3DiVY402MADLu5CqPukxKMvGgUMlYn-tyCTWvg7YfN6QaD9WfOMd5U6R_mb-_xAa55T2HeU84dmVgOuDcdwLHiT6LY3mL5_hwppfeeY2Z3IljeCFgoTMQ5nVs5zieBs',
  daily_problem_target INTEGER DEFAULT 3,
  focus_goal_hours INTEGER DEFAULT 6,
  soundscape TEXT DEFAULT 'Gentle Rain & Soft Piano ♫',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. USER PROBLEM COMPLETIONS (Tracks which of the 157 DSA problems the user has bloomed)
CREATE TABLE IF NOT EXISTS public.user_problem_completions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  problem_id TEXT NOT NULL, -- e.g. "l1-1", "l2-31"
  notes TEXT,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_user_problem UNIQUE (user_id, problem_id)
);

CREATE INDEX IF NOT EXISTS idx_completions_user ON public.user_problem_completions(user_id);
CREATE INDEX IF NOT EXISTS idx_completions_user_problem ON public.user_problem_completions(user_id, problem_id);

-- 3. TASKS TABLE (Personal flower bed study tasks)
CREATE TABLE IF NOT EXISTS public.tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  priority TEXT DEFAULT 'Medium', -- 'High', 'Medium', 'Low'
  duration TEXT DEFAULT '30 mins',
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tasks_user ON public.tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_tasks_created ON public.tasks(user_id, created_at DESC);

-- 4. FOCUS SESSIONS (Focus Room sanctuary time logs)
CREATE TABLE IF NOT EXISTS public.focus_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  duration_minutes INTEGER NOT NULL,
  session_label TEXT DEFAULT 'Deep Work Session',
  color TEXT DEFAULT 'primary',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_focus_user ON public.focus_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_focus_created ON public.focus_sessions(user_id, created_at DESC);

-- 5. PLANTED PETALS (User's private reflection notes in Motivation Garden)
CREATE TABLE IF NOT EXISTS public.planted_petals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_petals_user ON public.planted_petals(user_id);

-- 6. QUOTE FAVORITES (Saved quotes in Motivation Garden)
CREATE TABLE IF NOT EXISTS public.quote_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  quote_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_user_quote UNIQUE (user_id, quote_id)
);

CREATE INDEX IF NOT EXISTS idx_quote_favorites_user ON public.quote_favorites(user_id);

-- =====================================================================================
-- TRIGGER: AUTOMATIC PROFILE CREATION UPON SIGNUP
-- =====================================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVxEdwJ1F2yOOSNlL7z4MsffqvfzaGG9BIh0DylgtZ_1SmFNHj_AJ9-ztPVthP4HStlx5xnPiFhValvmyDmU8wICiFxRk-RcGxavVV7hEq3DiVY402MADLu5CqPukxKMvGgUMlYn-tyCTWvg7YfN6QaD9WfOMd5U6R_mb-_xAa55T2HeU84dmVgOuDcdwLHiT6LY3mL5_hwppfeeY2Z3IljeCFgoTMQ5nVs5zieBs')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if already exists and re-create
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =====================================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES — STRICT ISOLATION BY auth.uid()
-- =====================================================================================

-- Profiles RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- User Problem Completions RLS
ALTER TABLE public.user_problem_completions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own problem completions"
  ON public.user_problem_completions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own problem completions"
  ON public.user_problem_completions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own problem completions"
  ON public.user_problem_completions FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own problem completions"
  ON public.user_problem_completions FOR DELETE
  USING (auth.uid() = user_id);

-- Tasks RLS
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own tasks"
  ON public.tasks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tasks"
  ON public.tasks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tasks"
  ON public.tasks FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own tasks"
  ON public.tasks FOR DELETE
  USING (auth.uid() = user_id);

-- Focus Sessions RLS
ALTER TABLE public.focus_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own focus sessions"
  ON public.focus_sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own focus sessions"
  ON public.focus_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own focus sessions"
  ON public.focus_sessions FOR DELETE
  USING (auth.uid() = user_id);

-- Planted Petals RLS
ALTER TABLE public.planted_petals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own planted petals"
  ON public.planted_petals FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own planted petals"
  ON public.planted_petals FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own planted petals"
  ON public.planted_petals FOR DELETE
  USING (auth.uid() = user_id);

-- Quote Favorites RLS
ALTER TABLE public.quote_favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own quote favorites"
  ON public.quote_favorites FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own quote favorites"
  ON public.quote_favorites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own quote favorites"
  ON public.quote_favorites FOR DELETE
  USING (auth.uid() = user_id);
