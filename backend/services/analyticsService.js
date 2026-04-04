import Bus from '../models/Bus.js';
import Student from '../models/Student.js';
import Route from '../models/Route.js';
import User from '../models/User.js';
import Complaint from '../models/Complaint.js';
import Attendance from '../models/Attendance.js';

export const getOverviewAnalytics = async () => {
  const rawDateStr = new Date().toISOString().split('T')[0];

  const [
    totalBuses,
    totalStudents,
    totalRoutes,
    totalDrivers,
    totalComplaints,
    resolvedComplaints,
    totalAttendanceToday
  ] = await Promise.all([
    Bus.countDocuments(),
    Student.countDocuments(),
    Route.countDocuments(),
    User.countDocuments({ role: 'driver' }),
    Complaint.countDocuments(),
    Complaint.countDocuments({ status: 'resolved' }),
    Attendance.countDocuments({ date: rawDateStr, status: 'Present' })
  ]);

  return { 
    totalBuses, 
    totalStudents, 
    totalRoutes, 
    totalDrivers, 
    totalComplaints, 
    resolvedComplaints, 
    totalAttendanceToday 
  };
};

export const getAttendanceTrend = async () => {
  return await Attendance.aggregate([
    { $match: { status: 'Present' } },
    { $group: { _id: '$date', count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
    { $limit: 10 }
  ]);
};

export const getBusUsage = async () => {
  return await Student.aggregate([
    { $match: { busId: { $ne: null } } },
    { $group: { _id: '$busId', count: { $sum: 1 } } },
    { $lookup: { from: 'buses', localField: '_id', foreignField: '_id', as: 'busData' } },
    { $unwind: { path: '$busData', preserveNullAndEmptyArrays: true } },
    { $project: { _id: 0, busNumber: '$busData.busNumber', count: 1 } },
    { $sort: { count: -1 } }
  ]);
};
