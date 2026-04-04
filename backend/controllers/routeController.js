import { asyncHandler } from '../utils/asyncHandler.js';
import * as routeService from '../services/routeService.js';

export const createRoute = asyncHandler(async (req, res) => {
  const route = await routeService.createRoute(req.body);
  res.status(201).json(route);
});

export const getRoutes = asyncHandler(async (req, res) => {
  const routes = await routeService.getRoutes();
  res.json(routes);
});

export const getRouteById = asyncHandler(async (req, res) => {
  const route = await routeService.getRouteById(req.params.id);
  if (!route) {
    res.status(404);
    throw new Error('Route not found');
  }
  res.json(route);
});

export const updateRoute = asyncHandler(async (req, res) => {
  const route = await routeService.updateRoute(req.params.id, req.body);
  if (!route) {
    res.status(404);
    throw new Error('Route not found');
  }
  res.json(route);
});

export const deleteRoute = asyncHandler(async (req, res) => {
  const route = await routeService.deleteRoute(req.params.id);
  if (!route) {
    res.status(404);
    throw new Error('Route not found');
  }
  res.json({ message: 'Route removed' });
});
