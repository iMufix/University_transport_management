import express from 'express';
import { createStudent, getStudents, allocateBus } from '../controllers/studentController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';
import { studentSchema } from '../validators/studentValidator.js';
import { ROLES } from '../utils/constants.js';

const router = express.Router();

router.route('/')
  .post(protect, authorizeRoles(ROLES.ADMIN, ROLES.STUDENT), validate(studentSchema), createStudent)
  .get(protect, authorizeRoles(ROLES.ADMIN, ROLES.DRIVER), getStudents);

router.put('/:id/allocate', protect, authorizeRoles(ROLES.ADMIN), allocateBus);

export default router;
