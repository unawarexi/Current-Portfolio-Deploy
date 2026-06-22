import express from 'express';
const router = express.Router();
import * as ctrl from './experience.controller.js';
import { verifyToken } from '../../middlewares/auth.middleware.js';
import { uploadLimiter, apiLimiter } from '../../middlewares/ratelimit.middleware.js';

router.get('/',    apiLimiter,                     ctrl.getAll);
router.get('/:id', apiLimiter,                     ctrl.getOne);
router.post('/',   uploadLimiter, verifyToken,     ctrl.create);
router.patch('/:id', uploadLimiter, verifyToken,   ctrl.update);
router.delete('/:id', apiLimiter, verifyToken,     ctrl.remove);

export default router;
