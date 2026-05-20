// ============================================================================
// Rate Limit Middleware — express-rate-limit presets (no Redis needed)
// ============================================================================
const rateLimit = require('express-rate-limit');
const { HttpStatus, ErrorCodes, RateLimits } = require('../config/constants');

function createRateLimiter({ windowMs, max, message }) {
  return rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders:   false,
    skip: () => process.env.NODE_ENV === 'test',
    handler: (_req, res) => {
      res.status(HttpStatus.TOO_MANY_REQUESTS).json({
        success: false,
        error: {
          code:    ErrorCodes.RATE_LIMIT_EXCEEDED,
          message: message || 'Too many requests — please try again later.',
        },
      });
    },
  });
}

const apiLimiter  = createRateLimiter({ ...RateLimits.API,    message: 'Too many API requests.'           });
const authLimiter = createRateLimiter({ ...RateLimits.AUTH,   message: 'Too many login attempts.'         });
const uploadLimiter = createRateLimiter({ ...RateLimits.UPLOAD, message: 'Too many upload requests.'     });

module.exports = { createRateLimiter, apiLimiter, authLimiter, uploadLimiter };
