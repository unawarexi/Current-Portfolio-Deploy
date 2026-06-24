import { z } from "zod";

// URL: allow empty string (not uploaded yet) or a valid http/https URL
const urlOptional = z
  .string()
  .refine((v) => !v || /^https?:\/\/.+/.test(v), "Must be a valid URL")
  .optional()
  .default("");

// ============================================================================
// ABOUT SCHEMA
// cvUrl and coverLetterUrl are intentionally NOT in this schema —
// they live in MongoDB and are never written to Firebase.
// ============================================================================
const aboutSchema = z.object({
  // Identity
  name: z.string().optional().default(""),
  headline: z.string().optional().default(""),
  tagline: z.string().optional().default(""),
  bio: z.string().min(10, "Bio is required"),
  history: z.string().optional().default(""),

  // Philosophy & vision (stored as plain strings in Firebase)
  vision: z.string().optional().default(""),
  mission: z.string().optional().default(""),
  philosophy: z.string().optional().default(""),

  // Goals
  goals: z.array(z.string()).default([]),
  currentFocus: z.string().optional().default(""),

  // Values & personality
  values: z.array(z.string()).default([]),
  funFacts: z.array(z.string()).default([]),
  hobbies: z.array(z.string()).default([]),

  // Education & credentials — each item must be an object with these fields
  education: z
    .array(
      z.object({
        institution: z.string().default(""),
        degree: z.string().default(""),
        year: z.string().default(""),
      }),
    )
    .default([]),

  certifications: z
    .array(
      z.object({
        name: z.string().default(""),
        issuer: z.string().default(""),
        year: z.string().default(""),
        url: z.string().optional().default(""),
      }),
    )
    .default([]),

  languages: z
    .array(
      z.object({
        name: z.string().default(""),
        level: z.string().default(""),
      }),
    )
    .default([]),

  // Availability
  openToWork: z.boolean().default(true),
  availabilityNote: z.string().optional().default(""),

  // Media — avatar only; cvUrl is intentionally excluded (lives in MongoDB)
  avatar: urlOptional,

  // Stats (manually set) — z.coerce handles '5', '25', '0' string inputs
  yearsOfExperience: z.coerce.number().int().nonnegative().default(0),
  projectsCount: z.coerce.number().int().nonnegative().default(0),
  clientsCount: z.coerce.number().int().nonnegative().default(0),
  rating: z.coerce.number().min(0).max(5).default(5.0),

  // Socials
  socials: z
    .object({
      github: urlOptional,
      linkedin: urlOptional,
      twitter: urlOptional,
      instagram: urlOptional,
      website: urlOptional,
    })
    .optional()
    .default({}),
});

// Partial version for updates — all fields optional except none required
const aboutUpdateSchema = aboutSchema.partial();

export { aboutSchema, aboutUpdateSchema };
