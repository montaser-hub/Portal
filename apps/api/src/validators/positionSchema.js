import joi from 'joi';
export const createPositionSchema= joi.object({
    name: joi.string().min(3).max(30).required(),
});
export const updatePositionSchema= joi.object({
    name: joi.string().min(3).max(30).optional(),
});
export const getPositionSchema= joi.object({
    id: joi.string().hex().length(24).required(),
});
export const deletePositionSchema= joi.object({
    id: joi.string().hex().length(24).required(),
});