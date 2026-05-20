// ============================================================================
// ABOUT FORM USE-CASE — admin form to edit the portfolio profile
// ============================================================================
import { useState, useEffect } from 'react';
import { useAbout, useUpsertAbout, useUploadCv } from '@hooks/api-hooks/useAbout';
import { useAboutStore } from '@store/about.store';

const INITIAL = {
  name: '', headline: '', tagline: '', bio: '', history: '',
  vision: '', mission: '', philosophy: '',
  goals: '', currentFocus: '',
  values: '', funFacts: '', hobbies: '',
  education: '', certifications: '', languages: '',
  openToWork: true, availabilityNote: '',
  yearsOfExperience: '', projectsCount: '', clientsCount: '', rating: '5.0',
  socials: { github: '', linkedin: '', twitter: '', instagram: '', website: '' },
};

const splitLines = (str) => (str || '').split('\n').map((s) => s.trim()).filter(Boolean);
const joinLines  = (arr) => (arr || []).join('\n');

export const useAboutFormUsecase = () => {
  const { data: profile } = useAbout();
  const { setProfile }    = useAboutStore();
  const upsertMut         = useUpsertAbout();
  const cvMut             = useUploadCv();
  const [form, setFormState] = useState(INITIAL);
  const [cvFile, setCvFile]  = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [activeTab, setActiveTab]   = useState('identity');

  // Hydrate form when API data loads
  useEffect(() => {
    if (profile && profile.bio) {
      setFormState({
        ...INITIAL,
        ...profile,
        goals:          joinLines(profile.goals),
        values:         joinLines(profile.values),
        funFacts:       joinLines(profile.funFacts),
        hobbies:        joinLines(profile.hobbies),
        education:      typeof profile.education === 'string' ? profile.education : JSON.stringify(profile.education || []),
        certifications: typeof profile.certifications === 'string' ? profile.certifications : JSON.stringify(profile.certifications || []),
        languages:      typeof profile.languages === 'string' ? profile.languages : JSON.stringify(profile.languages || []),
        socials:        profile.socials || INITIAL.socials,
      });
    }
  }, [profile]);

  const setField = (name, value) => {
    setFormState((p) => ({ ...p, [name]: value }));
    if (formErrors[name]) setFormErrors((e) => { const n = { ...e }; delete n[name]; return n; });
  };

  const setSocialField = (key, value) => {
    setFormState((p) => ({ ...p, socials: { ...p.socials, [key]: value } }));
  };

  const validate = () => {
    const errs = {};
    if (!form.bio || form.bio.length < 10) errs.bio = 'Bio must be at least 10 characters';
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;
    const payload = {
      ...form,
      goals:   splitLines(form.goals),
      values:  splitLines(form.values),
      funFacts: splitLines(form.funFacts),
      hobbies: splitLines(form.hobbies),
    };
    // Try to parse structured JSON fields, fall back to arrays of strings
    try { payload.education      = JSON.parse(form.education); } catch { payload.education = splitLines(form.education); }
    try { payload.certifications = JSON.parse(form.certifications); } catch { payload.certifications = splitLines(form.certifications); }
    try { payload.languages      = JSON.parse(form.languages); } catch { payload.languages = splitLines(form.languages); }

    const result = await upsertMut.mutateAsync(payload);
    setProfile(payload);
    return result;
  };

  const submitCv = async () => {
    if (!cvFile) return;
    const fd = new FormData();
    fd.append('cv', cvFile);
    await cvMut.mutateAsync(fd);
    setCvFile(null);
  };

  return {
    form, setField, setSocialField, formErrors, cvFile, setCvFile,
    submit, submitCv, activeTab, setActiveTab,
    isPending: upsertMut.isPending,
    isCvPending: cvMut.isPending,
    reset: () => { setFormState(INITIAL); setFormErrors({}); },
  };
};
