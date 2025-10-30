import * as userService from '../services/userService.js'
import * as authService from '../services/authService.js'
import catchAsync from '../utils/catchAsync.js';
import { config } from '../configs/env.js';

export const login = catchAsync( async ( req, res, next ) => {
  const { email, nickname, password } = req.body;

  const { token, user } = await userService.login( email, nickname, password )

  // Set cookie
  const cookieOptions = {
    expires: new Date(
      Date.now() + config.cookieExpiresIn
    ),
    // secure: req.secure || req.headers['x-forwarded-proto'] === 'https', // only set secure cookie if the request is HTTPS
    httpOnly: true // recive the cookie and store it, send it automatically in each request
  };
  if (config.nodeEnv === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  res.status(201).json({ message: 'Your login was successfully',token, data: user });
});

export const logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  res.status(200).json({ status: 'success', message: 'Logged out!' });
};

// protect routes that require authentication
export const isAuth = catchAsync(async (req, res, next) => {
  //1) Get token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    throw new Error('You are not logged in');
  }

  //2) Verification token
  const currentUser = await authService.verifyToken(token);
  //Grant Access to protected route
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});
