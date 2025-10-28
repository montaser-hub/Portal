import express from 'express';
import userRouter from './routes/userRoutes'


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


app.all('*', (req, res, next) => {
  const err = new Error(`Can not find ${req.originalUrl} on this srver`);
  err.statusCode = 404;
  err.status = 'fail';
  // next(new AppError(`Can not find ${req.originalUrl} on this srver`, 404));
});

// app.use(globalErrorHandler);

export default app;
