// ============================================================================
// THEME STORE - Zustand store for light/dark/system theme management
// ============================================================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ========================
// HELPERS
// ========================
const getSystemPreference = () => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return false;
};

const applyTheme = (isDark) => {
  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    isDark ? root.classList.add('dark') : root.classList.remove('dark');
  }
};

// ========================
// STORE
// ========================
const useThemeStore = create(
  persist(
    (set, get) => ({
      mode: 'system', // 'light' | 'dark' | 'system'
      isDarkMode: false,

      setMode: (mode) => {
        let isDark = false;
        if (mode === 'dark') {
          isDark = true;
        } else if (mode === 'light') {
          isDark = false;
        } else {
          isDark = getSystemPreference();
        }
        applyTheme(isDark);
        set({ mode, isDarkMode: isDark });
      },

      toggleDarkMode: () => {
        const { isDarkMode } = get();
        const newIsDark = !isDarkMode;
        const newMode = newIsDark ? 'dark' : 'light';
        applyTheme(newIsDark);
        set({ isDarkMode: newIsDark, mode: newMode });
      },

      initializeTheme: () => {
        const { mode } = get();
        let isDark = false;
        if (mode === 'dark') {
          isDark = true;
        } else if (mode === 'light') {
          isDark = false;
        } else {
          isDark = getSystemPreference();
        }
        applyTheme(isDark);
        set({ isDarkMode: isDark });
      },
    }),
    {
      name: 'portfolio-theme',
      partialize: (state) => ({ mode: state.mode }),
    }
  )
);

export default useThemeStore;
