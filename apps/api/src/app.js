import express from 'express';
import userRouter from './routes/userRoutes.js'
import shiftRouter from './routes/shiftRoutes.js'
import scheduleRouter from './routes/scheduleRoutes.js'
import positionRouter from './routes/positionRoutes.js';
import levelRouter from "./routes/levelRouter.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // parse URL-encoded bodies

app.use((req, res, next) => {
  console.log('Hello from the MIDDLEWARE ✳️:');
  next();
});

// ROUTES
app.use('/api/v1/users', userRouter);

app.use( '/api/v1/shifts', shiftRouter);
app.use( '/api/v1/schedules', scheduleRouter);

app.use('/api/v1/positions', positionRouter);
app.use('/api/v1/levels', levelRouter);


app.all('*', (req, res, next) => {
  const err = new Error(`Can not find ${req.originalUrl} on this srver`);
  err.statusCode = 404;
  err.status = 'fail';
  // next(new AppError(`Can not find ${req.originalUrl} on this srver`, 404));
});

// app.use(globalErrorHandler);

export default app;
