import express from 'express';
import * as userController from '../controllers/userController.js';
import * as authController from '../controllers/authController.js';

const router = express.Router();

router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
//protect all routes after this middleware
router.use(authController.isAuth);

router.patch('/updateMyPassword', userController.updateMyPassword);
router.get('/me', userController.myProfile);
router.patch(
  '/updateMe',
  authController.isAuth,
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
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
  .patch(
    userController.uploadUserPhoto,
    userController.resizeUserPhoto,
    userController.updateUser
  )
  .delete(userController.deleteUser);

export default router;
