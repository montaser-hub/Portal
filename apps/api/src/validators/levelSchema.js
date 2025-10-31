import joi from 'joi';
export const createLevelSchema = joi.object({
  name: joi.string().min(3).max(30).required(),
  positionId: joi.string().hex().length(24).required(),
});
export const updateLevelSchema = joi.object({
  name: joi.string().min(3).max(30).optional(),
  positionId: joi.string().hex().length(24).optional(),
});

