// ============================================================================
// PROJECT SCHEMA — Zod validation for project creation / update
// ============================================================================
'use strict';

const { z } = require('zod');

// Accepts a valid URL string OR an empty string (optional field)
const urlOptional = z
  .string()
  .refine((v) => v === '' || /^https?:\/\/.+/.test(v), { message: 'Must be a valid URL' })
  .optional()
  .default('');

// ============================================================================
// SCHEMA
// ============================================================================
const projectSchema = z.object({
  // ── Required ────────────────────────────────────────────────────────────
  title:          z.string().min(2, 'Title must be at least 2 characters').max(100, 'Title too long'),
  description:    z.string().min(10, 'Description must be at least 10 characters').max(2000, 'Description too long'),
  category:       z.enum(['Web', 'Mobile', 'Blockchain', 'Other'], {
    errorMap: () => ({ message: 'Category must be Web, Mobile, Blockchain, or Other' }),
  }),

  // ── Project meta ─────────────────────────────────────────────────────────
  type:           z.string().max(50).optional().default(''),
  status:         z.string().max(50).optional().default(''),
  year:           z.string().max(10).optional().default(''),
  client:         z.string().max(100).optional().default(''),
  role:           z.string().max(100).optional().default(''),
  duration:       z.string().max(50).optional().default(''),
  team:           z.array(z.string()).optional().default([]),

  // ── Content ──────────────────────────────────────────────────────────────
  features:       z.string().max(3000).optional().default(''),
  challenges:     z.string().max(3000).optional().default(''),
  solution:       z.string().max(3000).optional().default(''),
  results:        z.string().max(3000).optional().default(''),

  // ── Links ────────────────────────────────────────────────────────────────
  githubLink:     urlOptional,
  googlePlayLink: urlOptional,
  appStoreLink:   urlOptional,
  webLiveLink:    urlOptional,
  videoUrl:       urlOptional,

  // ── Tech + Media (populated by controller after Cloudinary upload) ───────
  technologies:   z.array(z.string()).optional().default([]),
  coverImages:    z.array(z.string()).optional().default([]),
  projectImages:  z.array(z.string()).optional().default([]),
});

// Partial version for PATCH (all fields optional)
const projectUpdateSchema = projectSchema.partial().omit({ coverImages: true, projectImages: true });

module.exports = { projectSchema, projectUpdateSchema };
