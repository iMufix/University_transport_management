import express from 'express';
import { markAttendance, getAttendance } from '../controllers/attendanceController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';
import { attendanceSchema } from '../validators/attendanceValidator.js';
import { ROLES } from '../utils/constants.js';

const router = express.Router();

router.route('/')
  .post(protect, authorizeRoles(ROLES.ADMIN, ROLES.DRIVER), validate(attendanceSchema), markAttendance)
  .get(protect, authorizeRoles(ROLES.ADMIN, ROLES.DRIVER), getAttendance);

export default router;
