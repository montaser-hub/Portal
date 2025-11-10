import express from 'express';
import * as subdepartmentController from '../controllers/subDepartmentController.js';

const departmentRouter = express.Router();

departmentRouter
  .route('/')
  .get(subdepartmentController.getAllSubDepartments)
  .post(subdepartmentController.addSubDepartment)

departmentRouter
  .route('/:id')
  .get(subdepartmentController.getSubDepartmentById)
  .patch(subdepartmentController.updateSubDepartmentById)
  .delete(subdepartmentController.deleteSubDepartmentById);

export default departmentRouter;
