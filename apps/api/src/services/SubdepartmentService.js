
import * as subDepartmentRepo from '../dataAccess/subdepartmentRepo.js';
import AppError from '../utils/AppError.js';
export const createSubDepartment = async (subDepartmentData) => {
    const subDepartment = await subDepartmentRepo.create(subDepartmentData);
    return subDepartment;
};
export const getAllSubDepartments = async () => {
    const subDepartments = await subDepartmentRepo.getAll();
    return subDepartments;
};
export const getSubDepartmentById = async (id) => {
    const subDepartment = await subDepartmentRepo.getOne(id);
    if (!subDepartment) throw new AppError('SubDepartment not found', 404);
    return subDepartment;
};
export const updateSubDepartmentById = async (id, data) => {
    const subDepartment = await subDepartmentRepo.findByIdAndUpdate(id, data);
    if (!subDepartment) throw new AppError('SubDepartment not found', 404);
    return subDepartment;
};
export const deleteSubDepartmentById = async (id) => {
    const subDepartment = await subDepartmentRepo.Delete(id);
    if (!subDepartment) throw new AppError('SubDepartment not found', 404);
    return subDepartment;
};
export const deleteAllSubDepartments = async () => {
    await subDepartmentRepo.deleteAll();
};
