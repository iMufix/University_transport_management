import express from 'express';
import { 
  createNotification, 
  getNotifications, 
  getNotificationById, 
  updateNotification, 
  deleteNotification 
} from '../controllers/notificationController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';
import { notificationSchema } from '../validators/notificationValidator.js';
import { ROLES } from '../utils/constants.js';

const router = express.Router();

// Admin can POST, but any logged-in valid user can GET
router.route('/')
  .post(protect, authorizeRoles(ROLES.ADMIN), validate(notificationSchema), createNotification)
  .get(protect, getNotifications);

router.route('/:id')
  .get(protect, getNotificationById)
  // Admins can fully modify globally mapped announcements
  .put(protect, authorizeRoles(ROLES.ADMIN), validate(notificationSchema), updateNotification)
  .delete(protect, authorizeRoles(ROLES.ADMIN), deleteNotification);

export default router;
