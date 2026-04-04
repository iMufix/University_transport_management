import express from 'express';
import { createComplaint, getComplaints, updateComplaintStatus } from '../controllers/complaintController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';
import { complaintSchema, updateComplaintSchema } from '../validators/complaintValidator.js';
import { ROLES } from '../utils/constants.js';

const router = express.Router();

router.route('/')
  .post(protect, authorizeRoles(ROLES.STUDENT), validate(complaintSchema), createComplaint)
  .get(protect, authorizeRoles(ROLES.ADMIN), getComplaints);

router.patch('/:id/status', protect, authorizeRoles(ROLES.ADMIN), validate(updateComplaintSchema), updateComplaintStatus);

export default router;
