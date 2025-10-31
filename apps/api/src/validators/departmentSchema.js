 import joi from 'joi';
 export const createDepartmentSchema= joi.object({
    name: joi.string().min(3).max(30).required(),
  managerId: joi.string().hex().length(24).optional(),
  locationId: joi.string().hex().length(24).optional(),

});
export const updateDepartmentSchema= joi.object({
    name: joi.string().min(3).max(30).optional(),
    managerId: joi.string().hex().length(24).optional(),
    locationId: joi.string().hex().length(24).optional(),

});
 export const getDepartmentSchema= joi.object({
    id: joi.string().hex().length(24).required(),
});

export const deleteDepartmentSchema= joi.object({
    id: joi.string().hex().length(24).required(),
});