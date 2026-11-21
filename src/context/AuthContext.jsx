import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_DEMO_USER, DEFAULT_DEMO_PROFILE } from '../data/demoData';

const AuthContext = createContext();

const STORAGE_KEY_USER = 'petal_demo_active_user';
const STORAGE_KEY_PROFILE = 'petal_demo_active_profile';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize from localStorage or default to Elena demo user on first run
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(STORAGE_KEY_USER);
      const storedProfile = localStorage.getItem(STORAGE_KEY_PROFILE);

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        const parsedProfile = storedProfile ? JSON.parse(storedProfile) : DEFAULT_DEMO_PROFILE;
        setUser(parsedUser);
        setSession({ user: parsedUser, access_token: 'demo-local-token' });
        setProfile(parsedProfile);
      } else {
        // First visit default: start directly with Elena Rostova's rich demo account
        setUser(DEFAULT_DEMO_USER);
        setSession({ user: DEFAULT_DEMO_USER, access_token: 'demo-local-token' });
        setProfile(DEFAULT_DEMO_PROFILE);
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(DEFAULT_DEMO_USER));
        localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(DEFAULT_DEMO_PROFILE));
      }
    } catch (err) {
      console.warn('LocalStorage initialization notice:', err);
      setUser(DEFAULT_DEMO_USER);
      setProfile(DEFAULT_DEMO_PROFILE);
    } finally {
      setLoading(false);
    }
  }, []);

  // 1-Click Instant Demo Login (Elena Rostova)
  const loginAsDemo = () => {
    setUser(DEFAULT_DEMO_USER);
    setSession({ user: DEFAULT_DEMO_USER, access_token: 'demo-local-token' });
    setProfile(DEFAULT_DEMO_PROFILE);
    try {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(DEFAULT_DEMO_USER));
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(DEFAULT_DEMO_PROFILE));
    } catch (e) {
      console.error(e);
    }
    return { data: { user: DEFAULT_DEMO_USER }, error: null };
  };

  // Sign In with any email/password
  const signIn = async (email, password) => {
    if (!email || !password) {
      return { data: null, error: { message: 'Please enter both email and password.' } };
    }

    const cleanEmail = email.trim().toLowerCase();
    const isElena = cleanEmail.includes('elena') || cleanEmail.includes('demo');

    const signedUser = {
      id: isElena ? DEFAULT_DEMO_USER.id : `user-${Date.now()}`,
      email: cleanEmail,
      user_metadata: {
        full_name: isElena
          ? DEFAULT_DEMO_USER.user_metadata.full_name
          : cleanEmail.split('@')[0].replace('.', ' ').replace(/^./, (c) => c.toUpperCase()),
      },
    };

    const signedProfile = isElena
      ? DEFAULT_DEMO_PROFILE
      : {
          id: signedUser.id,
          email: cleanEmail,
          full_name: signedUser.user_metadata.full_name,
          avatar_url: '',
          daily_problem_target: 3,
          focus_goal_hours: 4,
          soundscape: 'Gentle Rain & Soft Piano ♫',
        };

    setUser(signedUser);
    setSession({ user: signedUser, access_token: 'demo-token' });
    setProfile(signedProfile);

    try {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(signedUser));
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(signedProfile));
    } catch (e) {
      console.error(e);
    }

    return { data: { user: signedUser }, error: null };
  };

  // Sign Up for a new custom account
  const signUp = async (email, password, fullName) => {
    if (!email || !password) {
      return { data: null, error: { message: 'Please provide both an email and password.' } };
    }

    const cleanEmail = email.trim().toLowerCase();
    const displayName = fullName?.trim() || cleanEmail.split('@')[0];

    const newUser = {
      id: `user-${Date.now()}`,
      email: cleanEmail,
      user_metadata: {
        full_name: displayName,
      },
    };

    const newProfile = {
      id: newUser.id,
      email: cleanEmail,
      full_name: displayName,
      avatar_url: '',
      daily_problem_target: 3,
      focus_goal_hours: 4,
      soundscape: 'Gentle Rain & Soft Piano ♫',
    };

    setUser(newUser);
    setSession({ user: newUser, access_token: 'demo-token' });
    setProfile(newProfile);

    try {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(newUser));
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(newProfile));
    } catch (e) {
      console.error(e);
    }

    return { data: { user: newUser, session: { access_token: 'demo-token' } }, error: null };
  };

  // Sign Out cleanly back to WelcomeView
  const signOut = async () => {
    setUser(null);
    setSession(null);
    setProfile(null);
    try {
      localStorage.removeItem(STORAGE_KEY_USER);
      localStorage.removeItem(STORAGE_KEY_PROFILE);
    } catch (e) {
      console.error(e);
    }
  };

  // Simulated Password Recovery
  const resetPassword = async (email) => {
    if (!email) {
      return { error: { message: 'Please enter your email address.' } };
    }
    // Simulate instant success
    return { error: null };
  };

  // Profile update (name, target problems, focus goals, soundscape)
  const updateProfile = async (updates) => {
    setProfile((prev) => {
      const merged = { ...prev, ...updates };
      try {
        localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(merged));
      } catch (e) {
        console.error(e);
      }
      return merged;
    });

    if (updates.full_name) {
      setUser((prev) => {
        if (!prev) return prev;
        const updatedUser = {
          ...prev,
          user_metadata: {
            ...prev.user_metadata,
            full_name: updates.full_name,
          },
        };
        try {
          localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(updatedUser));
        } catch (e) {
          console.error(e);
        }
        return updatedUser;
      });
    }

    return { error: null };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        loading,
        signIn,
        signUp,
        signOut,
        resetPassword,
        loginAsDemo,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
