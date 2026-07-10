import { servicesService } from '../services/services.service.js';

async function list(req, res) {
  const { category } = req.query;
  const services = await servicesService.listServices({ category });
  res.json({ data: services });
}

async function getByIdOrSlug(req, res) {
  const { idOrSlug } = req.params;
  const isObjectId = /^[a-f\d]{24}$/i.test(idOrSlug);
  const data = isObjectId
    ? await servicesService.getServiceById(idOrSlug)
    : await servicesService.getServiceBySlug(idOrSlug);
  res.json({ data });
}

export const servicesController = {
  list,
  getByIdOrSlug,
};