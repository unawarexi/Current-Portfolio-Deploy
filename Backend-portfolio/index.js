// ============================================================================
// Portfolio Backend — Entry Point
// ============================================================================
'use strict';

require('dotenv').config();

const express   = require('express');
const cors      = require('cors');
const { logger }   = require('./logs/logger');
const { apiLimiter } = require('./middlewares/ratelimit.middleware');

// Route modules
const authRoutes       = require('./modules/auth/auth.routes');
const projectsRoutes   = require('./modules/projects/projects.routes');
const uploadRoutes     = require('./modules/upload/upload.routes');
const experienceRoutes = require('./modules/experience/experience.routes');
const aboutRoutes      = require('./modules/about/about.routes');

// Initialise Cloudinary config on startup
require('./config/cloudinary.config');

const app = express();

// ============================================================================
// CORS
// ============================================================================
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim());

app.use(cors({
  origin: (origin, cb) => {
    // Allow requests with no origin (curl, mobile) or listed origins
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error(`CORS: ${origin} not allowed`));
  },
  methods:     ['GET', 'HEAD', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

// ============================================================================
// BODY PARSERS
// ============================================================================
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));

// ============================================================================
// REQUEST LOGGER
// ============================================================================
app.use((req, _res, next) => {
  logger.http(`${req.method} ${req.path}`);
  next();
});

// ============================================================================
// RATE LIMIT (global)
// ============================================================================
app.use('/api', apiLimiter);

// ============================================================================
// ROUTES
// ============================================================================
app.use('/api/auth',       authRoutes);
app.use('/api/projects',   projectsRoutes);
app.use('/api/upload',     uploadRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/about',      aboutRoutes);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ============================================================================
// 404 handler
// ============================================================================
app.use((_req, res) => {
  res.status(404).json({ success: false, error: { message: 'Route not found.' } });
});

// ============================================================================
// Global error handler
// ============================================================================
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  logger.error('Unhandled error', { error: err });
  res.status(err.status || 500).json({
    success: false,
    error: { message: err.message || 'Internal server error.' },
  });
});

// ============================================================================
// START
// ============================================================================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  logger.info('Routes: POST /api/auth/login | GET|POST /api/projects | POST /api/upload');
});
