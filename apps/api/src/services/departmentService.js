import * as departmentRepo from '../dataAccess/departmentRepo.js';

export const createDepartment = async (data) => {
  if (!data) throw new Error('Invalid department data');
  const department = await departmentRepo.create(data);
  return department;
};

export const getAllDepartments = async () => {
  const departments = await departmentRepo.getAll();
  if (!departments || departments.length === 0) {
    throw new Error('No departments found');
  }
  return departments;
};

export const getDepartment = async (id) => {
  if (!id) throw new Error('Invalid department ID');
  const department = await departmentRepo.getOne(id);
  if (!department) {
    throw new Error('Department not found');
  }
  return department;
};

export const updateDepartment = async (id, data) => {
  if (!id) throw new Error('Invalid department ID');
  const department = await departmentRepo.findByIdAndUpdate(id, data);
  if (!department) {
    throw new Error('Department not found');
  }
  return department;
};

export const deleteDepartment = async (id) => {
  if (!id) throw new Error('Invalid department ID');
  const department = await departmentRepo.Delete(id);
  if (!department) {
    throw new Error('Department not found');
  }
  return department;
};

export const deleteAllDepartments = async () => {
   await departmentRepo.deleteAll();


};
