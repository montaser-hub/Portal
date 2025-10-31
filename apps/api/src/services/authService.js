import jwt from "jsonwebtoken";
import crypto from 'crypto';
import { config } from "../configs/env.js";
import * as userService from './userService.js'
import * as userRepo from '../dataAccess/userRepo.js'
import { promisify } from "util";

export const signToken = id => {
  return jwt.sign({ id }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn
  });
};

export const createTokenPayload = (user) => {
  const token = signToken(user._id);
  // Remove sensitive fields
  // The _doc property is a shortcut for creating a plain JavaScript object that only includes the document data — no Mongoose methods or hidden fields.
  const cleanUser = { ...user._doc };
  delete cleanUser.password;
  return { token, user: cleanUser };
};

export const verifyToken = async( token ) => {
  //2) verification token
  const decoded = await promisify( jwt.verify )( token, config.jwtSecret );
  //3) check if user still exists
  const currentUser = await userService.getUser(decoded.id);
  if (!currentUser) {
    throw new Error('User no longer exists');
  }

  //4) check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    throw new Error('User recently changed password! Please login again')
  }
  return currentUser
};

export const forgotPassword = async ( email ) => {
  // 1) Get user based on POSTed email address
  const user = await userRepo.findOne(email);
  if ( !user ) {
    throw new Error('No user found with that email');
  }
  // 2) Generate random token
  const resetToken = user.changedPasswordRestToken();
  await user.save( { validateBeforeSave: false } );
  return { user, resetToken }
}

export const cleanupResetToken = async (user) => {
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save({ validateBeforeSave: false });
};

export const resetPassword = async ( token, data ) => {console.log(data)
  if(data.password !== data.confirmPassword) {
    throw new Error('Passwords do not match');
  }
  // 1) Get user based on token
  const hashedToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  const user = await userRepo.findByToken(hashedToken);
  // 2) if token has not expired, and there is user, set the new password
  if (!user) {
    throw new Error('Token is invalid or expired');
  }
  user.password = data.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) update changedPasswordAt property for the user in user model

  // 4) log the user in, send JWT
  createTokenPayload(user);
};
