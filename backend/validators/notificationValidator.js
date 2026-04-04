import Joi from 'joi';

export const notificationSchema = Joi.object({
  title: Joi.string().required(),
  message: Joi.string().required(),
  targetRole: Joi.string().valid('admin', 'student', 'driver', 'all').required()
});
