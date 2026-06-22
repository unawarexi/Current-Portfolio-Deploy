import { z } from 'zod';

const urlOptional = z.string().refine((v) => !v || /^https?:\/\/.+/.test(v), 'Must be a valid URL').optional().default('');

const aboutSchema = z.object({
  // Identity
  name:              z.string().optional().default(''),
  headline:          z.string().optional().default(''),
  tagline:           z.string().optional().default(''),
  bio:               z.string().min(10, 'Bio is required'),
  history:           z.string().optional().default(''),
  // Philosophy & vision
  vision:            z.string().optional().default(''),
  mission:           z.string().optional().default(''),
  philosophy:        z.string().optional().default(''),
  // Goals
  goals:             z.array(z.string()).default([]),
  currentFocus:      z.string().optional().default(''),
  // Values & personality
  values:            z.array(z.string()).default([]),
  funFacts:          z.array(z.string()).default([]),
  hobbies:           z.array(z.string()).default([]),
  // Education & credentials
  education:         z.array(z.object({ institution: z.string(), degree: z.string(), year: z.string() })).default([]),
  certifications:    z.array(z.object({ name: z.string(), issuer: z.string(), year: z.string(), url: z.string().optional() })).default([]),
  languages:         z.array(z.object({ name: z.string(), level: z.string() })).default([]),
  // Availability
  openToWork:        z.boolean().default(true),
  availabilityNote:  z.string().optional().default(''),
  // Media
  avatar:            urlOptional,
  cvUrl:             urlOptional,
  // Stats (manually set)
  yearsOfExperience: z.coerce.number().int().default(0),
  projectsCount:     z.coerce.number().int().default(0),
  clientsCount:      z.coerce.number().int().default(0),
  rating:            z.coerce.number().default(5.0),
  // Socials
  socials: z.object({
    github:    urlOptional,
    linkedin:  urlOptional,
    twitter:   urlOptional,
    instagram: urlOptional,
    website:   urlOptional,
  }).optional().default({}),
});

const aboutUpdateSchema = aboutSchema.partial();

export { aboutSchema, aboutUpdateSchema };
