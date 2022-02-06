import dotenv from 'dotenv';

const envPath = __dirname + '/../../.env';

dotenv.config({ path: envPath });

export default {
  PORT: process.env.PORT || '4000',
  NODE_ENV: process.env.NODE_ENV || 'development',
  /* SECRET KEYS */
  SECRET_KEY: process.env.SECRET_KEY || '',
  ENCRYPTION_KEY: process.env.ENCRYPTION_KEY || '',
  SESSION_SECRET: process.env.SESSION_SECRET || '',
  /* DB KEYS */
  DATABASE_USER: process.env.DATABASE_USER || '',
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || '',
  DATABASE_HOST: process.env.DATABASE_HOST || '',
  DATABASE_NAME: process.env.DATABASE_NAME || '',
  DATABASE_PORT: process.env.DATABASE_PORT || '',

  /* AWS CREDS */
  ATTACHMENT_SYSTEM: process.env.ATTACHMENT_SYSTEM || '',
  AWS_S3_STORAGE_BUCKET_NAME: process.env.AWS_S3_STORAGE_BUCKET_NAME || '',
  AWS_S3_BUCKET_URL: process.env.AWS_S3_BUCKET_URL || '',
  AWS_REGION: process.env.AWS_REGION || '',
  AWS_S3_STORAGE_ACCESS_KEY_ID: process.env.AWS_S3_STORAGE_ACCESS_KEY_ID || '',
  AWS_S3_STORAGE_SECRET_ACCESS_KEY: process.env.AWS_S3_STORAGE_SECRET_ACCESS_KEY || '',
};
