import express from 'express';
import * as LevelController from '../controllers/levelController.js';
const router = express.Router();
router
  .route('/')
  .get(LevelController.getAllLevels)
  .post(LevelController.createLevel);
router
  .route('/:id')
  .get(LevelController.getLevelById)
  .patch(LevelController.updateLevelById)
  .delete(LevelController.deleteLevelById);
export default router;
