import express from 'express';
import * as scheduleController from '../controllers/scheduleController.js';
import * as authController from '../controllers/authController.js';
import validation from '../middlewares/validation.js';
import * as scheduleSchema from '../validators/ScheduleSchema.js';

const router = express.Router();
router.use( authController.isAuth );
router.route('/nearestSchedule').get(scheduleController.getNearestSchedule)
router.route('/createMultiUser').post(validation(scheduleSchema.createMultiUserScheduleSchema),scheduleController.createMultiUserSchedule)
router
  .route('/')
  .get(scheduleController.getAllSchedules)
  .post(validation(scheduleSchema.createScheduleSchema), scheduleController.addSchedule );


router
  .route('/:id')
  .get(scheduleController.getSchedule)
  .patch(validation(scheduleSchema.updateScheduleSchema), scheduleController.updateSchedule)
  .delete(scheduleController.deleteSchedule);

export default router;
