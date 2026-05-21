// ============================================================================
// ABOUT USE-CASE — read-only profile data for landing sections
// ============================================================================
import { useEffect } from 'react';
import { useAbout } from '@hooks/api-hooks/useAbout';
import { useAboutStore } from '@store/about.store';

// Static fallback copy (shown before API responds)
const STATIC = {
  bio: "I'm a passionate software developer with experience creating dynamic and responsive web applications.",
  vision: 'Transforming the digital landscape by building applications that solve real problems and enhance user experiences.',
  philosophy: 'Passionate and dedicated — focused on delivering exceptional, scalable products built to last.',
  headline: 'Full-Stack Developer',
};

/**
 * Provides merged profile data (API > cached store > static fallback)
 * for read-only about sections (AboutSection, AboutDetail).
 * Syncs API response into the Zustand store as a side-effect.
 */
export const useAboutSectionUsecase = () => {
  const { data: apiProfile } = useAbout();
  const { profile: cachedProfile, setProfile } = useAboutStore();

  // Keep store in sync with latest API data
  useEffect(() => {
    if (apiProfile) setProfile(apiProfile);
  }, [apiProfile, setProfile]);

  const profile = apiProfile ?? cachedProfile ?? {};

  const bio        = profile.bio        || STATIC.bio;
  const vision     = profile.vision     || STATIC.vision;
  const philosophy = profile.philosophy || STATIC.philosophy;
  const history    = profile.history    || '';
  const mission    = profile.mission    || '';
  const goals      = profile.goals      || [];
  const values     = profile.values     || [];
  const funFacts   = profile.funFacts   || [];
  const hobbies    = profile.hobbies    || [];
  const education  = profile.education  || [];
  const certifications = profile.certifications || [];
  const languages  = profile.languages  || [];
  const currentFocus = profile.currentFocus || '';

  const stats = [
    { value: `${profile.yearsOfExperience || 4}+`, label: 'Years' },
    { value: `${profile.projectsCount || 50}+`,    label: 'Projects' },
    { value: `${profile.rating || 4.9}`,            label: 'Rating' },
    { value: `${profile.clientsCount || 20}+`,      label: 'Clients' },
  ];

  return {
    profile,
    bio, vision, philosophy, history, mission, goals, values,
    funFacts, hobbies, education, certifications, languages,
    currentFocus, stats,
  };
};
