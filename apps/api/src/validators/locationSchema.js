import Joi from '../utils/joiExtension.js';

const postalCodePattern = /^[0-9]{5}$/;

export const createLocationSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
      'any.required': 'Name is required.',
      'string.empty': 'Name cannot be empty.',
      'string.min': 'Name must be at least 3 characters.',
      'string.max': 'Name cannot exceed 50 characters.'
    }),
  street: Joi.string()
    .min(2)
    .max(100)
    .optional()
    .allow('')
    .messages({
      'string.min': 'Street must be at least 2 characters.',
      'string.max': 'Street cannot exceed 100 characters.'
    }),
  city: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      'any.required': 'City is required.',
      'string.min': 'City must be at least 2 characters.',
      'string.max': 'City cannot exceed 50 characters.'
    }),
  state: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      'any.required': 'State is required.',
      'string.min': 'State must be at least 2 characters.',
      'string.max': 'State cannot exceed 50 characters.'
    }),
  country: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      'any.required': 'Country is required.',
      'string.min': 'Country must be at least 2 characters.',
      'string.max': 'Country cannot exceed 50 characters.'
    }),
  postalCode: Joi.string()
    .pattern(postalCodePattern)
    .optional()
    .allow('')
    .messages({
      'string.pattern.base': 'Postal code must be 5 digits.'
    })
});

export const updateLocationSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(50)
    .optional()
    .messages({
      'string.min': 'Name must be at least 3 characters.',
      'string.max': 'Name cannot exceed 50 characters.'
    }),
  street: Joi.string()
    .min(2)
    .max(100)
    .optional()
    .allow('')
    .messages({
      'string.min': 'Street must be at least 2 characters.',
      'string.max': 'Street cannot exceed 100 characters.'
    }),
  city: Joi.string()
    .min(2)
    .max(50)
    .optional()
    .messages({
      'string.min': 'City must be at least 2 characters.',
      'string.max': 'City cannot exceed 50 characters.'
    }),
  state: Joi.string()
    .min(2)
    .max(50)
    .optional()
    .messages({
      'string.min': 'State must be at least 2 characters.',
      'string.max': 'State cannot exceed 50 characters.'
    }),
  country: Joi.string()
    .min(2)
    .max(50)
    .optional()
    .messages({
      'string.min': 'Country must be at least 2 characters.',
      'string.max': 'Country cannot exceed 50 characters.'
    }),
  postalCode: Joi.string()
    .pattern(postalCodePattern)
    .optional()
    .allow('')
    .messages({
      'string.pattern.base': 'Postal code must be 5 digits.'
    })
});
