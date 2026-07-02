// ============================================================================
// PROJECT SCHEMA — Zod validation for project creation / update
// ============================================================================

import { z } from "zod";

// Accepts a string of space-separated URLs, comma-separated URLs, or an array of URL strings
// Will be normalized to numbered arrays (1. url1, 2. url2) in the service layer
const urlsOptional = z
  .preprocess(
    (val) => {
      if (typeof val === "string") {
        // Support both space-separated and comma-separated
        const separator = val.includes(",") ? "," : /\s+/;
        return val
          .split(separator)
          .map((v) => v.trim())
          .filter(Boolean);
      }
      return val || [];
    },
    z.array(
      z
        .string()
        .refine((v) => /^https?:\/\/.+/.test(v), {
          message: "Must be a valid URL",
        }),
    ),
  )
  .optional()
  .default([]);

// ============================================================================
// SCHEMA
// ============================================================================
const projectSchema = z.object({
  // ── Required ────────────────────────────────────────────────────────────
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title too long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(2000, "Description too long"),
  category: z.enum(["Web", "Mobile", "Blockchain", "Other"], {
    errorMap: () => ({
      message: "Category must be Web, Mobile, Blockchain, or Other",
    }),
  }),

  // ── Project meta ─────────────────────────────────────────────────────────
  type: z.string().max(50).optional().default(""),
  status: z.string().max(50).optional().default(""),
  year: z.string().max(10).optional().default(""),
  client: z.string().max(100).optional().default(""),
  role: z.string().max(100).optional().default(""),
  duration: z.string().max(50).optional().default(""),
  team: z.array(z.string()).optional().default([]),

  // ── Content ──────────────────────────────────────────────────────────────
  features: z.array(z.string()).optional().default([]),
  challenges: z.string().max(3000).optional().default(""),
  solution: z.string().max(3000).optional().default(""),
  results: z.string().max(3000).optional().default(""),

  // ── Links ────────────────────────────────────────────────────────────────
  githubLinks: urlsOptional,
  googlePlayLinks: urlsOptional,
  appStoreLinks: urlsOptional,
  webLiveLinks: urlsOptional,
  videoUrls: urlsOptional,

  // ── Tech stack ──────────────────────────────────────────────────────────
  technologies: z.array(z.string()).optional().default([]),

  // ── Cloudinary images (ONLY these go to MongoDB; rest stays in Firebase) ─
  coverImages: z.array(z.string()).optional().default([]),
  projectImages: z.array(z.string()).optional().default([]),
});

// Partial version for PATCH (all fields optional)
const projectUpdateSchema = projectSchema
  .partial()
  .omit({ coverImages: true, projectImages: true });

export { projectSchema, projectUpdateSchema };
