import Joi from 'joi';

export const createSwapRequestSchema = Joi.object({
  fromScheduleId: Joi.string().hex().length(24).required(), 
  toScheduleId: Joi.string().hex().length(24).optional(),   
  fromUserId: Joi.string().hex().length(24).required(),     
  toUserId: Joi.string().hex().length(24).optional(),       
  message: Joi.string().max(500).optional(),                
  isActive: Joi.boolean().optional(),
  status: Joi.string()
    .valid('pending', 'approved', 'rejected', 'cancelled')
    .default('pending')
});
export const updateSwapRequestSchema = Joi.object({
  toScheduleId: Joi.string().hex().length(24).optional(),
  toUserId: Joi.string().hex().length(24).optional(),
  message: Joi.string().max(500).optional(),
  isActive: Joi.boolean().optional(),
  status: Joi.string().valid('pending', 'approved', 'rejected', 'cancelled').optional()
}).min(1);
