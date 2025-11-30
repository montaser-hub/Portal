import path from 'path';
import express from 'express';
import userRouter from './routes/userRoutes'
import locationRouter from './routes/locationRoutes'
import shiftRouter from './routes/shiftRoutes.js'
import scheduleRouter from './routes/scheduleRoutes.js'
import positionRouter from './routes/positionRoutes.js';
import levelRouter from "./routes/levelRouter.js";
import departmentRouter from './routes/departmentRoutes'
import subDepartmentRouter from './routes/subDepartmentRoutes'
import swapRequestRouter from './routes/swapRequestRoutes'
import assistantRouter from './routes/assistantRoutes'
import notificationRouter from './routes/notificationRoutes'
import AppError from './utils/AppError.js';
import globalErrorHandler from './controllers/errorController.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express();
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = ['http://localhost:3001', 'http://localhost:4200','https://portal-pvwr.onrender.com'];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: "Content-Type",
}));
app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({ extended: true })); // parse URL-encoded bodies

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use((req, res, next) => {
  console.log('Hello from the MIDDLEWARE ✳️:');
  next();
});

// ROUTES
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Portal SmartShift API is running',
    version: '1.0.0',
    time: new Date().toISOString(),
    endpoints: {
      login: '/api/v1/users/login',
      docs: '/api-docs'
    }
  });
});
app.use( '/api/v1/users', userRouter);
app.use( '/api/v1/departments', departmentRouter);
app.use( '/api/v1/subDepartments', subDepartmentRouter);
app.use( '/api/v1/locations', locationRouter);
app.use( '/api/v1/shifts', shiftRouter);
app.use( '/api/v1/schedules', scheduleRouter);
app.use('/api/v1/positions', positionRouter);
app.use('/api/v1/levels', levelRouter);
app.use('/api/v1/swapRequests', swapRequestRouter);
app.use('/api/v1/assistant', assistantRouter);
app.use('/api/v1/notifications', notificationRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can not find ${req.originalUrl} on this srver`, 404));
});


app.use(globalErrorHandler);

export default app;
