import Joi from 'joi';

export const attendanceSchema = Joi.object({
  studentId: Joi.string().hex().length(24).required(),
  busId: Joi.string().hex().length(24).required(),
  date: Joi.string().isoDate().optional(), // YYYY-MM-DD or standard ISO
  status: Joi.string().valid('Present', 'Absent').optional()
});
