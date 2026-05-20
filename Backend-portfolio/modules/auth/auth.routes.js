// ============================================================================
// Auth Routes — /api/auth
// ============================================================================
'use strict';

const express      = require('express');
const { login }    = require('./auth.controller');
const { authLimiter } = require('../../middlewares/ratelimit.middleware');

const router = express.Router();

// POST /api/auth/login
router.post('/login', authLimiter, login);

module.exports = router;
