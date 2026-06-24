import { db } from "../../config/firebase.config.js";
import { createLogger } from "../../logs/logger.js";

const log = createLogger("Experience");
const COL = "experience";

/**
 * Create new experience entry
 * Data is already formatted by controller
 *
 * @param {Object} data - Formatted experience data
 * @returns {string} Document ID
 */
const create = async (data) => {
  try {
    const payload = {
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    console.log(" [SERVICE] Creating experience:", {
      company: data.company,
      role: data.role,
      achievementsCount: data.achievements?.length || 0,
      technologiesCount: data.technologies?.length || 0,
    });

    const ref = await db.collection(COL).add(payload);

    log.info("Experience created", { id: ref.id });

    return ref.id;
  } catch (err) {
    log.error("create", { error: err.message });
    throw err;
  }
};

/**
 * Get all experiences
 *
 * @returns {Array} Array of experience documents
 */
const getAll = async () => {
  try {
    console.log(" [SERVICE] Fetching all experiences...");

    const snap = await db.collection(COL).orderBy("order", "asc").get();

    const experiences = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

    console.log(" [SERVICE] Retrieved experiences:", {
      count: experiences.length,
    });

    return experiences;
  } catch (err) {
    log.error("getAll", { error: err.message });
    throw err;
  }
};

/**
 * Get single experience by ID
 *
 * @param {string} id - Document ID
 * @returns {Object|null} Experience data or null
 */
const getById = async (id) => {
  try {
    const doc = await db.collection(COL).doc(id).get();

    if (!doc.exists) {
      console.warn("️  [SERVICE] Experience not found:", { id });
      return null;
    }

    console.log(" [SERVICE] Retrieved experience:", { id });

    return { id: doc.id, ...doc.data() };
  } catch (err) {
    log.error("getById", { error: err.message, id });
    throw err;
  }
};

/**
 * Update existing experience
 * Data is already formatted by controller
 *
 * @param {string} id - Document ID
 * @param {Object} data - Formatted update data
 */
const update = async (id, data) => {
  try {
    console.log(" [SERVICE] Updating experience:", {
      id,
      fields: Object.keys(data),
    });

    await db
      .collection(COL)
      .doc(id)
      .update({
        ...data,
        updatedAt: new Date().toISOString(),
      });

    log.info("Experience updated", { id });

    console.log(" [SERVICE] Experience updated:", { id });
  } catch (err) {
    log.error("update", { error: err.message, id });
    throw err;
  }
};

/**
 * Delete experience
 *
 * @param {string} id - Document ID
 */
const remove = async (id) => {
  try {
    console.log("️  [SERVICE] Deleting experience:", { id });

    await db.collection(COL).doc(id).delete();

    log.info("Experience deleted", { id });

    console.log(" [SERVICE] Experience deleted:", { id });
  } catch (err) {
    log.error("remove", { error: err.message, id });
    throw err;
  }
};

/**
 * Validate experience data structure
 * Ensures all arrays are properly formatted
 *
 * @param {Object} data - Experience data to validate
 * @returns {Object} { valid: boolean, issues: Array<string> }
 */
const validateStructure = (data) => {
  const issues = [];

  if (data.company && typeof data.company !== "string") {
    issues.push("Company must be a string");
  }

  if (data.role && typeof data.role !== "string") {
    issues.push("Role must be a string");
  }

  if (data.description && typeof data.description !== "string") {
    issues.push("Description must be a string");
  }

  if (data.achievements && !Array.isArray(data.achievements)) {
    issues.push("Achievements must be an array");
  }

  if (data.technologies && !Array.isArray(data.technologies)) {
    issues.push("Technologies must be an array");
  }

  if (data.skills && !Array.isArray(data.skills)) {
    issues.push("Skills must be an array");
  }

  if (data.productsBuilt && !Array.isArray(data.productsBuilt)) {
    issues.push("Products built must be an array");
  }

  if (issues.length > 0) {
    log.warn("Validation issues detected:", { issues });
    return { valid: false, issues };
  }

  return { valid: true, issues: [] };
};

export { create, getAll, getById, update, remove, validateStructure };
