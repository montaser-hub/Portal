import joi from '../utils/joiExtension.js';

export const createsubDepartmentSchema= joi.object({
name: joi.string().min(3).max(30).required(),
departmentId: joi.objectId().required(),
subManagerId: joi.objectId().required(),
});

export const updatesubDepartmentSchema= joi.object({
    name: joi.string().min(3).max(30).optional(),
    departmentId: joi.objectId().optional(),
    subManagerId: joi.objectId().optional(),
});
