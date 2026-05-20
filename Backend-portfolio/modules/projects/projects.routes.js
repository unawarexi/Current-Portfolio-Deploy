// ============================================================================
// Projects Routes — /api/projects
// Public:    GET  /api/projects         (list)
// Public:    GET  /api/projects/:id     (detail)
// Protected: POST /api/projects         (create — multipart/form-data)
// Protected: PATCH /api/projects/:id   (update)
// Protected: DELETE /api/projects/:id  (delete)
// ============================================================================
'use strict';

const express          = require('express');
const multer           = require('multer');
const ctrl             = require('./projects.controller');
const { authenticate } = require('../../middlewares/auth.middleware');
const { Upload }       = require('../../config/constants');

const storage = multer.memoryStorage();
const upload  = multer({
  storage,
  limits: { fileSize: Upload.MAX_FILE_SIZE },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) return cb(null, true);
    cb(new Error(`Unsupported file type: ${file.mimetype}`));
  },
});

// Accept up to 10 cover images and 20 project screenshots per request
const projectImages = upload.fields([
  { name: 'coverImages',   maxCount: 10 },
  { name: 'projectImages', maxCount: 20 },
]);

const router = express.Router();

router.get('/',      ctrl.getAll);
router.get('/:id',   ctrl.getOne);
router.post('/',     authenticate, projectImages, ctrl.create);
router.patch('/:id', authenticate, ctrl.update);
router.delete('/:id', authenticate, ctrl.remove);

module.exports = router;
