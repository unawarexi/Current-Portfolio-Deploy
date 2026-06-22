// ============================================================================
// Upload Controller — single + multiple file uploads → Cloudinary
// Returns Cloudinary secure_url strings to the frontend, which then
// includes them in the project payload sent to /api/projects.
// ============================================================================

import * as cloudinaryService from '../../services/cloudinary.service.js';
import { HttpStatus, ErrorCodes, Upload } from '../../config/constants.js';
import { createLogger } from '../../logs/logger.js';

const log = createLogger('Upload');

// ============================================================================
// POST /api/upload  — single file
// ============================================================================
const uploadOne = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        error: { code: ErrorCodes.MISSING_FIELD, message: 'No file provided.' },
      });
    }

    const result = await cloudinaryService.uploadBuffer(req.file.buffer, {
      folder: req.body.folder || 'portfolio',
    });

    log.info('File uploaded', { publicId: result.publicId });

    return res.status(HttpStatus.OK).json({
      success: true,
      data: { url: result.url, publicId: result.publicId },
    });
  } catch (err) {
    log.error('uploadOne error', { error: err });
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: { code: ErrorCodes.INTERNAL_ERROR, message: 'Upload failed.' },
    });
  }
};

// ============================================================================
// POST /api/upload/multiple  — up to Upload.MAX_FILES files
// ============================================================================
const uploadMany = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        error: { code: ErrorCodes.MISSING_FIELD, message: 'No files provided.' },
      });
    }

    const folder  = req.body.folder || 'portfolio';
    const buffers = req.files.map((f) => f.buffer);
    const results = await cloudinaryService.uploadMany(buffers, { folder });

    log.info(`${results.length} files uploaded`);

    return res.status(HttpStatus.OK).json({
      success: true,
      data: results.map((r) => ({ url: r.url, publicId: r.publicId })),
    });
  } catch (err) {
    log.error('uploadMany error', { error: err });
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: { code: ErrorCodes.INTERNAL_ERROR, message: 'Upload failed.' },
    });
  }
};

export { uploadOne, uploadMany };
