import express from 'express';

import authRoutes from './authRoutes.js';
import busRoutes from './busRoutes.js';
import routeRoutes from './routeRoutes.js';
import studentRoutes from './studentRoutes.js';
import attendanceRoutes from './attendanceRoutes.js';
import notificationRoutes from './notificationRoutes.js';
import complaintRoutes from './complaintRoutes.js';
import analyticsRoutes from './analyticsRoutes.js';
import userRoutes from './userRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/buses', busRoutes);
router.use('/routes', routeRoutes);
router.use('/students', studentRoutes);
router.use('/attendance', attendanceRoutes);
router.use('/notifications', notificationRoutes);
router.use('/complaints', complaintRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/users', userRoutes);

export default router;
