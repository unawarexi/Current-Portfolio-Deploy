// ============================================================================
// Auth Controller — handles POST /api/auth/login
// ============================================================================
'use strict';

const authService                = require('./auth.service');
const { HttpStatus, ErrorCodes } = require('../../config/constants');
const { createLogger }           = require('../../logs/logger');

const log = createLogger('Auth');

/**
 * POST /api/auth/login
 * Body: { password: string }
 */
const login = (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        error: { code: ErrorCodes.MISSING_FIELD, message: 'Password is required.' },
      });
    }

    const result = authService.login(password);

    log.info('Admin login successful');

    return res.status(HttpStatus.OK).json({
      success: true,
      data: result,
    });
  } catch (err) {
    if (err.statusCode === 401) {
      log.warn('Failed login attempt');
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        error: { code: ErrorCodes.UNAUTHORIZED, message: err.message },
      });
    }

    log.error('Login error', { error: err });
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: { code: ErrorCodes.INTERNAL_ERROR, message: 'Server error.' },
    });
  }
};

module.exports = { login };
