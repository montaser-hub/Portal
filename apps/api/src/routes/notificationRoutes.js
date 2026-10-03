import express from 'express';
import cors from 'cors';
import * as notificationController from '../controllers/notificationController.js';
import * as authController from '../controllers/authController.js';
import { config } from '../configs/env.js';

const router = express.Router();

router.use(authController.isAuth);

const sseCorsOptions = {
  origin: config.allowedOrigins,
  credentials: true
};


router.get( '/', notificationController.getUserNotifications )
router.options('/sse', cors(sseCorsOptions));
router.get('/sse', cors(sseCorsOptions), notificationController.sseStream);

router.get('/allAsRead', notificationController.markAllAsRead)


export default router;
