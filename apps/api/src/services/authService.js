import jwt from "jsonwebtoken";
import { config } from "../configs/env.js";
import * as userService from './userService.js'
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
import path from 'path';

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
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
