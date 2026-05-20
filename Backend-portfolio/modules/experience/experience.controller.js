'use strict';
const service = require('./experience.service');
const { experienceSchema, experienceUpdateSchema } = require('./experience.schema');
const { HttpStatus, ErrorCodes } = require('../../config/constants');
const { createLogger } = require('../../logs/logger');
const log = createLogger('Experience');

const parseArrayField = (val) => {
  if (Array.isArray(val)) return val;
  try { return JSON.parse(val); } catch { return val ? [val] : []; }
};

const getAll = async (_req, res) => {
  try {
    const data = await service.getAll();
    res.json({ success: true, data });
  } catch (err) {
    log.error('getAll', { error: err });
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, error: { message: 'Failed to fetch experience.' } });
  }
};

const getOne = async (req, res) => {
  try {
    const data = await service.getById(req.params.id);
    if (!data) return res.status(HttpStatus.NOT_FOUND).json({ success: false, error: { message: 'Not found.' } });
    res.json({ success: true, data });
  } catch (err) {
    log.error('getOne', { error: err });
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, error: { message: 'Failed to fetch.' } });
  }
};

const create = async (req, res) => {
  try {
    const raw = {
      ...req.body,
      skills:        parseArrayField(req.body.skills),
      achievements:  parseArrayField(req.body.achievements),
      productsBuilt: parseArrayField(req.body.productsBuilt),
      isCurrent:     req.body.isCurrent === 'true' || req.body.isCurrent === true,
    };
    const result = experienceSchema.safeParse(raw);
    if (!result.success) {
      return res.status(HttpStatus.BAD_REQUEST).json({ success: false, error: { code: ErrorCodes.VALIDATION_ERROR, details: result.error.flatten().fieldErrors } });
    }
    const id = await service.create(result.data);
    res.status(HttpStatus.CREATED).json({ success: true, data: { id } });
  } catch (err) {
    log.error('create', { error: err });
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, error: { message: 'Failed to create.' } });
  }
};

const update = async (req, res) => {
  try {
    const raw = {
      ...req.body,
      ...(req.body.skills        && { skills:        parseArrayField(req.body.skills) }),
      ...(req.body.achievements  && { achievements:  parseArrayField(req.body.achievements) }),
      ...(req.body.productsBuilt && { productsBuilt: parseArrayField(req.body.productsBuilt) }),
      ...(req.body.isCurrent !== undefined && { isCurrent: req.body.isCurrent === 'true' || req.body.isCurrent === true }),
    };
    const result = experienceUpdateSchema.safeParse(raw);
    if (!result.success) {
      return res.status(HttpStatus.BAD_REQUEST).json({ success: false, error: { code: ErrorCodes.VALIDATION_ERROR, details: result.error.flatten().fieldErrors } });
    }
    await service.update(req.params.id, result.data);
    res.json({ success: true });
  } catch (err) {
    log.error('update', { error: err });
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, error: { message: 'Failed to update.' } });
  }
};

const remove = async (req, res) => {
  try {
    await service.remove(req.params.id);
    res.json({ success: true });
  } catch (err) {
    log.error('remove', { error: err });
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, error: { message: 'Failed to delete.' } });
  }
};

module.exports = { getAll, getOne, create, update, remove };
