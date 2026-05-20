'use strict';
const router  = require('express').Router();
const ctrl    = require('./about.controller');
const { verifyToken }   = require('../../middlewares/auth.middleware');
const { apiLimiter, uploadLimiter } = require('../../middlewares/ratelimit.middleware');
const multer  = require('multer');
const upload  = multer({ storage: multer.memoryStorage(), limits: { fileSize: 15 * 1024 * 1024 } });

router.get('/',            apiLimiter,                          ctrl.getProfile);
router.patch('/',          uploadLimiter, verifyToken,          ctrl.upsertProfile);
router.post('/cv',         uploadLimiter, verifyToken, upload.fields([{ name: 'cv', maxCount: 1 }]), ctrl.uploadCv);

module.exports = router;
