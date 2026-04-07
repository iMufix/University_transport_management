import Bus from '../models/Bus.js';

export const createBus = async (busData) => {
  return await Bus.create(busData);
};

export const getBuses = async () => {
  return await Bus.find({}).populate('driverId', 'name email').populate('routeId');
};

export const getBusById = async (id) => {
  return await Bus.findById(id).populate('driverId', 'name email').populate('routeId');
};

export const updateBus = async (id, busData) => {
  return await Bus.findByIdAndUpdate(id, busData, { new: true });
};

export const deleteBus = async (id) => {
  return await Bus.findByIdAndDelete(id);
};

export const assignRouteToDriver = async (driverId, routeId) => {
  return await Bus.findOneAndUpdate(
    { driverId },
    { routeId },
    { new: true }
  ).populate('driverId', 'name email').populate('routeId');
};
