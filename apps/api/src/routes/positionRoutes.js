import express from 'express';
import * as positionController from '../controllers/positionController.js';
import * as authController from '../controllers/authController.js';
import validation from '../middlewares/validation.js';
import * as positionSchema from '../validators/positionSchema.js';
const positionRouter = express.Router();

positionRouter.use(authController.isAuth);
positionRouter
  .route('/')
  .get(positionController.getpositions)
  .post(validation(positionSchema.createPositionSchema), positionController.addposition);
positionRouter
  .route('/:id')
  .get(positionController.getpositionById)
  .patch(validation(positionSchema.updatePositionSchema), positionController.updatepositionById)
  .delete(positionController.deletepositionById);
export default positionRouter;
