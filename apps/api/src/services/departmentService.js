import * as departmentRepo from '../dataAccess/departmentRepo.js';
import AppError from '../utils/AppError.js';

export const createDepartment = async (data) => {
  if (!data) throw new AppError('Invalid department data', 400);
  const department = await departmentRepo.create(data);
  return department;
};

export const getAllDepartments = async () => {
  const departments = await departmentRepo.getAll();
  if (!departments || departments.length === 0) {
    throw new AppError('No departments found', 404);
  }
  return departments;
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

export const deleteAllDepartments = async () => {
   await departmentRepo.deleteAll();


};
