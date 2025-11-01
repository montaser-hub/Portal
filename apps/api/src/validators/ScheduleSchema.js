import Joi from '../utils/joiExtension.js';

// Helper for "not older than today"
const today = new Date();
today.setHours(0, 0, 0, 0);

export const createScheduleSchema = Joi.object({
  date: Joi.date()
    .iso()
    .min(today)
    .required()
    .messages({
      'any.required': 'Date is required.',
      'date.base': 'Date must be a valid date.',
      'date.isoDate': 'Date must be in ISO format.',
      'date.min': 'Date cannot be in the past.'
    }),
  departmentId: Joi.objectId().required(),
  userId: Joi.objectId().required(),
  shiftId: Joi.objectId().required(),
  subDepartmentId: Joi.objectId().optional(),
});

export const updateScheduleSchema = Joi.object({
  date: Joi.date()
    .iso()
    .min(today)
    .messages({
      'date.base': 'Date must be a valid date.',
      'date.isoDate': 'Date must be in ISO format.',
      'date.min': 'Date cannot be in the past.'
    })
    .optional(),
  departmentId: Joi.objectId().optional(),
  userId: Joi.objectId().optional(),
  shiftId: Joi.objectId().optional(),
  subDepartmentId: Joi.objectId().optional(),
});
