import { Router } from 'express';
import { doctorsController } from '../controllers/doctors.controller.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { uploadDoctorPhoto } from '../middleware/upload.middleware.js';
import {
  createDoctorSchema,
  updateDoctorSchema,
  availabilityQuerySchema,
} from '../utils/doctors.validation.js';

const router = Router();

router.get('/', asyncHandler(doctorsController.list));
router.get('/:id', asyncHandler(doctorsController.getById));
router.get(
  '/:id/availability',
  validateRequest(availabilityQuerySchema, 'query'),
  asyncHandler(doctorsController.availability)
);
router.post(
  '/',
  uploadDoctorPhoto.single('photo'),
  validateRequest(createDoctorSchema),
  asyncHandler(doctorsController.create)
);

router.patch('/:id', validateRequest(updateDoctorSchema), asyncHandler(doctorsController.update));
router.delete('/:id', asyncHandler(doctorsController.deactivate));

export default router;
