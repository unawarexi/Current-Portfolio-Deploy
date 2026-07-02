import * as service from "./experience.service.js";
import { HttpStatus } from "../../config/constants.js";
import { createLogger } from "../../logs/logger.js";

const log = createLogger("Experience");

// ============================================================================
// GET ALL EXPERIENCES
// ============================================================================
const getAll = async (_req, res) => {
  try {
    const data = await service.getAll();
    res.json({ success: true, data });
  } catch (err) {
    log.error("getAll", { error: err.message });
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: { message: "Failed to fetch experiences." },
    });
  }
};

// ============================================================================
// GET SINGLE EXPERIENCE
// ============================================================================
const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await service.getById(id);

    if (!data) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        error: { message: "Experience not found." },
      });
    }

    res.json({ success: true, data });
  } catch (err) {
    log.error("getOne", { error: err.message });
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: { message: "Failed to fetch experience." },
    });
  }
};

// ============================================================================
// CREATE EXPERIENCE
// ============================================================================
const create = async (req, res) => {
  try {
    // req.validated is populated by the validateBody middleware
    const id = await service.create(req.validated);

    res.status(HttpStatus.CREATED).json({
      success: true,
      message: "Experience created successfully",
      data: { id },
    });
  } catch (err) {
    log.error("create", { error: err.message });
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: { message: "Failed to create experience." },
    });
  }
};

// ============================================================================
// UPDATE EXPERIENCE
// ============================================================================
const update = async (req, res) => {
  try {
    const { id } = req.params;
    await service.update(id, req.validated);

    res.json({
      success: true,
      message: "Experience updated successfully",
    });
  } catch (err) {
    log.error("update", { error: err.message });
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
    await service.remove(id);

    res.json({
      success: true,
      message: "Experience deleted successfully",
    });
  } catch (err) {
    log.error("remove", { error: err.message });
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: { message: "Failed to delete experience." },
    });
  }
};

export { getAll, getOne, create, update, remove };
