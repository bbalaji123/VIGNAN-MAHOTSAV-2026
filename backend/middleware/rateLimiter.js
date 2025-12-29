import rateLimit from 'express-rate-limit';

// Basic rate limiter for all routes
const createRateLimiter = (windowMs = 60000, max = 100, message = 'Too many requests') => {
  return rateLimit({
    windowMs,
    max,
    message: { error: message },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      res.status(429).json({
        error: message,
        retryAfter: Math.round(windowMs / 1000)
      });
    }
  });
};

// Strict rate limiter for registration/login
const authLimiter = createRateLimiter(
  15 * 60 * 1000, // 15 minutes
  5, // max 5 attempts per window
  'Too many authentication attempts, please try again later'
);

// General API rate limiter
const generalLimiter = createRateLimiter(
  60 * 1000, // 1 minute
  1000,
  'Too many requests, please slow down'
);

// Strict limiter for sensitive operations
const strictLimiter = createRateLimiter(
  60 * 1000, // 1 minute
  10, // max 10 requests per window
  'Rate limit exceeded for sensitive operations'
);

export {
  authLimiter,
  generalLimiter,
  strictLimiter,
  createRateLimiter
};