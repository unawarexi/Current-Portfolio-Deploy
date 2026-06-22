// ============================================================================
// Portfolio Backend — Entry Point
// ============================================================================

import 'dotenv/config.js';

import express from 'express';
import cors from 'cors';
import { logger } from './logs/logger.js';
import { apiLimiter } from './middlewares/ratelimit.middleware.js';
import { connectDB } from './config/mongo.config.js';

// Route modules
import authRoutes from './modules/auth/auth.routes.js';
import projectsRoutes from './modules/projects/projects.routes.js';
import uploadRoutes from './modules/upload/upload.routes.js';
import experienceRoutes from './modules/experience/experience.routes.js';
import aboutRoutes from './modules/about/about.routes.js';

// Initialise Cloudinary config on startup
import './config/cloudinary.config.js';

// Seed admin user into Firestore on startup
import { seedAdmin } from './modules/auth/auth.seed.js';

const app = express();

// ============================================================================
// TRUST PROXY (required for accurate client IP behind reverse proxies)
// Supports: true/false, numeric hop count (e.g. 1), or named presets.
// Defaults to 1 so express-rate-limit can safely read X-Forwarded-For.
// ============================================================================
const rawTrustProxy = (process.env.TRUST_PROXY || "1").trim();
const trustProxy =
  rawTrustProxy === "true"
    ? true
    : rawTrustProxy === "false"
      ? false
      : /^\d+$/.test(rawTrustProxy)
        ? Number(rawTrustProxy)
        : rawTrustProxy;

app.set("trust proxy", trustProxy);
logger.info(`Express trust proxy set to: ${String(trustProxy)}`);

// ============================================================================
// CORS
// ============================================================================
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "http://localhost:5173")
  .split(",")
  .map((o) => o.trim());

app.use(
  cors({
    origin: (origin, cb) => {
      // Allow requests with no origin (curl, mobile) or listed origins
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
      cb(new Error(`CORS: ${origin} not allowed`));
    },
    methods: ["GET", "HEAD", "POST", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);

// ============================================================================
// BODY PARSERS
// ============================================================================
app.use(express.json({ limit: "5mb" }));
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
app.use("/api", apiLimiter);

// ============================================================================
// ROUTES
// ============================================================================
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/about", aboutRoutes);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ============================================================================
// 404 handler
// ============================================================================
app.use((_req, res) => {
  res
    .status(404)
    .json({ success: false, error: { message: "Route not found." } });
});

// ============================================================================
// Global error handler
// ============================================================================
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  logger.error("Unhandled error", { error: err });
  res.status(err.status || 500).json({
    success: false,
    error: { message: err.message || "Internal server error." },
  });
});

// ============================================================================
// START
// ============================================================================
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  logger.info(`Server running on port ${PORT}`);
  await connectDB();
  await seedAdmin();
  logger.info(
    "Routes: POST /api/auth/login | GET|POST /api/projects | POST /api/upload",
  );
});
