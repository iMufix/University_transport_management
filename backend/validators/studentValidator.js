import Joi from 'joi';

export const studentSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  department: Joi.string().required(),
  pickupPoint: Joi.string().required()
});
