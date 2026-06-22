import express from 'express';
const router = express.Router();
import * as ctrl from './about.controller.js';
import { verifyToken } from '../../middlewares/auth.middleware.js';
import { apiLimiter, uploadLimiter } from '../../middlewares/ratelimit.middleware.js';
import multer from 'multer';
const upload  = multer({ storage: multer.memoryStorage(), limits: { fileSize: 15 * 1024 * 1024 } });

router.get('/',            apiLimiter,                          ctrl.getProfile);
router.patch('/',          uploadLimiter, verifyToken,          ctrl.upsertProfile);
router.post('/cv',         uploadLimiter, verifyToken, upload.fields([{ name: 'cv', maxCount: 1 }]), ctrl.uploadCv);

export default router;
