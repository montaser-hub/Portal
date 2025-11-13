import dotenv from 'dotenv';
import path from 'path';

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';

dotenv.config({
  path: path.resolve(process.cwd(), `apps/api/${envFile}`)
});

export const config = {
  productionUrl: process.env.PRODUCTION_URL,
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  dbUri: process.env.DB_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  cookieExpiresIn: Number(process.env.JWT_COOKIE_EXPIRES_IN) *
    24 *
    60 *
    60 *
    1000,
  apiKeyThirdParty: process.env.API_KEY_THIRD_PARTY,
  email: {
    from: process.env.EMAIL_FROM,
    username: process.env.EMAIL_USERNAME,
    password: process.env.EMAIL_PASS,
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 587,
    sendgridUser: process.env.SENDGRID_USERNAME,
    sendgridPass: process.env.SENDGRID_PASSWORD,
    useSendGrid:
      process.env.USE_SENDGRID === 'true' ||
      process.env.NODE_ENV === 'production',
  },
};
