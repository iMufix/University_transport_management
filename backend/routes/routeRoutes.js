import express from 'express';
import { createRoute, getRoutes, getRouteById, updateRoute, deleteRoute } from '../controllers/routeController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';
import { routeSchema } from '../validators/routeValidator.js';
import { ROLES } from '../utils/constants.js';

const router = express.Router();

router.route('/')
  .post(protect, authorizeRoles(ROLES.ADMIN), validate(routeSchema), createRoute)
  .get(protect, authorizeRoles(ROLES.ADMIN, ROLES.STUDENT, ROLES.DRIVER), getRoutes);

router.route('/:id')
  .get(protect, getRouteById)
  .put(protect, authorizeRoles(ROLES.ADMIN), validate(routeSchema), updateRoute)
  .delete(protect, authorizeRoles(ROLES.ADMIN), deleteRoute);

export default router;
