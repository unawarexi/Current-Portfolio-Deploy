// ============================================================================
// ABOUT FORM USE-CASE — FIXED VERSION
// ============================================================================
import { useState, useEffect } from "react";
import {
  useAbout,
  useUpsertAbout,
  useUploadCv,
} from "@hooks/api-hooks/useAbout";
import { useAboutStore } from "@store/about.store";

const INITIAL = {
  name: "",
  headline: "",
  tagline: "",
  bio: "",
  history: "",
  vision: "",
  mission: "",
  philosophy: "",
  goals: "",
  currentFocus: "",
  values: "",
  funFacts: "",
  hobbies: "",
  education: "",
  certifications: "",
  languages: "",
  openToWork: true,
  availabilityNote: "",
  yearsOfExperience: "",
  projectsCount: "",
  clientsCount: "",
  rating: "5.0",
  socials: {
    github: "",
    linkedin: "",
    twitter: "",
    instagram: "",
    website: "",
  },
};

const splitLines = (str) =>
  (str || "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
const joinLines = (arr) => (arr || []).join("\n");

//  NEW: Safe JSON parsing utility
const tryParseJson = (str, fallback = null) => {
  if (!str) return fallback;
  try {
    const parsed = JSON.parse(str);
    return parsed;
  } catch (e) {
    console.warn("Failed to parse JSON:", str, e);
    return fallback;
  }
};

export const useAboutFormUsecase = () => {
  const { data: profile } = useAbout();
  const { setProfile } = useAboutStore();
  const upsertMut = useUpsertAbout();
  const cvMut = useUploadCv();
  const [form, setFormState] = useState(INITIAL);
  const [cvFile, setCvFile] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [activeTab, setActiveTab] = useState("identity");

  // Hydrate form when API data loads
  useEffect(() => {
    if (profile && profile.bio) {
      setFormState({
        ...INITIAL,
        ...profile,
        //  FIXED: Array fields stay as newline-separated text for display
        goals: joinLines(profile.goals),
        values: joinLines(profile.values),
        funFacts: joinLines(profile.funFacts),
        hobbies: joinLines(profile.hobbies),
        //  FIXED: Structured fields stored as pretty-printed JSON strings for editing
        education: Array.isArray(profile.education)
          ? JSON.stringify(profile.education, null, 2)
          : profile.education || "",
        certifications: Array.isArray(profile.certifications)
          ? JSON.stringify(profile.certifications, null, 2)
          : profile.certifications || "",
        languages: Array.isArray(profile.languages)
          ? JSON.stringify(profile.languages, null, 2)
          : profile.languages || "",
        socials: profile.socials || INITIAL.socials,
      });
    }
  }, [profile]);

  const setField = (name, value) => {
    setFormState((p) => ({ ...p, [name]: value }));
    if (formErrors[name])
      setFormErrors((e) => {
        const n = { ...e };
        delete n[name];
        return n;
      });
  };

  const setSocialField = (key, value) => {
    setFormState((p) => ({ ...p, socials: { ...p.socials, [key]: value } }));
  };

  const validate = () => {
    const errs = {};
    if (!form.bio || form.bio.length < 10)
      errs.bio = "Bio must be at least 10 characters";
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;

    const payload = {
      ...form,
      //  FIXED: Convert array fields from newline-separated to arrays
      goals: splitLines(form.goals),
      values: splitLines(form.values),
      funFacts: splitLines(form.funFacts),
      hobbies: splitLines(form.hobbies),

      //  FIXED: Parse structured fields, with proper fallbacks
      education: tryParseJson(form.education, splitLines(form.education)),
      certifications: tryParseJson(
        form.certifications,
        splitLines(form.certifications),
      ),
      languages: tryParseJson(form.languages, splitLines(form.languages)),
    };

    //  DEBUG: Log what we're sending
    console.log(" SUBMITTING PAYLOAD:", {
      ...payload,
      goals: `[Array of ${payload.goals.length} items]`,
      values: `[Array of ${payload.values.length} items]`,
      education: `[${typeof payload.education === "string" ? "STRING" : "ARRAY of " + payload.education.length}]`,
    });

    try {
      const result = await upsertMut.mutateAsync(payload);
      setProfile(payload);
      return result;
    } catch (error) {
      console.error(" Submit failed:", error.response?.data || error.message);
      throw error;
    }
  };

  const submitCv = async () => {
    if (!cvFile) return;
    const fd = new FormData();
    fd.append("cv", cvFile);

    console.log(" UPLOADING CV:", cvFile.name);

    try {
      await cvMut.mutateAsync(fd);
      setCvFile(null);
    } catch (error) {
      console.error(" CV upload failed:", error);
      throw error;
    }
  };

  return {
    form,
    setField,
    setSocialField,
    formErrors,
    cvFile,
    setCvFile,
    submit,
    submitCv,
    activeTab,
    setActiveTab,
    isPending: upsertMut.isPending,
    isCvPending: cvMut.isPending,
    reset: () => {
      setFormState(INITIAL);
      setFormErrors({});
    },
  };
};
