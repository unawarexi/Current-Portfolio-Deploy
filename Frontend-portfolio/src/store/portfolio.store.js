// ============================================================================
// PORTFOLIO STORE — Zustand replacement for PortfolioContext
// Tracks the currently selected project (for detail/single-project views)
// ============================================================================

import { create } from 'zustand';

const SESSION_KEY = 'selectedProject';

const getStored = () => {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const usePortfolioStore = create((set) => ({
  selectedProject: getStored(),

  setSelectedProject: (project) => {
    if (project) {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(project));
    } else {
      sessionStorage.removeItem(SESSION_KEY);
    }
    set({ selectedProject: project });
  },

  clearSelectedProject: () => {
    sessionStorage.removeItem(SESSION_KEY);
    set({ selectedProject: null });
  },
}));

export { usePortfolioStore };
export default usePortfolioStore;
