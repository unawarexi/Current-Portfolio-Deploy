// ============================================================================
// Auth Seed — runs on server startup.
// Creates the admin document in Firestore if it doesn't already exist.
// ============================================================================
'use strict';

const bcrypt           = require('bcrypt');
const { db }           = require('../../config/firebase.config');
const { createLogger } = require('../../logs/logger');

const log        = createLogger('AuthSeed');
const COLLECTION = 'admins';
const SALT_ROUNDS = 12;

/**
 * Idempotent — safe to call on every startup.
 * Reads APP_ADMIN and APP_PASSWORD from env, hashes the password,
 * and writes the document only if no admin with that username exists.
 */
const seedAdmin = async () => {
  const username = process.env.APP_ADMIN;
  const password = process.env.APP_PASSWORD;

  if (!username || !password) {
    log.warn('APP_ADMIN or APP_PASSWORD not set — skipping admin seed.');
    return;
  }

  try {
    const snapshot = await db
      .collection(COLLECTION)
      .where('username', '==', username)
      .limit(1)
      .get();

    if (!snapshot.empty) {
      log.info(`Admin "${username}" already exists — seed skipped.`);
      return;
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    await db.collection(COLLECTION).add({
      username,
      passwordHash,
      role:      'admin',
      createdAt: new Date().toISOString(),
    });

    log.info(`Admin "${username}" seeded successfully.`);
  } catch (err) {
    log.error('Failed to seed admin', { error: err });
    // Non-fatal — server continues even if seed fails
  }
};

module.exports = { seedAdmin };
