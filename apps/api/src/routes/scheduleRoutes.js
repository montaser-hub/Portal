import express from 'express';
import * as scheduleController from '../controllers/scheduleController.js';

const router = express.Router();

router
  .route('/')
  .get(scheduleController.getAllSchedules)
  .post( scheduleController.addSchedule );


router
  .route('/:id')
  .get(scheduleController.getSchedule)
  .patch(scheduleController.updateSchedule)
  .delete(scheduleController.deleteSchedule);

export default router;
