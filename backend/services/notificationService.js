import Notification from '../models/Notification.js';

export const createNotification = async (data) => {
  return await Notification.create(data);
};

export const getNotificationsByRole = async (role) => {
  let query = { targetRole: role };
  
  if (role !== 'admin') {
    query = { targetRole: { $in: [role, 'all'] } }; // Match self role and global role
  } else {
    query = {}; // Admin sees everything
  }
  
  return await Notification.find(query).sort({ createdAt: -1 });
};

export const getAllNotifications = async () => {
  return await Notification.find({}).sort({ createdAt: -1 });
};

export const getNotificationById = async (id) => {
  return await Notification.findById(id);
};

export const updateNotification = async (id, data) => {
  return await Notification.findByIdAndUpdate(id, data, { new: true });
};

export const deleteNotification = async (id) => {
  return await Notification.findByIdAndDelete(id);
};
