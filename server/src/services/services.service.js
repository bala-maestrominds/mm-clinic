import { Service } from '../models/services.model.js';
import { ApiError } from '../utils/ApiError.js';
import { slugify } from '../utils/services.validation.js';

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

async function ensureUniqueSlug(baseSlug, excludeId) {
  let slug = baseSlug;
  let suffix = 1;
  while (
    await Service.exists({ slug, ...(excludeId ? { _id: { $ne: excludeId } } : {}) })
  ) {
    suffix += 1;
    slug = `${baseSlug}-${suffix}`;
  }
  return slug;
}

async function createService(data) {
  const baseSlug = slugify(data.slug || data.name);
  const slug = await ensureUniqueSlug(baseSlug);
  return Service.create({ ...data, slug });
}

async function updateService(id, data) {
  const payload = { ...data };
  if (payload.slug || payload.name) {
    const baseSlug = slugify(payload.slug || payload.name);
    payload.slug = await ensureUniqueSlug(baseSlug, id);
  }
  const service = await Service.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!service) throw new ApiError(404, 'Service not found');
  return service;
}

async function deleteService(id) {
  const service = await Service.findByIdAndDelete(id);
  if (!service) throw new ApiError(404, 'Service not found');
  return service;
}

export const servicesService = {
  listServices,
  getServiceBySlug,
  getServiceById,
  createService,
  updateService,
  deleteService,
};
