import Attendance from '../models/Attendance.js';

export const markAttendance = async (attendanceData) => {
  return await Attendance.create(attendanceData);
};

export const getAttendanceByBusAndDate = async (busId, date) => {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  
  return await Attendance.find({
    busId,
    date: { $gte: startOfDay, $lte: endOfDay }
  }).populate('studentId');
};
