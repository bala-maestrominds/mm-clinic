import { Service } from '../models/services.model.js';
import { ApiError } from '../utils/ApiError.js';

async function listServices({ category } = {}) {
  if (category) {
    return Service.find({ category }).sort({ name: 1 });
  }
  return Service.find({}).sort({ name: 1 });
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
