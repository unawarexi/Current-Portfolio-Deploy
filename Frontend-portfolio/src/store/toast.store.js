// ============================================================================
// TOAST STORE - Zustand store for global toast notifications
// ============================================================================

import { create } from 'zustand';

let toastIdCounter = 0;

const useToastStore = create((set) => ({
  toasts: [],

  // Add a toast — returns the id
  addToast: ({ message, type = 'info', duration = 4000 }) => {
    const id = String(++toastIdCounter);
    set((state) => ({ toasts: [...state.toasts, { id, message, type, duration }] }));
    return id;
  },

  dismissToast: (id) => {
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
  },

  clearAll: () => set({ toasts: [] }),
}));

// ========================
// CONVENIENCE HELPERS
// ========================
export const toast = {
  success: (message, duration) =>
    useToastStore.getState().addToast({ message, type: 'success', duration }),
  error: (message, duration) =>
    useToastStore.getState().addToast({ message, type: 'error', duration }),
  warning: (message, duration) =>
    useToastStore.getState().addToast({ message, type: 'warning', duration }),
  info: (message, duration) =>
    useToastStore.getState().addToast({ message, type: 'info', duration }),
};

export { useToastStore };
export default useToastStore;
