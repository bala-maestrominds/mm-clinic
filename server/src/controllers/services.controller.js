import { servicesService } from '../services/services.service.js';

async function list(req, res) {
  const { category } = req.query;
  const services = await servicesService.listServices({ category });
  res.json({ data: services });
}

async function getBySlug(req, res) {
  const service = await servicesService.getServiceBySlug(req.params.slug);
  res.json({ data: service });
}

async function getServiceById(req, res) {
  const { id } = req.params;
  const data = await servicesService.getServiceById(id)
  res.json({data : data});
}

export const servicesController = {
  list,
  getBySlug,
  getServiceById
};
