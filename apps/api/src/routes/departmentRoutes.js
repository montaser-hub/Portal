import express from 'express';
import * as departmentController from '../controllers/departmentController.js';
import * as authController from '../controllers/authController.js';
const departmentRouter = express.Router();
departmentRouter.use(authController.isAuth);
departmentRouter
  .route('/')
  .get(departmentController.getAllDepartments)
  .post(departmentController.addDepartment)

departmentRouter
  .route('/:id')
  .get(departmentController.getDepartmentById)
  .patch(departmentController.updateDepartmentById)
  .delete(departmentController.deleteDepartmentById);

export default departmentRouter;
