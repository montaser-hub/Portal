import express from 'express';
import * as swapRequestController from '../controllers/swapRequestController.js';
import * as authController from '../controllers/authController.js';

const swapRequestRouter = express.Router();
swapRequestRouter.use(authController.isAuth);

swapRequestRouter
  .route('/')
  .get(swapRequestController.getSwapRequests)
  .post(swapRequestController.addSwapRequest)

swapRequestRouter
  .route('/:id')
  .get(swapRequestController.getSwapRequest)
  .patch(swapRequestController.updateSwapRequest)
  .delete(swapRequestController.deleteSwapRequest);


export default swapRequestRouter
