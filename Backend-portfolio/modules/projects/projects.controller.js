// ============================================================================
// Projects Controller — CRUD handlers for /api/projects
// ============================================================================

import * as projectsService from './projects.service.js';
import * as cloudinaryService from '../../services/cloudinary.service.js';
import { projectSchema, projectUpdateSchema } from './project.schema.js';
import { HttpStatus, ErrorCodes } from '../../config/constants.js';
import { createLogger } from '../../logs/logger.js';

const log = createLogger('Projects');

// ============================================================================
// GET /api/projects
// ============================================================================
const getAll = async (req, res) => {
  try {
    const { category, limit } = req.query;
    const projects = await projectsService.getAllProjects({ category, limit });
    return res.status(HttpStatus.OK).json({ success: true, data: projects });
  } catch (err) {
    log.error('getAll error', { error: err });
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: { code: ErrorCodes.INTERNAL_ERROR, message: 'Failed to fetch projects.' },
    });
  }
};

// ============================================================================
// GET /api/projects/:id
// ============================================================================
const getOne = async (req, res) => {
  try {
    const project = await projectsService.getProjectById(req.params.id);

    if (!project) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        error: { code: ErrorCodes.NOT_FOUND, message: 'Project not found.' },
      });
    }

    return res.status(HttpStatus.OK).json({ success: true, data: project });
  } catch (err) {
    log.error('getOne error', { error: err });
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: { code: ErrorCodes.INTERNAL_ERROR, message: 'Failed to fetch project.' },
    });
  }
};

// ============================================================================
// POST /api/projects  (protected — multipart/form-data)
// Receives image files (coverImages, projectImages) + text fields.
// Uploads files to Cloudinary, stores resulting URLs in Firestore.
// ============================================================================
const create = async (req, res) => {
  try {
    // Upload image files to Cloudinary (runs in parallel)
    const coverBuffers   = (req.files?.coverImages   || []).map((f) => f.buffer);
    const projectBuffers = (req.files?.projectImages || []).map((f) => f.buffer);

    const [coverResults, projectResults] = await Promise.all([
      cloudinaryService.uploadMany(coverBuffers,   { folder: 'portfolio/covers' }),
      cloudinaryService.uploadMany(projectBuffers, { folder: 'portfolio/projects' }),
    ]);

    // Build raw payload from multipart body (arrays arrive as JSON strings)
    const raw = {
      title:          req.body.title          || '',
      description:    req.body.description    || '',
      category:       req.body.category       || '',
      type:           req.body.type           || '',
      status:         req.body.status         || '',
      year:           req.body.year           || '',
      client:         req.body.client         || '',
      role:           req.body.role           || '',
      duration:       req.body.duration       || '',
      features:       req.body.features       || '',
      challenges:     req.body.challenges     || '',
      solution:       req.body.solution       || '',
      results:        req.body.results        || '',
      githubLinks:     req.body.githubLink     || '',
      googlePlayLinks: req.body.googlePlayLink || '',
      appStoreLinks:   req.body.appStoreLink   || '',
      webLiveLinks:    req.body.webLiveLink    || '',
      videoUrls:       req.body.videoUrl       || '',
      technologies:   JSON.parse(req.body.technologies  || '[]'),
      team:           JSON.parse(req.body.team           || '[]'),
      coverImages:    coverResults.map((r) => r.url),
      projectImages:  projectResults.map((r) => r.url),
    };

    // Validate with Zod before saving to Firestore
    const parsed = projectSchema.safeParse(raw);
    if (!parsed.success) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        error: {
          code:    ErrorCodes.VALIDATION_ERROR,
          message: 'Validation failed',
          details: parsed.error.flatten().fieldErrors,
        },
      });
    }

    const id = await projectsService.createProject(parsed.data);
    log.info('Project created', { id, coverCount: coverResults.length, projectCount: projectResults.length });

    return res.status(HttpStatus.CREATED).json({ success: true, data: { id } });
  } catch (err) {
    log.error('create error', { error: err });
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: { code: ErrorCodes.INTERNAL_ERROR, message: 'Failed to create project.' },
    });
  }
};

// ============================================================================
// PATCH /api/projects/:id  (protected)
// ============================================================================
const update = async (req, res) => {
  try {
    // Validate the partial update payload
    const parsed = projectUpdateSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        error: {
          code:    ErrorCodes.VALIDATION_ERROR,
          message: 'Validation failed',
          details: parsed.error.flatten().fieldErrors,
        },
      });
    }

    const project = await projectsService.updateProject(req.params.id, parsed.data);

    if (!project) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        error: { code: ErrorCodes.NOT_FOUND, message: 'Project not found.' },
      });
    }

    return res.status(HttpStatus.OK).json({ success: true, data: project });
  } catch (err) {
    log.error('update error', { error: err });
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: { code: ErrorCodes.INTERNAL_ERROR, message: 'Failed to update project.' },
    });
  }
};

// ============================================================================
// DELETE /api/projects/:id  (protected)
// ============================================================================
const remove = async (req, res) => {
  try {
    const found = await projectsService.deleteProject(req.params.id);

    if (!found) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        error: { code: ErrorCodes.NOT_FOUND, message: 'Project not found.' },
      });
    }

    return res.status(HttpStatus.NO_CONTENT).send();
  } catch (err) {
    log.error('remove error', { error: err });
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: { code: ErrorCodes.INTERNAL_ERROR, message: 'Failed to delete project.' },
    });
  }
};

export { getAll, getOne, create, update, remove };
