// ============================================================================
// Auth Controller — handles POST /api/auth/login
// ============================================================================

import * as authService from './auth.service.js';
import { HttpStatus, ErrorCodes } from '../../config/constants.js';
import { createLogger } from '../../logs/logger.js';

const log = createLogger('Auth');

/**
 * POST /api/auth/login
 * Body: { username: string, password: string }
 */
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        error: { code: ErrorCodes.MISSING_FIELD, message: 'Username and password are required.' },
      });
    }

    const result = await authService.login(username, password);

    log.info(`Admin login successful: ${username}`);

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

export { login };

