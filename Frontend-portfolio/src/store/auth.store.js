// ============================================================================
// AUTH STORE - Simple localStorage-based admin session for portfolio
// No user registration — one seeded admin from Firebase backend
// ============================================================================

import { create } from 'zustand';

const AUTH_KEY = 'portfolio_auth';
const SESSION_DURATION = 60 * 60 * 1000; // 1 hour

const getStoredAuth = () => {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (Date.now() > data.expiresAt) {
      localStorage.removeItem(AUTH_KEY);
      return null;
    }
    return data;
  } catch {
    return null;
  }
};

const useAuthStore = create((set) => ({
  isAuthenticated: !!getStoredAuth(),
  admin: getStoredAuth()?.admin ?? null,
  isInitialized: true, // no async boot required for localStorage auth

  login: (adminData) => {
    const session = {
      admin: adminData,
      expiresAt: Date.now() + SESSION_DURATION,
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(session));
    set({ isAuthenticated: true, admin: adminData });
  },

  logout: () => {
    localStorage.removeItem(AUTH_KEY);
    set({ isAuthenticated: false, admin: null });
  },

  checkSession: () => {
    const stored = getStoredAuth();
    if (!stored) {
      set({ isAuthenticated: false, admin: null });
      return false;
    }
    set({ isAuthenticated: true, admin: stored.admin });
    return true;
  },
}));

export { useAuthStore };
export default useAuthStore;
