import { asyncHandler } from '../utils/asyncHandler.js';
import * as attendanceService from '../services/attendanceService.js';

export const markAttendance = asyncHandler(async (req, res) => {
  const attendance = await attendanceService.markAttendance(req.body);
  res.status(201).json(attendance);
});

export const getAttendance = asyncHandler(async (req, res) => {
  const { busId, date } = req.query;
  const attendance = await attendanceService.getAttendanceByBusAndDate(busId, date || new Date());
  res.json(attendance);
});
