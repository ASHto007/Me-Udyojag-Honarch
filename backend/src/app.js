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
  'http://www.miudyojakhonarach.com',
  'http://miudyojakhonarach.com',
];

const dynamicOrigins = [
  config.frontendUrl,
  config.frontendUrl?.replace('://', '://www.'),
  config.frontendUrl?.replace('://www.', '://'),
  ...(config.allowedOrigins || []),
];

const allowedOrigins = Array.from(new Set([...staticAllowedOrigins, ...dynamicOrigins])).filter(Boolean);

const isOriginAllowed = (origin) => {
  if (!origin) return true; // Server-to-server, curl, Postman, mobile apps

  // Direct origin list match
  if (allowedOrigins.includes(origin)) return true;

  // Localhost (any port: 5173, 5174, 3000, 4173 preview, etc.)
  if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) return true;

  // Production & preview cloud hosts
  if (
    origin.endsWith('.vercel.app') ||
    origin.endsWith('.netlify.app') ||
    origin.endsWith('.onrender.com') ||
    origin.endsWith('.koyeb.app') ||
    origin.endsWith('.railway.app') ||
    origin.includes('miudyojakhonarach.com')
  ) {
    return true;
  }

  return false;
};

const corsOptions = {
  origin: (origin, callback) => {
    if (isOriginAllowed(origin)) {
      return callback(null, true);
    }
    console.warn(`[CORS Blocked]: Origin "${origin}" rejected by policy.`);
    return callback(new Error(`CORS policy: origin ${origin} is not allowed`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'x-admin-key',
    'Accept',
    'X-Requested-With',
    'Cache-Control',
    'Pragma',
  ],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 86400, // 24-hour preflight cache for instant subsequent requests
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

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
