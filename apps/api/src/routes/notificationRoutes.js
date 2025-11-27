const express = require('express');
const notificationController = require('../controllers/notificationController');
const authController = require('../controllers/authController');
const router = express.Router();

router.use(authController.isAuth);
router.get('/sse', notificationController.getUserNotifications)

router.get('/allAsRead', notificationController.markAllAsRead)


export default router;
