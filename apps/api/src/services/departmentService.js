import * as departmentRepo from '../dataAccess/departmentRepo.js';
import AppError from '../utils/AppError.js';
import { getAllDepartments } from './queryService.js';

export const createDepartment = async (data) => {
  return await departmentRepo.create(data);
};

export const getAllDepartments = async ( query ) => {
  const searchableFields = ['name'];
    return await getAllDocuments( departmentRepo, queryParams, searchableFields);
};

export const getDepartment = async (id) => {
  const department = await departmentRepo.getOne(id);
  if (!department) {
    throw new AppError('Department not found', 404);
  }
  return department;
};

export const updateDepartment = async (id, data) => {
  const department = await departmentRepo.findByIdAndUpdate(id, data);
  if (!department) {
    throw new AppError('Department not found', 404);
  }
  return department;
};

export const deleteDepartment = async (id) => {
  const department = await departmentRepo.Delete(id);
  if (!department) {
    throw new AppError('Department not found', 404);
  }
  return department;
};
