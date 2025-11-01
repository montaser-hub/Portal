import Joi from '../utils/joiExtension.js';

export const createPositionSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({
      'any.required': 'Position name is required.',
      'string.empty': 'Position name cannot be empty.',
      'string.min': 'Position name must be at least 3 characters.',
      'string.max': 'Position name cannot exceed 30 characters.'
    })
});

export const updatePositionSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .optional()
    .messages({
      'string.min': 'Position name must be at least 3 characters.',
      'string.max': 'Position name cannot exceed 30 characters.'
    })
});
