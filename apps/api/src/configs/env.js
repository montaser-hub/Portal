import dotenv from 'dotenv';
import path from 'path';

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';

dotenv.config({
  path: path.resolve(process.cwd(), `apps/api/${envFile}`)
});

export const config = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  dbUri: process.env.DB_URI,
  jwtSecret: process.env.JWT_SECRET,
  apiKeyThirdParty: process.env.API_KEY_THIRD_PARTY
};
