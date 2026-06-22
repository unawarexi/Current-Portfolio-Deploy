import * as service from './about.service.js';
import { aboutUpdateSchema } from './about.schema.js';
import * as cloudinaryService from '../../services/cloudinary.service.js';
import { HttpStatus, ErrorCodes } from '../../config/constants.js';
import { createLogger } from '../../logs/logger.js';
const log = createLogger('About');

const parseArrayField = (val) => {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  try { return JSON.parse(val); } catch { return [val]; }
};

const getProfile = async (_req, res) => {
  try {
    const data = await service.get();
    res.json({ success: true, data: data || {} });
  } catch (err) {
    log.error('getProfile', { error: err });
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, error: { message: 'Failed to fetch profile.' } });
  }
};

const upsertProfile = async (req, res) => {
  try {
    const raw = {
      ...req.body,
      goals:          parseArrayField(req.body.goals),
      values:         parseArrayField(req.body.values),
      funFacts:       parseArrayField(req.body.funFacts),
      hobbies:        parseArrayField(req.body.hobbies),
      education:      parseArrayField(req.body.education),
      certifications: parseArrayField(req.body.certifications),
      languages:      parseArrayField(req.body.languages),
      openToWork:     req.body.openToWork === 'true' || req.body.openToWork === true,
      socials:        req.body.socials ? (typeof req.body.socials === 'string' ? JSON.parse(req.body.socials) : req.body.socials) : {},
    };
    const result = aboutUpdateSchema.safeParse(raw);
    if (!result.success) {
      return res.status(HttpStatus.BAD_REQUEST).json({ success: false, error: { code: ErrorCodes.VALIDATION_ERROR, details: result.error.flatten().fieldErrors } });
    }
    await service.upsert(result.data);
    res.json({ success: true });
  } catch (err) {
    log.error('upsertProfile', { error: err });
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, error: { message: 'Failed to update profile.' } });
  }
};

const uploadCv = async (req, res) => {
  try {
    const file = req.files?.cv?.[0] || req.file;
    if (!file) return res.status(HttpStatus.BAD_REQUEST).json({ success: false, error: { message: 'No CV file provided.' } });

    const result = await cloudinaryService.uploadRaw(file.buffer, {
      folder: 'portfolio/cv',
      resource_type: 'raw',
      public_id: 'resume',
      format: 'pdf',
    });
    await service.updateCv(result.secure_url);
    res.json({ success: true, data: { cvUrl: result.secure_url } });
  } catch (err) {
    log.error('uploadCv', { error: err });
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, error: { message: 'Failed to upload CV.' } });
  }
};

export { getProfile, upsertProfile, uploadCv };
