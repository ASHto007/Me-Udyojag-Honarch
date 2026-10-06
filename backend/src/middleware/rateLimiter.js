import rateLimit from 'express-rate-limit';

/**
 * General submission rate limiter (15 requests per 15 minutes per IP).
 */
export const submissionRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP address. Please try again in 15 minutes.',
  },
  skip: () => process.env.NODE_ENV === 'test',
});

/**
 * Global API rate limiter (100 requests per 15 minutes).
 */
export const globalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => process.env.NODE_ENV === 'test',
});

export default { submissionRateLimiter, globalRateLimiter };
