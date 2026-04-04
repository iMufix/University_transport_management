import express from 'express';
import { 
  createComplaint, 
  getComplaints, 
  getComplaintById, 
  updateComplaintStatus, 
  deleteComplaint 
} from '../controllers/complaintController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';
import { complaintSchema } from '../validators/complaintValidator.js';
import { ROLES } from '../utils/constants.js';

const router = express.Router();

router.route('/')
  .post(protect, authorizeRoles(ROLES.STUDENT, ROLES.ADMIN), validate(complaintSchema), createComplaint)
  .get(protect, getComplaints);

router.route('/:id')
  .get(protect, getComplaintById)
  .put(protect, authorizeRoles(ROLES.ADMIN), updateComplaintStatus)
  .delete(protect, authorizeRoles(ROLES.ADMIN, ROLES.STUDENT), deleteComplaint);

export default router;
