import Joi from 'joi';

export const complaintSchema = Joi.object({
  message: Joi.string().required(),
  status: Joi.string().valid('open', 'in-progress', 'resolved').optional()
});
