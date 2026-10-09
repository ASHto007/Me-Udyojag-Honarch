import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicitly load backend/.env reliably regardless of working directory
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config();

const isTestEnv =
  process.env.NODE_ENV === 'test' ||
  process.env.NODE_TEST_CONTEXT !== undefined ||
  process.execArgv.includes('--test') ||
  process.argv.some((arg) => /test/i.test(arg));

export const config = {
  env: process.env.NODE_ENV || (isTestEnv ? 'test' : 'development'),
  isProduction: process.env.NODE_ENV === 'production',
  isTest: isTestEnv,
  port: parseInt(process.env.PORT || '5000', 10),
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/mi-udyojak-honarach',
  frontendUrl: (process.env.FRONTEND_URL || 'http://localhost:5173').replace(/\/+$/, ''),
  adminEmail: process.env.ADMIN_EMAIL || 'miudyojakhonarch@gmail.com',
  adminApiKey: process.env.ADMIN_API_KEY || '',
  emailFrom: process.env.EMAIL_FROM || '"Mi Udyojak Honarach" <miudyojakhonarch@gmail.com>',
  allowedOrigins: process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim().replace(/\/+$/, '')).filter(Boolean)
    : [],
  smtp: {
    service: (process.env.SMTP_SERVICE || '').trim().toLowerCase(),
    host: (process.env.SMTP_HOST || '').trim(),
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    user: (process.env.SMTP_USER || '').trim(),
    pass: (process.env.SMTP_PASS || '').replace(/\s+/g, ''),
  },
};

export default config;
