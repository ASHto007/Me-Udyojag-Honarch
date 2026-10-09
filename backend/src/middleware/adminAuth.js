import { config } from '../config/env.js';

/**
 * Authentication middleware for internal administrative endpoints.
 * Validates 'x-admin-key' or 'Authorization: Bearer <ADMIN_API_KEY>' header.
 */
export function requireAdminAuth(req, res, next) {
  // In automated test runs without an explicit key requirement, allow test queries
  if (config.isTest && !config.adminApiKey) {
    return next();
  }

  const configuredKey = config.adminApiKey;

  // In production, enforce key presence strictly
  if (!configuredKey) {
    if (config.isProduction) {
      return res.status(503).json({
        success: false,
        message: 'Administrative access is currently unconfigured. Set ADMIN_API_KEY in environment.',
      });
    }
    // In local development, warn but permit access for convenience if key not yet set
    return next();
  }

  const authHeader = req.headers.authorization;
  const adminKeyHeader = req.headers['x-admin-key'];

  let providedKey = '';
  if (adminKeyHeader) {
    providedKey = String(adminKeyHeader).trim();
  } else if (authHeader && authHeader.startsWith('Bearer ')) {
    providedKey = authHeader.substring(7).trim();
  }

  if (!providedKey || providedKey !== configuredKey) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Invalid or missing administrator credentials.',
    });
  }

  next();
}

export default requireAdminAuth;
