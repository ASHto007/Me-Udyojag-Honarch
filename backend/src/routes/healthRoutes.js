import { Router } from 'express';
import mongoose from 'mongoose';

const router = Router();

const DB_STATES = {
  0: 'disconnected',
  1: 'connected',
  2: 'connecting',
  3: 'disconnecting',
};

/**
 * GET /api/health
 * Comprehensive readiness and health check.
 * Returns 200 if database is connected, 503 if disconnected.
 */
router.get('/', (_req, res) => {
  const dbStatus = mongoose.connection.readyState;
  const isDbConnected = dbStatus === 1;

  const payload = {
    status: isDbConnected ? 'ok' : 'degraded',
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()),
    database: {
      status: DB_STATES[dbStatus] || 'unknown',
      connected: isDbConnected,
    },
    system: {
      nodeVersion: process.version,
      memoryUsageMb: Math.round(process.memoryUsage().rss / 1024 / 1024),
    },
  };

  const statusCode = isDbConnected ? 200 : 503;
  return res.status(statusCode).json(payload);
});

/**
 * GET /api/health/live
 * Lightweight liveness probe for container orchestrators (Kubernetes / Docker)
 */
router.get('/live', (_req, res) => {
  res.status(200).json({ status: 'alive', uptime: process.uptime() });
});

/**
 * GET /api/health/ready
 * Readiness probe for traffic routing
 */
router.get('/ready', (_req, res) => {
  const isDbConnected = mongoose.connection.readyState === 1;
  res.status(isDbConnected ? 200 : 503).json({
    ready: isDbConnected,
    database: DB_STATES[mongoose.connection.readyState] || 'unknown',
  });
});

export default router;
