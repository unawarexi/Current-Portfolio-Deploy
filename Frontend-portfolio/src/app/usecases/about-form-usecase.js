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
import { toast } from "@store/toast.store";
import { z } from "zod";

const urlOptional = z
  .string()
  .trim()
  .refine((v) => v === "" || /^https?:\/\/.+/.test(v), { message: "Must be a valid URL" })
  .optional()
  .default("");

const aboutFormSchema = z.object({
  bio: z.string().trim().min(10, "Bio must be at least 10 characters"),
  yearsOfExperience: z.coerce.number().int().nonnegative({ message: "Must be positive" }).default(0),
  projectsCount: z.coerce.number().int().nonnegative({ message: "Must be positive" }).default(0),
  clientsCount: z.coerce.number().int().nonnegative({ message: "Must be positive" }).default(0),
  rating: z.coerce.number().min(0).max(5).default(5.0),
  socials: z.object({
    github: urlOptional,
    linkedin: urlOptional,
    twitter: urlOptional,
    instagram: urlOptional,
    website: urlOptional,
  }),
});

const INITIAL = {
  name: "",
  headline: "",
  tagline: "",
  bio: "",
  history: "",
  vision: "",
  mission: "",
  philosophy: "",
  goals: [],
  currentFocus: "",
  values: [],
  funFacts: [],
  hobbies: [],
  education: [],
  certifications: [],
  languages: [],
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
        //  FIXED: Array fields stay as arrays
        goals: profile.goals || [],
        values: profile.values || [],
        funFacts: profile.funFacts || [],
        hobbies: profile.hobbies || [],
        //  FIXED: Structured fields stored as arrays
        education: profile.education || [],
        certifications: profile.certifications || [],
        languages: profile.languages || [],
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
    // Only validate the fields we care about (we use partial matching so we don't need to define every single string field)
    const result = aboutFormSchema.safeParse(form);
    if (!result.success) {
      const errs = {};
      for (const [k, v] of Object.entries(result.error.flatten().fieldErrors)) {
        errs[k] = v[0];
      }
      
      // Handle nested socials errors
      const socialErrs = result.error.flatten().fieldErrors;
      if (result.error.flatten().fieldErrors['socials.github']) errs.github = 'Invalid URL';
      if (result.error.flatten().fieldErrors['socials.linkedin']) errs.linkedin = 'Invalid URL';
      // It's a bit tricky to map nested zod errors perfectly in this simple setup,
      // but if there are any errors, we can just block it.

      setFormErrors(errs);
      toast.error('Please fix the errors before submitting');
      return false;
    }
    setFormErrors({});
    return true;
  };

  const submit = async () => {
    if (!validate()) return;

    const payload = {
      ...form,
    };

    //  DEBUG: Log what we're sending
    console.log(" SUBMITTING PAYLOAD:", {
      ...payload,
      goals: `[Array of ${payload.goals.length} items]`,
      values: `[Array of ${payload.values.length} items]`,
      education: `[ARRAY of ${payload.education.length}]`,
    });

    try {
      const result = await upsertMut.mutateAsync(payload);
      setProfile(payload);
      toast.success("Profile updated!");
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
