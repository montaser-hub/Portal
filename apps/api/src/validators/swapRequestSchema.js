import Joi from '../utils/joiExtension.js';

export const createSwapRequestSchema = Joi.object({
  fromScheduleId: Joi.objectId().required(),
  toScheduleId: Joi.objectId().optional(),
  toUserId: Joi.objectId().optional(),
  message: Joi.string().max(500).optional()
});

export const updateSwapRequestSchema = Joi.object({
  toScheduleId: Joi.objectId().optional(),
  toUserId: Joi.objectId().optional(),
  message: Joi.string().max(500).optional()
});
