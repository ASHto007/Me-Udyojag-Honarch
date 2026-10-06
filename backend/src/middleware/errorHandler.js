import { config } from '../config/env.js';

/**
 * Centralized API Error Handling Middleware
 */
export function errorHandler(err, _req, res, _next) {
  let statusCode = err.statusCode || res.statusCode;
  if (!statusCode || statusCode === 200) statusCode = 500;

  let message = err.message || 'Internal Server Error';
  let errors = err.errors || undefined;

  // Handle Mongoose duplicate key error (E11000)
  if (err.code === 11000) {
    statusCode = 409;
    const duplicateKey = Object.keys(err.keyPattern || {})[0] || 'field';
    message = `A record with this ${duplicateKey} already exists for this event.`;
  }

  // Handle Mongoose ValidationError
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation failed.';
    errors = {};
    for (const key in err.errors) {
      errors[key] = err.errors[key].message;
    }
  }

  // Handle CastError (invalid ObjectId / parameter)
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid value for parameter: ${err.path}`;
  }

  if (statusCode === 500 && !config.isTest) {
    console.error('[Unhandled Error]:', err);
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(errors ? { errors } : {}),
    ...(config.isProduction ? {} : { stack: err.stack }),
  });
}

export default errorHandler;
