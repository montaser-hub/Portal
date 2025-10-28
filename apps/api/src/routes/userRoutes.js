import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

// router.post('/login', authController.login);
// router.get('/logout', authController.logout);

// router.post('/forgotPassword', authController.forgotPassword);
// //protect all routes after this middleware

// router.patch('/updateMyPassword', authController.updateMyPassword);
router.get('/me', userController.myProfile);
router.patch(
  '/updateMe',
  // userController.uploadUserPhoto,
  // userController.resizeUserPhoto,
  userController.updateMyProfile
);
// Used to protected routes and accessed only by admin, manager role

router
  .route('/')
  .get(userController.getUsers)
  .post(userController.addUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

export default router;
