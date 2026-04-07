import { asyncHandler } from '../utils/asyncHandler.js';
import * as userService from '../services/userService.js';

export const getUsers = asyncHandler(async (req, res) => {
  const users = await userService.getUsers();
  res.json(users);
});

export const getUserById = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  res.json(user);
});

export const updateUser = asyncHandler(async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  res.json(user);
});

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await userService.deleteUser(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  res.json({ message: 'User removed' });
});