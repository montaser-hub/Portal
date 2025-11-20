
import * as subDepartmentRepo from '../dataAccess/subdepartmentRepo.js';
import * as scheduleRepo from '../dataAccess/scheduleRepo.js';
import AppError from '../utils/AppError.js';
import { getAllDocuments } from './queryService.js';

export const createSubDepartment = async (subDepartmentData) => {
    return await subDepartmentRepo.create(subDepartmentData);
};

export const getAllSubDepartments = async (query) => {
    const searchableFields = ['name'];
    return await getAllDocuments(subDepartmentRepo, query, searchableFields);

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
    const scheduleCountCheck = await scheduleRepo.countFiltered({ subDepartmentId: id });
    if (scheduleCountCheck > 0) throw new AppError('sub-department has assigned schedules, cannot delete', 400);
    const subDepartment = await subDepartmentRepo.Delete(id);
    if (!subDepartment) throw new AppError('SubDepartment not found', 404);
    return subDepartment;
};
