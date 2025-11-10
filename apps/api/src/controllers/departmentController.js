import * as departmentService from '../services/departmentService.js';
import catchAsync from '../utils/catchAsync.js';

export const addDepartment = catchAsync(async (req, res) => {
  const department = await departmentService.createDepartment(req.body);
  return res
    .status(201)
    .json({ message: 'Department created successfully', department });
});

export const getAllDepartments = catchAsync( async ( req, res ) => {
  const query = {...req.query}
  const {data, total, totalFiltered} = await departmentService.getAllDepartments(query);
  return res.status( 200 ).json( {
    message: 'success',
    totalFiltered,
    total,
    limit: query.limit,
    page: query.page,
    data
  });
});

export const getDepartmentById = catchAsync( async ( req, res ) => {
  const department = await departmentService.getDepartment( req.params.id );
  return res.status( 200 ).json( { message: 'success', department } );
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

