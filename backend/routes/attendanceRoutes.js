import express from 'express';
import { 
  markAttendance, 
  getAttendance, 
  getAttendanceByStudent, 
  getAttendanceByBus, 
  getAttendanceByDate 
} from '../controllers/attendanceController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';
import { attendanceSchema } from '../validators/attendanceValidator.js';
import { ROLES } from '../utils/constants.js';

const router = express.Router();

router.post('/mark', protect, authorizeRoles(ROLES.ADMIN, ROLES.DRIVER, ROLES.STUDENT), validate(attendanceSchema), markAttendance);
router.get('/', protect, authorizeRoles(ROLES.ADMIN, ROLES.DRIVER), getAttendance);
router.get('/student/:id', protect, authorizeRoles(ROLES.ADMIN, ROLES.STUDENT), getAttendanceByStudent);
router.get('/bus/:id', protect, authorizeRoles(ROLES.ADMIN, ROLES.DRIVER), getAttendanceByBus);
router.get('/date/:date', protect, authorizeRoles(ROLES.ADMIN, ROLES.DRIVER), getAttendanceByDate);

export default router;
