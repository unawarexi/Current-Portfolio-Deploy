// ============================================================================
// UI STORE — Zustand store for portfolio UI state
// ============================================================================

import { create } from 'zustand';

const useUIStore = create((set) => ({
  // ── Modal ────────────────────────────────────────────────────────────────
  modal: {
    isOpen: false,
    type: null,   // e.g. 'confirm-delete', 'preview-image'
    data: null,
  },

  openModal: (type, data = null) =>
    set({ modal: { isOpen: true, type, data } }),

  closeModal: () =>
    set({ modal: { isOpen: false, type: null, data: null } }),

  // ── Global loading overlay ───────────────────────────────────────────────
  globalLoading: false,
  loadingMessage: null,

  setGlobalLoading: (loading, message = null) =>
    set({ globalLoading: loading, loadingMessage: message }),
}));

export { useUIStore };
export default useUIStore;

