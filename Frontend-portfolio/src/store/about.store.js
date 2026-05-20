import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAboutStore = create(
  persist(
    (set) => ({
      profile: null,
      setProfile: (profile) => set({ profile }),
    }),
    { name: 'about-profile', partialize: (s) => ({ profile: s.profile }) }
  )
);

export { useAboutStore };
export default useAboutStore;
