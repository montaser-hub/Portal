import express from 'express';
import * as shiftController from '../controllers/shiftController.js';
import * as authController from '../controllers/authController.js';
import validation from '../middlewares/validation.js';
import * as shiftSchema from '../validators/ShiftSchema.js';

const router = express.Router();

router.use(authController.isAuth);
router
  .route('/')
  .get(shiftController.getAllShifts)
  .post(validation(shiftSchema.createShiftSchema), shiftController.addShift);

router
  .route('/:id')
  .get(shiftController.getShift)
  .patch(validation(shiftSchema.updateShiftSchema), shiftController.updateShift)
  .delete(shiftController.deleteShift);

export default router;
