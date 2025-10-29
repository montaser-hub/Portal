import express from 'express';
import userRouter from './routes/userRoutes'
import departmentRouter from './routes/departmentRoutes'
import subDepartmentRouter from './routes/subDepartmentRoutes'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // parse URL-encoded bodies
console.log(process.env.NODE_ENV);

app.use((req, res, next) => {
  console.log('Hello from the MIDDLEWARE ✳️:');
  next();
});

// ROUTES
app.use( '/api/v1/users', userRouter);
app.use( '/api/v1/departments', departmentRouter);
app.use( '/api/v1/subDepartments', subDepartmentRouter);


app.all('*', (req, res) => {
  const err = new Error(`Can not find ${req.originalUrl} on this srver`);
  err.statusCode = 404;
  err.status = 'fail';
  // next(new AppError(`Can not find ${req.originalUrl} on this srver`, 404));
});

// app.use(globalErrorHandler);

export default app;
