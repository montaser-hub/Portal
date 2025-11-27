import * as departmentRepo from '../dataAccess/departmentRepo.js';
import * as subDepartmentRepo from '../dataAccess/subdepartmentRepo.js';
import AppError from '../utils/AppError.js';
import { getAllDocuments } from './queryService.js';

export const createDepartment = async (data) => {
  return await departmentRepo.create(data);
};

export const getAllDepartments = async (query) => {
  const searchableFields = ['name'];
  return await getAllDocuments(departmentRepo, query, searchableFields);
};

export const getDepartment = async (id) => {
  const department = await departmentRepo.getOne(id);
  if (!department) {
    throw new AppError('Department not found', 404);
  }
  return department;
};

export const updateDepartment = async (id, data) => {
  const department = await departmentRepo.update(id, data);
  if (!department) {
    throw new AppError('Department not found', 404);
  }
  return department;
};

export const deleteDepartment = async (id) => {
  const subCountCheck = await subDepartmentRepo.countFiltered({ departmentId: id });
  if (subCountCheck > 0) throw new AppError('department has assigned sub-departments, cannot delete', 400);
  const department = await departmentRepo.Delete(id);
  if (!department) throw new AppError('Department not found', 404);
  return department;
};
