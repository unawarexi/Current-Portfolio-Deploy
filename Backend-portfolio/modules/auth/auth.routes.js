// ============================================================================
// Auth Routes — /api/auth
// ============================================================================

import express from 'express';
import { login } from './auth.controller.js';
import { authLimiter } from '../../middlewares/ratelimit.middleware.js';

const router = express.Router();

// POST /api/auth/login
router.post('/login', authLimiter, login);

export default router;
