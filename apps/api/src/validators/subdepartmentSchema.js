import joi from 'joi';
 export const createsubDepartmentSchema= joi.object({
    name: joi.string().min(3).max(30).required(),
  departmentId: joi.string().hex().length(24).required(),
  subManagerId: joi.string().hex().length(24).required(),
});
export const updatesubDepartmentSchema= joi.object({
    name: joi.string().min(3).max(30).optional(),
    departmentId: joi.string().hex().length(24).optional(),
    subManagerId: joi.string().hex().length(24).optional(),
});
    