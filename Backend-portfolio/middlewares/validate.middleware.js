// ============================================================================
// Validate Middleware — lightweight required-field guard
// ============================================================================
import { HttpStatus, ErrorCodes } from '../config/constants.js';

/**
 * Check that all listed fields are present (non-empty) in req.body.
 * @param {string[]} fields
 */
const requireFields = (fields) => (req, res, next) => {
  const missing = fields.filter(
    (f) => req.body[f] === undefined || req.body[f] === null || req.body[f] === ''
  );

  if (missing.length) {
    return res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      error: {
        code:    ErrorCodes.MISSING_FIELD,
        message: `Missing required fields: ${missing.join(', ')}`,
      },
    });
  }
  next();
};

/**
 * Generic Zod schema validator middleware
 */
const validateBody = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      error: {
        code:    ErrorCodes.VALIDATION_ERROR,
        details: result.error.flatten().fieldErrors,
      },
    });
  }
  req.validated = result.data;  // Controllers read from req.validated
  next();
};

export { requireFields, validateBody };
