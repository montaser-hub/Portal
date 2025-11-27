import express from 'express';
import * as swapRequestController from '../controllers/swapRequestController.js';
import * as authController from '../controllers/authController.js';
import validation from '../middlewares/validation.js';
import * as swapRequestSchema from '../validators/swapRequestSchema.js';
const swapRequestRouter = express.Router();
swapRequestRouter.use(authController.isAuth);

swapRequestRouter.route('/isAproved/:id').patch(swapRequestController.IsApproved);
swapRequestRouter
  .route('/')
  .get(swapRequestController.getSwapRequests)
  .post(validation(swapRequestSchema.createSwapRequestSchema), swapRequestController.addSwapRequest)

swapRequestRouter
  .route('/:id')
  .get(swapRequestController.getSwapRequest)
  .patch(validation(swapRequestSchema.updateSwapRequestSchema), swapRequestController.updateSwapRequest)
  .delete(swapRequestController.deleteSwapRequest);


export default swapRequestRouter
