import Joi from 'joi';

export const busSchema = Joi.object({
  busNumber: Joi.string().required(),
  capacity: Joi.number().min(1).required(),
  driverId: Joi.string().hex().length(24).optional().allow(''),
  routeId: Joi.string().hex().length(24).optional().allow('')
});
