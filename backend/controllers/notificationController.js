import { asyncHandler } from '../utils/asyncHandler.js';
import * as notificationService from '../services/notificationService.js';

export const createNotification = asyncHandler(async (req, res) => {
  const notification = await notificationService.createNotification(req.body);
  res.status(201).json(notification);
});

export const getNotifications = asyncHandler(async (req, res) => {
  const role = req.query.role || req.user.role;
  const notifications = await notificationService.getNotificationsByRole(role);
  res.json(notifications);
});

export const markAsRead = asyncHandler(async (req, res) => {
  const notification = await notificationService.markAsRead(req.params.id);
  res.json(notification);
});
