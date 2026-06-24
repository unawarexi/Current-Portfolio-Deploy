import * as service from "./experience.service.js";
import {
  experienceSchema,
  experienceUpdateSchema,
} from "./experience.schema.js";
import { HttpStatus, ErrorCodes } from "../../config/constants.js";
import { createLogger } from "../../logs/logger.js";
import AdvancedFormatter from "../../utils/formatters.js";

const log = createLogger("Experience");

// ============================================================================
// GET ALL EXPERIENCES
// ============================================================================
const getAll = async (_req, res) => {
  try {
    console.log(" [CONTROLLER] Fetching all experiences...");
    const data = await service.getAll();

    console.log(" [CONTROLLER] Experiences retrieved:", {
      count: data.length,
    });

    res.json({ success: true, data });
  } catch (err) {
    log.error("getAll", { error: err });
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: { message: "Failed to fetch experience." },
    });
  }
};

// ============================================================================
// GET SINGLE EXPERIENCE
// ============================================================================
const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(" [CONTROLLER] Fetching experience:", { id });

    const data = await service.getById(id);

    if (!data) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        error: { message: "Experience not found." },
      });
    }

    res.json({ success: true, data });
  } catch (err) {
    log.error("getOne", { error: err });
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: { message: "Failed to fetch experience." },
    });
  }
};

// ============================================================================
// CREATE EXPERIENCE (WITH INTEGRATED FORMATTER)
// ============================================================================
const create = async (req, res) => {
  try {
    console.log(" [CONTROLLER] Received raw experience data:", {
      company: req.body.company,
      role: req.body.role,
      hasDescription: !!req.body.description,
      hasAchievements: !!req.body.achievements,
      hasTechnologies: !!req.body.technologies,
    });

    // ============================================================================
    // STEP 1: APPLY FORMATTER
    // ============================================================================
    const formatted = AdvancedFormatter.formatExperience(req.body);

    console.log(" [CONTROLLER] Experience formatted:", {
      company: formatted.company,
      role: formatted.role,
      achievements: `${formatted.achievements.length} items`,
      technologies: `${formatted.technologies.length} items`,
      skills: `${formatted.skills.length} items`,
      productsBuilt: `${formatted.productsBuilt.length} items`,
      descriptionPreview: formatted.description
        ? `${formatted.description.substring(0, 50)}...`
        : "EMPTY",
    });

    // ============================================================================
    // STEP 2: VALIDATE AGAINST SCHEMA
    // ============================================================================
    const result = experienceSchema.safeParse(formatted);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      console.error(" [CONTROLLER] Validation failed:", {
        problematicFields: Object.keys(fieldErrors),
        errors: fieldErrors,
      });

      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        error: {
          code: ErrorCodes.VALIDATION_ERROR,
          details: fieldErrors,
        },
      });
    }

    console.log(" [CONTROLLER] Schema validation passed");

    // ============================================================================
    // STEP 3: SAVE TO SERVICE
    // ============================================================================
    const id = await service.create(result.data);

    console.log(" [CONTROLLER] Experience created:", { id });

    res.status(HttpStatus.CREATED).json({
      success: true,
      message: "Experience created successfully",
      data: { id },
    });
  } catch (err) {
    log.error("create", { error: err });
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: { message: "Failed to create experience." },
    });
  }
};

// ============================================================================
// UPDATE EXPERIENCE (WITH INTEGRATED FORMATTER)
// ============================================================================
const update = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(" [CONTROLLER] Updating experience:", {
      id,
      fields: Object.keys(req.body),
    });

    // ============================================================================
    // STEP 1: APPLY FORMATTER
    // ============================================================================
    const formatted = AdvancedFormatter.formatExperience(req.body);

    console.log(" [CONTROLLER] Experience formatted for update");

    // ============================================================================
    // STEP 2: VALIDATE AGAINST SCHEMA (PARTIAL UPDATE)
    // ============================================================================
    const result = experienceUpdateSchema.safeParse(formatted);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      console.error(" [CONTROLLER] Validation failed:", {
        errors: fieldErrors,
      });

      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        error: {
          code: ErrorCodes.VALIDATION_ERROR,
          details: fieldErrors,
        },
      });
    }

    console.log(" [CONTROLLER] Schema validation passed");

    // ============================================================================
    // STEP 3: SAVE TO SERVICE
    // ============================================================================
    await service.update(id, result.data);

    console.log(" [CONTROLLER] Experience updated:", { id });

    res.json({
      success: true,
      message: "Experience updated successfully",
    });
  } catch (err) {
    log.error("update", { error: err });
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: { message: "Failed to update experience." },
    });
  }
};

// ============================================================================
// DELETE EXPERIENCE
// ============================================================================
const remove = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("️  [CONTROLLER] Deleting experience:", { id });

    await service.remove(id);

    console.log(" [CONTROLLER] Experience deleted:", { id });

    res.json({
      success: true,
      message: "Experience deleted successfully",
    });
  } catch (err) {
    log.error("remove", { error: err });
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: { message: "Failed to delete experience." },
    });
  }
};

export { getAll, getOne, create, update, remove };
