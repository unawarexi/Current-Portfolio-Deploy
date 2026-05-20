import { create } from 'zustand';

const useExperienceStore = create((set) => ({
  selectedExperience: null,
  setSelectedExperience: (exp) => set({ selectedExperience: exp }),
  clearSelectedExperience: () => set({ selectedExperience: null }),
}));

export { useExperienceStore };
export default useExperienceStore;
