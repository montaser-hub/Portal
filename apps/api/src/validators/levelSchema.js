import Joi from '../utils/joiExtension.js';

export const createLevelSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({
      'any.required': 'Level name is required.',
      'string.empty': 'Level name cannot be empty.',
      'string.min': 'Level name must be at least 3 characters.',
      'string.max': 'Level name cannot exceed 30 characters.'
    }),
  positionId: Joi.objectId()
    .required()
    .messages({
      'any.required': 'Position ID is required.',
      'objectId.base': 'Position ID must be a valid ObjectId.'
    })
});

export const updateLevelSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .optional()
    .messages({
      'string.min': 'Level name must be at least 3 characters.',
      'string.max': 'Level name cannot exceed 30 characters.'
    }),
  positionId: Joi.objectId()
    .optional()
    .messages({
      'objectId.base': 'Position ID must be a valid ObjectId.'
    })
});
