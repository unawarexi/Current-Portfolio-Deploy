'use strict';
const router  = require('express').Router();
const ctrl    = require('./experience.controller');
const { verifyToken } = require('../../middlewares/auth.middleware');
const { uploadLimiter, apiLimiter } = require('../../middlewares/ratelimit.middleware');

router.get('/',    apiLimiter,                     ctrl.getAll);
router.get('/:id', apiLimiter,                     ctrl.getOne);
router.post('/',   uploadLimiter, verifyToken,     ctrl.create);
router.patch('/:id', uploadLimiter, verifyToken,   ctrl.update);
router.delete('/:id', apiLimiter, verifyToken,     ctrl.remove);

module.exports = router;
