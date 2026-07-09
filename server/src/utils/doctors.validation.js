import { z } from 'zod';

const workingHourSchema = z.object({
  day: z.enum(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']),
  startTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'startTime must be HH:mm'),
  endTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'endTime must be HH:mm'),
});

export const createDoctorSchema = z.object({
  name: z.string().min(2).max(120),
  specialty: z.string().min(2).max(120),
  bio: z.string().max(2000).optional(),
  photoUrl: z.string().url().optional().or(z.literal('')),
  email: z.string().email().optional(),
  phone: z.string().min(6).max(20).optional(),
  services: z.array(z.string().length(24, 'invalid service id')).optional(),
  workingHours: z.array(workingHourSchema).optional(),
  slotDurationMinutes: z.number().int().positive().max(240).optional(),
});

// Same shape but every field optional, for PATCH.
export const updateDoctorSchema = createDoctorSchema.partial();

export const availabilityQuerySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'date must be YYYY-MM-DD'),
});
