import * as userService from '../services/userService.js'
import * as authService from '../services/authService.js'
import Email from '../integrations/emailService.js'
import catchAsync from '../utils/catchAsync.js';
import { config } from '../configs/env.js';
import AppError from '../utils/AppError.js';

/**
 * Options for the session cookie; the same ones must be used to clear it.
 * Production front ends live on another site, which needs SameSite=None and
 * Secure. Browsers reject SameSite=None without Secure, so plain-http
 * development uses Lax (localhost ports count as the same site).
 */
const sessionCookieOptions = () =>
  config.nodeEnv === 'production'
    ? { httpOnly: true, secure: true, sameSite: 'none', partitioned: true, path: '/' }
    : { httpOnly: true, sameSite: 'lax', path: '/' };

export const login = catchAsync( async ( req, res, next ) => {
  const { email, nickname, password } = req.body;

  const { token, user } = await userService.login( email, nickname, password )

  res.cookie('jwt', token, {
    ...sessionCookieOptions(),
    expires: new Date(Date.now() + config.cookieExpiresIn),
  });

  res.status(201).json({ message: 'Your login was successfully', token, data: user });
});

export const logout = (req, res) => {
  res.clearCookie('jwt', sessionCookieOptions());
  res.status(200).json({
    status: 'success',
    message: 'You have been logged out!'
  });
};

// protect routes that require authentication
export const isAuth = catchAsync(async (req, res, next) => {
  //1) Get token and check of it's there
  let token;
  if (
    req.headers?.authorization &&
    req.headers.authorization?.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies?.jwt) {
    token = req.cookies?.jwt;
  }

  if (!token) {
    return next( new AppError('You are not logged in', 401));
  }

  //2) Verification token
  const currentUser = await authService.verifyToken(token);
  //Grant Access to protected route
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

export const forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const { user, resetToken } = await authService.forgotPassword(email);
    // 3) Send it to user's email address
  const baseUrl =
    config.nodeEnv === "production"
      ? config.productionUrl
      : `http://${config.host}:${config.port}`;
   const resetUrl = `${baseUrl}/api/v1/users/resetPassword/${resetToken}`;
  try {
    await new Email( user, resetUrl ).sendPasswordReset();

    res.status( 200 ).json( {
      status: 'success',
      message: 'reset info sent to email'
    } );
  } catch ( err ) {
    console.log( err );
    // cleanup if email sending failed
    await authService.cleanupResetToken(user);
    next( new AppError( 'Error sending email. Try again later', 500 ));
  }
});

export const resetPassword = catchAsync( async ( req, res, next ) => {
  const { token } = req.params;
  const data = {...req.body};
  const resetPassword = await authService.resetPassword(token, data);
  res.status(200).json({ message: "Password reset successfully", data: resetPassword });
});
