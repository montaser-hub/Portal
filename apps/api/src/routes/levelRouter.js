import express from 'express';
import * as LevelController from '../controllers/levelController.js';
import * as authController from '../controllers/authController.js';
import validation from '../middlewares/validation.js';
import * as levelSchema from '../validators/levelSchema.js';
const router = express.Router();
router.use(authController.isAuth);
router
  .route('/')
  .get(LevelController.getAllLevels)
  .post(validation(levelSchema.createLevelSchema), LevelController.createLevel);
router
  .route('/:id')
  .get(LevelController.getLevelById)
  .patch(validation(levelSchema.updateLevelSchema), LevelController.updateLevelById)
  .delete(LevelController.deleteLevelById);
export default router;
