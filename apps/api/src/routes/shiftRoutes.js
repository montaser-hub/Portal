import express from 'express';
import * as shiftController from '../controllers/shiftController.js';

const router = express.Router();

router
  .route('/')
  .get(shiftController.getAllShifts)
  .post(shiftController.addShift);

router
  .route('/:id')
  .get(shiftController.getShift)
  .patch(shiftController.updateShift)
  .delete(shiftController.deleteShift);
  
export default router;