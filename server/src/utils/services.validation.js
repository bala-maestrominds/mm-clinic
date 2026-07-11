import { z } from 'zod';

const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export const createServiceSchema = z.object({
  name: z.string().min(2).max(120),
  slug: z
    .string()
    .min(2)
    .max(140)
    .optional()
    .or(z.literal(''))
    .transform((val) => (val ? slugify(val) : undefined)),
  category: z.string().max(60).optional(),
  shortDescription: z.string().max(300).optional(),
  description: z.string().max(5000).optional(),
  imageUrl: z.string().optional(),
  priceFrom: z.coerce.number().min(0).optional().nullable(),
  durationMinutes: z.coerce.number().int().min(5).max(600),
});

// Same shape but every field optional, for PATCH.
export const updateServiceSchema = createServiceSchema.partial();

export { slugify };
