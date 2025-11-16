import Joi from '../utils/joiExtension.js';
import { validateEndTimeAfterStartTime } from '../utils/validationHelpers.js';

// Reusable 12-hour time format validation
const time12hOr24h = Joi.string()
  .pattern(/^([01]?\d|2[0-3]):[0-5][0-9](\s?(AM|PM))?$/i)
  .messages({
    'string.pattern.base': '"{{#label}}" must be a valid time (e.g., 08:00 AM or 16:00)',
    'any.required': '{{#label}} is required'
  });

export const createShiftSchema = Joi.object({
  shiftName: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({
      'string.min': 'Shift name must be at least 3 characters',
      'string.max': 'Shift name must not exceed 30 characters'
    }),
  shiftType: Joi.string()
    .required()
    .messages({
      'any.required': 'Shift type is required'
    }),
  startTime: time12hOr24h.required(),
  endTime: time12hOr24h
    .required()
    .custom(validateEndTimeAfterStartTime),
  departmentId: Joi.objectId()
    .required()
    .messages({
      'any.required': 'Department is required'
    }),
  subDepartmentId: Joi.objectId().optional()
});

export const updateShiftSchema = Joi.object({
  shiftName: Joi.string()
    .min(3)
    .max(30)
    .optional()
    .messages({
      'string.min': 'Shift name must be at least 3 characters',
      'string.max': 'Shift name must not exceed 30 characters'
    }),
  shiftType: Joi.string().optional(),
  startTime: time12hOr24h.optional(),
  endTime: time12hOr24h
    .optional()
    .custom(validateEndTimeAfterStartTime),
  departmentId: Joi.objectId().optional(),
  subDepartmentId: Joi.objectId().optional()
});
