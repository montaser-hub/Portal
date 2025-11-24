import express from 'express';
import * as scheduleController from '../controllers/scheduleController.js';
import * as authController from '../controllers/authController.js';

const router = express.Router();
router.use( authController.isAuth );
router.route('/nearestSchedule').get(scheduleController.getNearestSchedule)
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
