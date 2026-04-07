import { asyncHandler } from '../utils/asyncHandler.js';
import * as busService from '../services/busService.js';

export const createBus = asyncHandler(async (req, res) => {
  const bus = await busService.createBus(req.body);
  res.status(201).json(bus);
});

export const getBuses = asyncHandler(async (req, res) => {
  const buses = await busService.getBuses();
  res.json(buses);
});

export const getBusById = asyncHandler(async (req, res) => {
  const bus = await busService.getBusById(req.params.id);
  if (!bus) {
    res.status(404);
    throw new Error('Bus not found');
  }
  res.json(bus);
});

export const updateBus = asyncHandler(async (req, res) => {
  const bus = await busService.updateBus(req.params.id, req.body);
  if (!bus) {
    res.status(404);
    throw new Error('Bus not found');
  }
  res.json(bus);
});

export const deleteBus = asyncHandler(async (req, res) => {
  const bus = await busService.deleteBus(req.params.id);
  if (!bus) {
    res.status(404);
    throw new Error('Bus not found');
  }
  res.json({ message: 'Bus removed' });
});

export const assignRouteToDriver = asyncHandler(async (req, res) => {
  const { driverId, routeId } = req.body;
  const bus = await busService.assignRouteToDriver(driverId, routeId);
  if (!bus) {
    res.status(404);
    throw new Error('Driver not found or not assigned to a bus');
  }
  res.json(bus);
});
