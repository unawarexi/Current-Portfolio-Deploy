// ============================================================================
// Auth Middleware — verify JWT Bearer token on protected routes
// ============================================================================
import jwt from 'jsonwebtoken';
import { HttpStatus, ErrorCodes } from '../config/constants.js';

const JWT_SECRET = process.env.JWT_SECRET || 'portfolio-jwt-secret';

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(HttpStatus.UNAUTHORIZED).json({
      success: false,
      error: { code: ErrorCodes.UNAUTHORIZED, message: 'Missing or invalid Authorization header.' },
    });
  }

  const token = authHeader.split('Bearer ')[1];

  try {
    req.admin = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    const expired = err.name === 'TokenExpiredError';
    return res.status(HttpStatus.UNAUTHORIZED).json({
      success: false,
      error: {
        code:    expired ? ErrorCodes.TOKEN_EXPIRED : ErrorCodes.TOKEN_INVALID,
        message: expired ? 'Token expired. Please log in again.' : 'Invalid token.',
      },
    });
  }
};

export { authenticate, authenticate as verifyToken };
