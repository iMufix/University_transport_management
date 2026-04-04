import express from 'express';
import { createNotification, getNotifications, markAsRead } from '../controllers/notificationController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';
import { ROLES } from '../utils/constants.js';

const router = express.Router();

router.route('/')
  .post(protect, authorizeRoles(ROLES.ADMIN), createNotification)
  .get(protect, getNotifications);

router.patch('/:id/read', protect, markAsRead);

export default router;
