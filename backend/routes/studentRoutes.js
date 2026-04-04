import express from 'express';
import { createStudent, getStudents, getStudentById, updateStudent, deleteStudent } from '../controllers/studentController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';
import { studentSchema } from '../validators/studentValidator.js';
import { ROLES } from '../utils/constants.js';

const router = express.Router();

router.route('/')
  .post(protect, authorizeRoles(ROLES.ADMIN, ROLES.STUDENT), validate(studentSchema), createStudent)
  .get(protect, authorizeRoles(ROLES.ADMIN, ROLES.DRIVER), getStudents);

router.route('/:id')
  .get(protect, authorizeRoles(ROLES.ADMIN), getStudentById)
  .put(protect, authorizeRoles(ROLES.ADMIN), validate(studentSchema), updateStudent)
  .delete(protect, authorizeRoles(ROLES.ADMIN), deleteStudent);

export default router;
