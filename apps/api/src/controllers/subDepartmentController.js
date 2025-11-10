import * as subDepartmentService from '../services/SubdepartmentService.js';
import catchAsync from '../utils/catchAsync';

export const addSubDepartment = catchAsync(async (req, res) => {
  const subDepartmentData = req.body;
  const subDepartment = await subDepartmentService.createSubDepartment(subDepartmentData);
  return res
    .status(201)
    .json({ message: 'SubDepartment created successfully', subDepartment });
});

export const getAllSubDepartments = catchAsync( async ( req, res ) => {
  const query = {...req.query}
  const {data, total, totalFiltered} = await subDepartmentService.getAllSubDepartments(query);
  return res
    .status(200)
    .json( {
      message: 'SubDepartments retrieved successfully',
      totalFiltered,
      total,
      limit: query.limit,
      page: query.page,
      data
    });
});

export const getSubDepartmentById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const subDepartment = await subDepartmentService.getSubDepartmentById(id);
  return res
      .status(200)
      .json({ message: 'SubDepartment retrieved successfully', subDepartment });
});

export const updateSubDepartmentById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const subDepartment = await subDepartmentService.updateSubDepartmentById(id, updateData);
  return res
      .status(200)
      .json({ message: 'SubDepartment updated successfully', subDepartment });
});

export const deleteSubDepartmentById = catchAsync(async (req, res) => {
  const { id } = req.params;
  await subDepartmentService.deleteSubDepartmentById(id);
  return res
      .status(200)
      .json({ message: 'SubDepartment deleted successfully' });
});
