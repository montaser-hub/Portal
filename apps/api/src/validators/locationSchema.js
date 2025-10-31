import joi from 'joi';
 export const createLocationSchema = joi.object({
  name: joi.string().min(3).max(50).required(),
  street: joi.string().min(2).max(100).optional(),
  city: joi.string().min(2).max(50).required(),
  state: joi.string().min(2).max(50).required(),
  country: joi.string().min(2).max(50).required(),
  postalCode: joi.string().pattern(/^[0-9]{5}$/).optional()
});

export const updateLocationSchema= joi.object({
    name: joi.string().min(3).max(50).optional(),
  street: joi.string().min(2).max(100).optional(),
  city: joi.string().min(2).max(50).optional(),
  state: joi.string().min(2).max(50).optional(),
  country: joi.string().min(2).max(50).optional(),
  postalCode: joi.string().pattern(/^[0-9]{5}$/).optional()
});

