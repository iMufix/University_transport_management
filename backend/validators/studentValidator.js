import Joi from 'joi';

export const studentSchema = Joi.object({
  userId: Joi.string().hex().length(24).required(),
  name: Joi.string().required(),
  department: Joi.string().required(),
  pickupPoint: Joi.string().required()
});
