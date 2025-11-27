import express from 'express';
import * as departmentController from '../controllers/departmentController.js';
import * as authController from '../controllers/authController.js';
import * as validation from '../middlewares/validation.js';
import * as departmentSchema from '../validators/departmentSchema.js';
const departmentRouter = express.Router();
departmentRouter.use(authController.isAuth);
departmentRouter
  .route('/')
  .get(departmentController.getAllDepartments)
  .post(validation(departmentSchema.createDepartmentSchema), departmentController.addDepartment)

departmentRouter
  .route('/:id')
  .get(departmentController.getDepartmentById)
  .patch(validation(departmentSchema.updateDepartmentSchema), departmentController.updateDepartmentById)
  .delete(departmentController.deleteDepartmentById);

export default departmentRouter;
