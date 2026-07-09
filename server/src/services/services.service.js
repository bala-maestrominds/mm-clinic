import { Service } from '../models/services.model.js';
import { ApiError } from '../utils/ApiError.js';

async function listServices({ includeInactive = false, category } = {}) {
  const filter = {};
  if (!includeInactive) filter.isActive = true;
  if (category) filter.category = category;

  return Service.find(filter).sort({ name: 1 });
}

async function getServiceBySlug(slug) {
  const service = await Service.findOne({ slug, isActive: true });
  if (!service) throw new ApiError(404, 'Service not found');
  return service;
}

async function getServiceById(id) {
  const service = await Service.findById(id);
  if (!service) throw new ApiError(404, 'Service not found');
  return service;
}


export const servicesService = {
  listServices,
  getServiceBySlug,
  getServiceById,
};
