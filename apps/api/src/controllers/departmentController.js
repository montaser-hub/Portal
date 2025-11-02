import * as departmentService from '../services/departmentService.js';
import catchAsync from '../utils/catchAsync.js';

export const addDepartment = catchAsync(async (req, res) => {
  const department = await departmentService.createDepartment(req.body);
  return res
    .status(201)
    .json({ message: 'Department created successfully', department });
});
export const getAllDepartments = catchAsync(async (req, res) => {
  const departments = await departmentService.getAllDepartments();
  return res.status(200).json({ message: 'success', departments });
});
export const getDepartmentById = catchAsync(async (req, res) => {
  const department = await departmentService.getDepartment(req.params.id);
  return res.status(200).json({ message: 'success', department });
});
export const updateDepartmentById = catchAsync(async (req, res) => {
  const department = await departmentService.updateDepartment(
    req.params.id,
    req.body
  );
  return res
    .status(200)
    .json({ message: 'Department updated successfully', department });
});
export const deleteDepartmentById = catchAsync(async (req, res) => {
  const deletedDepartment = await departmentService.deleteDepartment(
    req.params.id
  );
  return res
    .status(202)
    .json({ message: 'Department deleted successfully', deletedDepartment });
});
export const deleteAllDepartments = catchAsync(async (req, res) => {
  await departmentService.deleteAllDepartments();
  return res
    .status(202)
    .json({ message: 'All departments deleted successfully' });
});
