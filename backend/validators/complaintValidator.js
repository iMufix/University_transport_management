import Joi from 'joi';
import { COMPLAINT_STATUS } from '../utils/constants.js';

export const complaintSchema = Joi.object({
  studentId: Joi.string().hex().length(24).required(),
  message: Joi.string().required()
});

export const updateComplaintSchema = Joi.object({
  status: Joi.string().valid(...Object.values(COMPLAINT_STATUS)).required()
});
