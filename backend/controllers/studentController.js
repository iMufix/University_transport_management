import { asyncHandler } from '../utils/asyncHandler.js';
import * as studentService from '../services/studentService.js';

export const createStudent = asyncHandler(async (req, res) => {
  const student = await studentService.createStudent(req.body);
  res.status(201).json(student);
});

export const getStudents = asyncHandler(async (req, res) => {
  const students = await studentService.getStudents();
  res.json(students);
});

export const allocateBus = asyncHandler(async (req, res) => {
  const { busId } = req.body;
  const student = await studentService.allocateBus(req.params.id, busId);
  res.json(student);
});
