import Joi from 'joi';

const stopSchema = Joi.object({
  stopName: Joi.string().required(),
  order: Joi.number().required()
});

const timingSchema = Joi.object({
  departureTime: Joi.string().regex(/^([01]\d|2[0-3]):?([0-5]\d)$/).required(),
  shift: Joi.string()
});

export const routeSchema = Joi.object({
  name: Joi.string().required(),
  stops: Joi.array().items(stopSchema).min(1).required(),
  timings: Joi.array().items(timingSchema).min(1).required()
});
