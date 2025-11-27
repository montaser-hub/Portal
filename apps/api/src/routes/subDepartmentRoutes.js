import express from 'express';
import * as subdepartmentController from '../controllers/subDepartmentController.js';
import * as authController from '../controllers/authController.js';
import validation from '../middlewares/validation.js';
import * as subDepartmentSchema from '../validators/subdepartmentSchema.js';
const departmentRouter = express.Router();
departmentRouter.use(authController.isAuth);
departmentRouter
  .route('/')
  .get(subdepartmentController.getAllSubDepartments)
  .post(validation(subDepartmentSchema.createsubDepartmentSchema), subdepartmentController.addSubDepartment)

departmentRouter
  .route('/:id')
  .get(subdepartmentController.getSubDepartmentById)
  .patch(validation(subDepartmentSchema.updatesubDepartmentSchema), subdepartmentController.updateSubDepartmentById)
  .delete(subdepartmentController.deleteSubDepartmentById);

export default departmentRouter;
