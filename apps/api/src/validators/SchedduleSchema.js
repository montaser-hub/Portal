import Joi from 'joi';
const objectIdPattern = /^[0-9a-fA-F]{24}$/;
const objectIdMessage = 'Invalid ObjectId (must be 24 hex characters).';
export const createScheduleSchema = Joi.object({
  date: Joi.date().required().messages({
    'any.required': 'Date is required.',
    'date.base': 'Date must be a valid date.'
  }),
  departmentId: Joi.string().pattern(objectIdPattern).messages({
    'string.pattern.base': objectIdMessage
  }).optional().allow(null),
  userId: Joi.string().pattern(objectIdPattern).messages({
    'string.pattern.base': objectIdMessage
  }).optional().allow(null),
  swapRequestId: Joi.string().pattern(objectIdPattern).messages({
    'string.pattern.base': objectIdMessage
  }).optional().allow(null),
  shiftId: Joi.string().pattern(objectIdPattern).messages({
    'string.pattern.base': objectIdMessage
  }).optional().allow(null),
  subDepartmentId: Joi.string().pattern(objectIdPattern).messages({
    'string.pattern.base': objectIdMessage
  }).optional().allow(null),
  isActive: Joi.boolean().optional()
}).options({ abortEarly: false });

export const updateScheduleSchema = Joi.object({
  date: Joi.date().messages({
    'date.base': 'Date must be a valid date.'
  }).optional(),
  departmentId: Joi.string().pattern(objectIdPattern).messages({
    'string.pattern.base': objectIdMessage
  }).optional().allow(null),
  userId: Joi.string().pattern(objectIdPattern).messages({
    'string.pattern.base': objectIdMessage
  }).optional().allow(null),
  swapRequestId: Joi.string().pattern(objectIdPattern).messages({
    'string.pattern.base': objectIdMessage
  }).optional().allow(null),
  shiftId: Joi.string().pattern(objectIdPattern).messages({
    'string.pattern.base': objectIdMessage
  }).optional().allow(null),
  subDepartmentId: Joi.string().pattern(objectIdPattern).messages({
    'string.pattern.base': objectIdMessage
  }).optional().allow(null),
  isActive: Joi.boolean().optional()
})
.min(1)
.options({ abortEarly: false });



