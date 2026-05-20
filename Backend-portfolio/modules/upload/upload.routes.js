// ============================================================================
// Upload Routes — /api/upload
// Protected: admin must be logged in to upload files.
// ============================================================================
'use strict';

const express          = require('express');
const multer           = require('multer');
const { authenticate } = require('../../middlewares/auth.middleware');
const { uploadLimiter }= require('../../middlewares/ratelimit.middleware');
const { uploadOne, uploadMany } = require('./upload.controller');
const { Upload }       = require('../../config/constants');

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

module.exports = router;
