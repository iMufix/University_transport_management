import express from 'express';
import { getOverview, getAttendanceTrend, getBusUsage } from '../controllers/analyticsController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';
import { ROLES } from '../utils/constants.js';

const router = express.Router();

router.use(protect, authorizeRoles(ROLES.ADMIN));

router.get('/overview', getOverview);
router.get('/attendance-trend', getAttendanceTrend);
router.get('/bus-usage', getBusUsage);

export default router;
