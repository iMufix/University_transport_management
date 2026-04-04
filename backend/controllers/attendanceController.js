import { asyncHandler } from '../utils/asyncHandler.js';
import * as attendanceService from '../services/attendanceService.js';

export const markAttendance = asyncHandler(async (req, res) => {
  const record = await attendanceService.markAttendance(req.body);
  res.status(201).json(record);
});

export const getAttendance = asyncHandler(async (req, res) => {
  const records = await attendanceService.getAttendance();
  res.json(records);
});

export const getAttendanceByStudent = asyncHandler(async (req, res) => {
  const records = await attendanceService.getAttendanceByStudent(req.params.id);
  res.json(records);
});

export const getAttendanceByBus = asyncHandler(async (req, res) => {
  const records = await attendanceService.getAttendanceByBus(req.params.id);
  res.json(records);
});

export const getAttendanceByDate = asyncHandler(async (req, res) => {
  const records = await attendanceService.getAttendanceByDate(req.params.date);
  res.json(records);
});
