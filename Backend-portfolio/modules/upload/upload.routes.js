// ============================================================================
// Upload Routes — /api/upload
// Protected: admin must be logged in to upload files.
// ============================================================================

import express from 'express';
import multer from 'multer';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { uploadLimiter } from '../../middlewares/ratelimit.middleware.js';
import { uploadOne, uploadMany } from './upload.controller.js';
import { Upload } from '../../config/constants.js';

const storage = multer.memoryStorage();
const upload  = multer({
  storage,
  limits: { fileSize: Upload.MAX_FILE_SIZE },
  fileFilter: (_req, file, cb) => {
    if (Upload.ALLOWED_MIMETYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Unsupported file type: ${file.mimetype}`));
    }
  },
});

const router = express.Router();

// POST /api/upload          — single file
router.post('/', authenticate, uploadLimiter, upload.single('file'), uploadOne);

// POST /api/upload/multiple — up to 10 files
router.post('/multiple', authenticate, uploadLimiter, upload.array('files', Upload.MAX_FILES), uploadMany);

export default router;
