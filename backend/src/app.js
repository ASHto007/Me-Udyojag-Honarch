import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { config } from './config/env.js';
import { notFound } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';
import { globalRateLimiter } from './middleware/rateLimiter.js';
import healthRoutes from './routes/healthRoutes.js';
import swaggerUi from 'swagger-ui-express';
import enquiryRoutes from './routes/enquiryRoutes.js';
import eventRegistrationRoutes from './routes/eventRegistrationRoutes.js';
import { swaggerSpec, swaggerUiOptions } from './config/swagger.js';

export const app = express();

// Trust reverse proxy (essential for Vercel, Render, Railway, AWS, Nginx rate-limiting)
app.set('trust proxy', 1);

// Security HTTP headers (CSP disabled so Swagger UI can load static assets cleanly)
app.use(helmet({ contentSecurityPolicy: false }));

// Gzip/Brotli response compression
app.use(compression());

// Cross-Origin Resource Sharing
const staticAllowedOrigins = [
  'https://www.miudyojakhonarach.com',
  'https://miudyojakhonarach.com',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://localhost:5000',
];

const dynamicOrigins = [
  config.frontendUrl,
  config.frontendUrl?.replace('://', '://www.'),
  config.frontendUrl?.replace('://www.', '://'),
  ...(config.allowedOrigins || []),
];

const allowedOrigins = Array.from(new Set([...staticAllowedOrigins, ...dynamicOrigins])).filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.includes(origin) ||
        origin.endsWith('.vercel.app') ||
        origin.endsWith('.netlify.app') ||
        origin.endsWith('.onrender.com') ||
        origin.includes('miudyojakhonarach.com')
      ) {
        return callback(null, true);
      }
      return callback(new Error(`CORS policy: origin ${origin} is not allowed`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-key'],
  })
);

// Body parsing with safe size limit
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

// Global rate limiting
app.use('/api', globalRateLimiter);

// Swagger UI & OpenAPI Specification
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));
app.get('/api/docs.json', (_req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// API Route mounts (primary /api/* plus root /* fallback aliases for resilient client requests)
app.use('/api/health', healthRoutes);
app.use('/health', healthRoutes);

app.use('/api/enquiries', enquiryRoutes);
app.use('/enquiries', enquiryRoutes);

app.use('/api/event-registrations', eventRegistrationRoutes);
app.use('/event-registrations', eventRegistrationRoutes);

// Root informational endpoint
app.get('/', (_req, res) => {
  res.json({
    name: 'Mi Udyojak Honarach REST API',
    status: 'running',
    version: '1.0.0',
    documentation: '/api/docs',
    spec: '/api/docs.json',
    health: '/api/health',
  });
});

// 404 handler
app.use(notFound);

// Central error handler
app.use(errorHandler);

export default app;
