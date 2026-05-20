// ============================================================================
// Auth Service — single-admin password authentication + JWT issuance
// ============================================================================
const jwt = require('jsonwebtoken');

const JWT_SECRET  = process.env.JWT_SECRET  || 'portfolio-jwt-secret';
const JWT_EXPIRES = process.env.JWT_EXPIRES || '8h';

/**
 * Validate the submitted password against APP_PASSWORD env var.
 * Returns a signed JWT on success, throws on failure.
 * @param {string} password
 * @returns {{ token: string, expiresIn: string }}
 */
const login = (password) => {
  const appPassword = process.env.APP_PASSWORD;

  if (!appPassword) {
    throw new Error('APP_PASSWORD is not configured on the server.');
  }

  if (password !== appPassword) {
    const err = new Error('Invalid password.');
    err.statusCode = 401;
    throw err;
  }

  const payload = { role: 'admin' };
  const token   = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });

  return { token, expiresIn: JWT_EXPIRES };
};

/**
 * Decode & verify a token — returns payload or throws.
 * @param {string} token
 */
const verifyToken = (token) => jwt.verify(token, JWT_SECRET);

module.exports = { login, verifyToken };
