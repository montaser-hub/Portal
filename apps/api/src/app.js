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

const app = express();
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



app.all('*', (req, res) => {
  const err = new Error(`Can not find ${req.originalUrl} on this srver`);
  err.statusCode = 404;
  err.status = 'fail';
  // next(new AppError(`Can not find ${req.originalUrl} on this srver`, 404));
});

// app.use(globalErrorHandler);

export default app;
