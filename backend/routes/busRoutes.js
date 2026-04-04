import express from 'express';
import { createBus, getBuses, getBusById, updateBus, deleteBus } from '../controllers/busController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';
import { busSchema } from '../validators/busValidator.js';
import { ROLES } from '../utils/constants.js';

const router = express.Router();

router.route('/')
  .post(protect, authorizeRoles(ROLES.ADMIN), validate(busSchema), createBus)
  .get(protect, authorizeRoles(ROLES.ADMIN, ROLES.STUDENT, ROLES.DRIVER), getBuses);

router.route('/:id')
  .get(protect, getBusById)
  .put(protect, authorizeRoles(ROLES.ADMIN), validate(busSchema), updateBus)
  .delete(protect, authorizeRoles(ROLES.ADMIN), deleteBus);

export default router;
