import { asyncHandler } from '../utils/asyncHandler.js';
import * as notificationService from '../services/notificationService.js';

export const createNotification = asyncHandler(async (req, res) => {
  const notification = await notificationService.createNotification(req.body);
  res.status(201).json(notification);
});

export const getNotifications = asyncHandler(async (req, res) => {
  const role = req.user.role; 
  let notifications;
  
  if (role === 'admin') {
    notifications = await notificationService.getAllNotifications();
  } else {
    notifications = await notificationService.getNotificationsByRole(role);
  }
  
  res.json(notifications);
});

export const getNotificationById = asyncHandler(async (req, res) => {
  const notification = await notificationService.getNotificationById(req.params.id);
  if (!notification) {
    res.status(404);
    throw new Error('Notification not found');
  }
  res.json(notification);
});

export const updateNotification = asyncHandler(async (req, res) => {
  // Optionally marking as read can map here
  const notification = await notificationService.updateNotification(req.params.id, req.body);
  if (!notification) {
    res.status(404);
    throw new Error('Notification not found');
  }
  res.json(notification);
});

export const deleteNotification = asyncHandler(async (req, res) => {
  const notification = await notificationService.deleteNotification(req.params.id);
  if (!notification) {
    res.status(404);
    throw new Error('Notification not found');
  }
  res.json({ message: 'Notification block deleted' });
});
