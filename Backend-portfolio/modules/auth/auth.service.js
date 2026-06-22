// ============================================================================
// Auth Service — username + bcrypt password authentication against Firestore
// ============================================================================

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../../config/firebase.config.js';

const JWT_SECRET  = process.env.JWT_SECRET  || 'portfolio-jwt-secret';
const JWT_EXPIRES = process.env.JWT_EXPIRES || '8h';
const COLLECTION  = 'admins';

/**
 * Look up admin by username in Firestore, verify bcrypt hash, issue JWT.
 * @param {string} username
 * @param {string} password
 * @returns {{ token: string, expiresIn: string }}
 */
const login = async (username, password) => {
  const snapshot = await db
    .collection(COLLECTION)
    .where('username', '==', username)
    .limit(1)
    .get();

  // Use a constant-time path for both "not found" and "wrong password"
  // to avoid user enumeration.
  const found = !snapshot.empty ? snapshot.docs[0].data() : null;
  const hashToCheck = found?.passwordHash ?? '$2b$12$invalidhashpaddingtoconsumetime00000000000000000000000';

  const match = await bcrypt.compare(password, hashToCheck);

  if (!found || !match) {
    const err = new Error('Invalid credentials.');
    err.statusCode = 401;
    throw err;
  }

  const payload = { role: found.role ?? 'admin', username: found.username };
  const token   = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });

  return { token, expiresIn: JWT_EXPIRES };
};

/**
 * Decode & verify a token — returns payload or throws.
 * @param {string} token
 */
const verifyToken = (token) => jwt.verify(token, JWT_SECRET);

export { login, verifyToken };

