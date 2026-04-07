import User from '../models/User.js';

export const getUsers = async () => {
  return await User.find({}).select('-password');
};

export const getUserById = async (id) => {
  return await User.findById(id).select('-password');
};

export const updateUser = async (id, userData) => {
  return await User.findByIdAndUpdate(id, userData, { new: true }).select('-password');
};

export const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};