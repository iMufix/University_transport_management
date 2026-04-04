import Route from '../models/Route.js';

export const createRoute = async (routeData) => {
  return await Route.create(routeData);
};

export const getRoutes = async () => {
  return await Route.find({});
};

export const getRouteById = async (id) => {
  return await Route.findById(id);
};

export const updateRoute = async (id, routeData) => {
  return await Route.findByIdAndUpdate(id, routeData, { new: true });
};

export const deleteRoute = async (id) => {
  return await Route.findByIdAndDelete(id);
};
