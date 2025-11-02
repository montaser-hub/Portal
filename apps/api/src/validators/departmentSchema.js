import Joi from '../utils/joiExtension.js';

export const createDepartmentSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({
      'any.required': 'Department name is required.',
      'string.empty': 'Department name cannot be empty.',
      'string.min': 'Department name must be at least 3 characters.',
      'string.max': 'Department name cannot exceed 30 characters.'
    }),
  managerId: Joi.objectId()
    .optional()
    .messages({
      'objectId.base': 'Manager ID must be a valid ObjectId.'
    }),
  locationId: Joi.objectId()
    .required()
    .messages({
      'objectId.base': 'Location ID must be a valid ObjectId.'
    })
});

export const updateDepartmentSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .optional()
    .messages({
      'string.min': 'Department name must be at least 3 characters.',
      'string.max': 'Department name cannot exceed 30 characters.'
    }),
  managerId: Joi.objectId()
    .optional()
    .messages({
      'objectId.base': 'Manager ID must be a valid ObjectId.'
    }),
  locationId: Joi.objectId()
    .optional()
    .messages({
      'objectId.base': 'Location ID must be a valid ObjectId.'
    })
});
