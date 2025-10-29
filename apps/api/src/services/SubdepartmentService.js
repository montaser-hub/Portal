
import * as subDepartmentRepo from '../dataAccess/subdepartmentRepo.js';
export const createSubDepartment = async (subDepartmentData) => {
    const subDepartment = await subDepartmentRepo.create(subDepartmentData);
    return subDepartment;
};  
export const getAllSubDepartments = async () => {
    const subDepartments = await subDepartmentRepo.getAll();
    return subDepartments;
};
export const getSubDepartmentById = async (id) => {
    if(!id) throw new Error('Invalid SubDepartment ID');
    const subDepartment = await subDepartmentRepo.getOne(id);
    if (!subDepartment) throw new Error('SubDepartment not found');
    return subDepartment;
};
export const updateSubDepartmentById = async (id, data) => {
    if(!id) throw new Error('Invalid SubDepartment ID');
    const subDepartment = await subDepartmentRepo.findByIdAndUpdate(id, data);
    if (!subDepartment) throw new Error('SubDepartment not found');
    return subDepartment;
};
export const deleteSubDepartmentById = async (id) => {
    if(!id) throw new Error('Invalid SubDepartment ID');
    const subDepartment = await subDepartmentRepo.findByIdAndDelete(id);
    if (!subDepartment) throw new Error('SubDepartment not found');
    return subDepartment;
};
export const deleteAllSubDepartments = async () => {
    await subDepartmentRepo.deleteAll();
};
