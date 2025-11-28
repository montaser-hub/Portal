const express = require('express');
const notificationController = require('../controllers/notificationController');
const authController = require('../controllers/authController');
const router = express.Router();
import cors from 'cors';

router.use(authController.isAuth);

const sseCorsOptions = {
  origin: ['http://localhost:3001', 'http://localhost:4200', 'https://tangerine-cuchufli-e07247.netlify.app'],
  credentials: true
};


router.get( '/', notificationController.getUserNotifications )
router.options('/sse', cors(sseCorsOptions));
router.get('/sse', cors(sseCorsOptions), notificationController.sseStream);

router.get('/allAsRead', notificationController.markAllAsRead)


export default router;
