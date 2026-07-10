import { Router } from 'express';
import { servicesController } from '../controllers/services.controller.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

router.get('/', asyncHandler(servicesController.list));
router.get('/:idOrSlug', asyncHandler(servicesController.getByIdOrSlug));

export default router;