// ============================================================================
// Portfolio Backend — Application Constants
// ============================================================================

const HttpStatus = {
  OK:                    200,
  CREATED:               201,
  NO_CONTENT:            204,
  BAD_REQUEST:           400,
  UNAUTHORIZED:          401,
  FORBIDDEN:             403,
  NOT_FOUND:             404,
  CONFLICT:              409,
  TOO_MANY_REQUESTS:     429,
  INTERNAL_SERVER_ERROR: 500,
};

const ErrorCodes = {
  UNAUTHORIZED:        'E1001',
  TOKEN_INVALID:       'E1002',
  TOKEN_EXPIRED:       'E1004',
  VALIDATION_ERROR:    'E2001',
  MISSING_FIELD:       'E2003',
  FILE_TOO_LARGE:      'E2004',
  UNSUPPORTED_FILE:    'E2005',
  NOT_FOUND:           'E3001',
  RATE_LIMIT_EXCEEDED: 'E8001',
  INTERNAL_ERROR:      'E9001',
};

const RateLimits = {
  API:    { windowMs: 15 * 60 * 1000, max: 300 },
  AUTH:   { windowMs: 15 * 60 * 1000, max: 20  },
  UPLOAD: { windowMs: 60  * 1000,     max: 20  },
};

const Upload = {
  MAX_FILE_SIZE:     10 * 1024 * 1024,
  MAX_FILES:         10,
  ALLOWED_MIMETYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
};

export { HttpStatus, ErrorCodes, RateLimits, Upload };
