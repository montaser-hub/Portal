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
import AppError from './utils/AppError.js';
import globalErrorHandler from './controllers/errorController.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express();

app.use( cors(
  {
    origin: ['http://localhost:4200', 'http://localhost:3001'],
    credentials: true,
  },
) );
app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({ extended: true })); // parse URL-encoded bodies

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use((req, res, next) => {
  console.log('Hello from the MIDDLEWARE ✳️:');
  next();
});

// ROUTES
app.use( '/api/v1/users', userRouter);
app.use( '/api/v1/departments', departmentRouter);
app.use( '/api/v1/subDepartments', subDepartmentRouter);
app.use( '/api/v1/locations', locationRouter);
app.use( '/api/v1/shifts', shiftRouter);
app.use( '/api/v1/schedules', scheduleRouter);
app.use('/api/v1/positions', positionRouter);
app.use('/api/v1/levels', levelRouter);
app.use( '/api/v1/swapRequests', swapRequestRouter);



app.all('*', (req, res, next) => {
next(new AppError(`Can not find ${req.originalUrl} on this srver`, 404));
});


app.use(globalErrorHandler);

export default app;
