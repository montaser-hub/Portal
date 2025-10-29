import express from 'express';
import * as departmentController from '../controllers/departmentController.js';

const departmentRouter = express.Router();

departmentRouter
  .route('/')
  .get(departmentController.getAllDepartments)
  .post(departmentController.addDepartment)
  .delete(departmentController.deleteAllDepartments);

departmentRouter
  .route('/:id')
  .get(departmentController.getDepartmentById)
  .patch(departmentController.updateDepartmentById)
  .delete(departmentController.deleteDepartmentById);

export default departmentRouter;
