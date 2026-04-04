import Student from '../models/Student.js';
import Bus from '../models/Bus.js';
import Route from '../models/Route.js';

export const createStudent = async (studentData) => {
  // Attempt to find a route that matches the pickupPoint
  const routes = await Route.find({ "stops.stopName": studentData.pickupPoint });
  
  if (routes.length === 0) {
    throw new Error('No routes available for this pickup point');
  }

  let assignedBus = null;
  let assignedRoute = null;

  // Search through routes for a bus with available capacity
  for (const route of routes) {
    const buses = await Bus.find({ routeId: route._id });
    for (const bus of buses) {
      const currentStudentsCount = await Student.countDocuments({ busId: bus._id });
      if (currentStudentsCount < bus.capacity) {
        assignedBus = bus;
        assignedRoute = route;
        break;
      }
    }
    if (assignedBus) break;
  }

  if (!assignedBus) {
    throw new Error('No available bus (buses on this route are at full capacity or none assigned)');
  }

  const newStudentData = {
    ...studentData,
    busId: assignedBus._id,
    routeId: assignedRoute._id
  };

  return await Student.create(newStudentData);
};

export const getStudents = async () => {
  return await Student.find({}).populate('busId').populate('routeId');
};

export const getStudentById = async (id) => {
  return await Student.findById(id).populate('busId').populate('routeId');
};

export const updateStudent = async (id, studentData) => {
  return await Student.findByIdAndUpdate(id, studentData, { new: true });
};

export const deleteStudent = async (id) => {
  return await Student.findByIdAndDelete(id);
};
