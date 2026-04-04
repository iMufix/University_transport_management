import Attendance from '../models/Attendance.js';

export const markAttendance = async (data) => {
  const date = data.date ? data.date.split('T')[0] : new Date().toISOString().split('T')[0];
  
  // Check duplication
  const existing = await Attendance.findOne({ studentId: data.studentId, date });
  if (existing) {
    throw new Error('Attendance has already been recorded for this student today.');
  }

  const record = await Attendance.create({
    studentId: data.studentId,
    busId: data.busId,
    date,
    status: data.status || 'Present'
  });

  return await Attendance.findById(record._id).populate('studentId').populate('busId');
};

export const getAttendance = async () => {
  return await Attendance.find({}).populate({
    path: 'studentId',
    select: 'name department pickupPoint'
  }).populate({
    path: 'busId',
    select: 'busNumber capacity'
  }).sort({ date: -1, createdAt: -1 });
};

export const getAttendanceByStudent = async (studentId) => {
  return await Attendance.find({ studentId }).populate('busId', 'busNumber').sort({ date: -1 });
};

export const getAttendanceByBus = async (busId) => {
  return await Attendance.find({ busId }).populate('studentId', 'name department').sort({ date: -1 });
};

export const getAttendanceByDate = async (date) => {
  return await Attendance.find({ date }).populate('studentId busId').sort({ createdAt: -1 });
};
