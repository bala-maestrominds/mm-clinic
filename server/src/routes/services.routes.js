import { Router } from 'express';
import { servicesController } from '../controllers/services.controller.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

router.get('/', asyncHandler(servicesController.list));
router.get('/:slug', asyncHandler(servicesController.getBySlug));

export default router;
