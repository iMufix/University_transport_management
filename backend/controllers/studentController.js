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

export const getStudentById = asyncHandler(async (req, res) => {
  const student = await studentService.getStudentById(req.params.id);
  if (!student) {
    res.status(404);
    throw new Error('Student not found');
  }
  res.json(student);
});

export const updateStudent = asyncHandler(async (req, res) => {
  const student = await studentService.updateStudent(req.params.id, req.body);
  if (!student) {
    res.status(404);
    throw new Error('Student not found');
  }
  res.json(student);
});

export const deleteStudent = asyncHandler(async (req, res) => {
  const student = await studentService.deleteStudent(req.params.id);
  if (!student) {
    res.status(404);
    throw new Error('Student not found');
  }
  res.json({ message: 'Student removed' });
});
