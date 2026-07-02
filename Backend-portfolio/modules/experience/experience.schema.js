import { z } from 'zod';

const urlOptional = z.string().refine((v) => !v || /^https?:\/\/.+/.test(v), 'Must be a valid URL').optional().default('');

const experienceSchema = z.object({
  company:       z.string().min(2, 'Company required'),
  role:          z.string().min(2, 'Role required'),
  year:          z.string().min(4, 'Year required'),        // e.g. "2022 – Present"
  description:   z.string().min(10, 'Description required'),
  type:          z.enum(['Web Development','Mobile Development','Blockchain','Others']).default('Web Development'),
  subCategory:   z.string().optional().default(''),
  skills:        z.array(z.string()).default([]),
  technologies:  z.array(z.string()).default([]),
  achievements:  z.array(z.string()).default([]),
  productsBuilt: z.array(z.string()).default([]),
  impact:        z.string().optional().default(''),
  isCurrent:     z.boolean().default(false),
  logo:          urlOptional,
  order:         z.coerce.number().int().default(0),
});

const experienceUpdateSchema = experienceSchema.partial();

export { experienceSchema, experienceUpdateSchema };
