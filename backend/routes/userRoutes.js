import express from 'express';
import { getUsers, getUserById, updateUser, deleteUser } from '../controllers/userController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';
import { ROLES } from '../utils/constants.js';

const router = express.Router();

router.route('/')
  .get(protect, authorizeRoles(ROLES.ADMIN), getUsers);

router.route('/:id')
  .get(protect, authorizeRoles(ROLES.ADMIN), getUserById)
  .put(protect, authorizeRoles(ROLES.ADMIN), updateUser)
  .delete(protect, authorizeRoles(ROLES.ADMIN), deleteUser);

export default router;