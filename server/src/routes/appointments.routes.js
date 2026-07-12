import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { appointmentsController } from '../controllers/appointments.controller.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { validateRequest } from '../middleware/validateRequest.js';
import {
  createAppointmentSchema,
  updateStatusSchema,
  verifyAppointmentSchema,
  listAppointmentsQuerySchema,
} from '../utils/appointments.validation.js';

const router = Router();

// Guard the public booking endpoint against abuse (it triggers DB writes,
// PDF generation, and an outbound email per request).
const bookingLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many booking attempts. Please try again later.' },
});

// --- Public ---
router.post(
  '/',
  bookingLimiter,
  validateRequest(createAppointmentSchema),
  asyncHandler(appointmentsController.create)
);
router.get('/:id/pdf', asyncHandler(appointmentsController.downloadPdf));
router.get('/:id', asyncHandler(appointmentsController.getById));

// --- Reception / Admin ---
// Scans/lookups a QR payload {code, token} to pull up the patient's appointment.
router.post(
  '/verify',
  validateRequest(verifyAppointmentSchema),
  asyncHandler(appointmentsController.verify)
);
router.post('/:id/checkin', asyncHandler(appointmentsController.checkIn));
router.patch(
  '/:id/status',
  validateRequest(updateStatusSchema),
  asyncHandler(appointmentsController.updateStatus)
);
router.get('/', validateRequest(listAppointmentsQuerySchema, 'query'), asyncHandler(appointmentsController.list));

export default router;