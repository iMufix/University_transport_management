import Student from '../models/Student.js';
import Bus from '../models/Bus.js';

export const createStudent = async (studentData) => {
  return await Student.create(studentData);
};

export const getStudents = async () => {
  return await Student.find({}).populate('userId', 'name email').populate('busId');
};

export const allocateBus = async (studentId, busId) => {
  const bus = await Bus.findById(busId);
  if (!bus) throw new Error('Bus not found');
  
  const currentStudents = await Student.countDocuments({ busId });
  if (currentStudents >= bus.capacity) {
    throw new Error('Bus is at full capacity');
  }
  
  return await Student.findByIdAndUpdate(studentId, { busId }, { new: true });
};
