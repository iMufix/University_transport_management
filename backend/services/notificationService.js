import Notification from '../models/Notification.js';

export const createNotification = async (notificationData) => {
  return await Notification.create(notificationData);
};

export const getNotificationsByRole = async (role) => {
  return await Notification.find({
    targetRole: { $in: [role, 'all'] }
  }).sort({ createdAt: -1 });
};

export const markAsRead = async (id) => {
  return await Notification.findByIdAndUpdate(id, { readStatus: true }, { new: true });
};
