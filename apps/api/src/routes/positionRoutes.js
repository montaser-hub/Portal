import express from 'express';
import * as positionController from '../controllers/positionController.js';
const positionRouter = express.Router();
positionRouter
  .route('/')
  .get(positionController.getpositions)
  .post(positionController.addposition);
positionRouter
  .route('/:id')
  .get(positionController.getpositionById)
  .patch(positionController.updatepositionById)
  .delete(positionController.deletepositionById);
export default positionRouter;
