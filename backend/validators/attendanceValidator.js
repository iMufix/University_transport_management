import Joi from 'joi';
import { ATTENDANCE_STATUS } from '../utils/constants.js';

export const attendanceSchema = Joi.object({
  studentId: Joi.string().hex().length(24).required(),
  busId: Joi.string().hex().length(24).required(),
  status: Joi.string().valid(...Object.values(ATTENDANCE_STATUS)).required()
});
