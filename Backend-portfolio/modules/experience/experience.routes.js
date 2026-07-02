import express from 'express';
const router = express.Router();
import * as ctrl from './experience.controller.js';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { validateBody } from '../../middlewares/validate.middleware.js';
import { experienceSchema, experienceUpdateSchema } from './experience.schema.js';
import { uploadLimiter, apiLimiter } from '../../middlewares/ratelimit.middleware.js';

router.get('/',    apiLimiter,                     ctrl.getAll);
router.get('/:id', apiLimiter,                     ctrl.getOne);
router.post('/',   uploadLimiter, authenticate, validateBody(experienceSchema), ctrl.create);
router.patch('/:id', uploadLimiter, authenticate, validateBody(experienceUpdateSchema), ctrl.update);
router.delete('/:id', apiLimiter, authenticate,     ctrl.remove);

export default router;
