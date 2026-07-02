import express from "express";
const router = express.Router();
import * as ctrl from "./about.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { validateBody } from "../../middlewares/validate.middleware.js";
import { aboutUpdateSchema } from "./about.schema.js";
import {
  apiLimiter,
  uploadLimiter,
} from "../../middlewares/ratelimit.middleware.js";
import multer from "multer";
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 },
});

// ── Profile ───────────────────────────────────────────────────────────────────
router.get("/", apiLimiter, ctrl.getProfile);
router.patch("/", uploadLimiter, authenticate, validateBody(aboutUpdateSchema), ctrl.upsertProfile);

// ── Documents (CVs & Cover Letters) ──────────────────────────────────────────
router.get("/documents", apiLimiter, ctrl.getDocuments);
router.post(
  "/documents/cv",
  uploadLimiter,
  authenticate,
  upload.fields([{ name: "cv", maxCount: 1 }]),
  ctrl.uploadCv,
);
router.post(
  "/documents/cover-letter",
  uploadLimiter,
  authenticate,
  upload.fields([{ name: "coverLetter", maxCount: 1 }]),
  ctrl.uploadCoverLetter,
);
router.patch(
  "/documents/:id/activate",
  apiLimiter,
  authenticate,
  ctrl.setActiveDocument,
);
router.delete("/documents/:id", apiLimiter, authenticate, ctrl.deleteDocument);

export default router;
