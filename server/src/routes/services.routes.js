import { Router } from 'express';
import { servicesController } from '../controllers/services.controller.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { uploadServiceImage } from '../middleware/upload.middleware.js';
import { createServiceSchema, updateServiceSchema } from '../utils/services.validation.js';

const router = Router();

router.get('/', asyncHandler(servicesController.list));
router.get('/:idOrSlug', asyncHandler(servicesController.getByIdOrSlug));

router.post(
  '/',
  uploadServiceImage.single('image'),
  validateRequest(createServiceSchema),
  asyncHandler(servicesController.create)
);

router.patch(
  '/:id',
  uploadServiceImage.single('image'),
  validateRequest(updateServiceSchema),
  asyncHandler(servicesController.update)
);

router.delete('/:id', asyncHandler(servicesController.remove));

export default router;
