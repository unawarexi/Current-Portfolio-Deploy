// ============================================================================
// Projects Service — Firestore CRUD via Firebase Admin SDK + MongoDB for Links
// Each project document stores form data in Firestore, while image URLs
// and multiple links are stored in MongoDB.
// ============================================================================

import { db } from "../../config/firebase.config.js";
import { createLogger } from "../../logs/logger.js";
import ProjectLinks from "./projectLinks.model.js";
import AdvancedFormatter from "../../utils/formatters.js";

const log = createLogger("Projects");
const COLLECTION = "projects";

// ============================================================================
// HELPERS
// ============================================================================

/**
 * Split a formatted project payload into Firestore and MongoDB portions.
 * Link arrays (githubLinks, etc.) stay in Firestore.
 * Only Cloudinary image URL arrays go to MongoDB.
 */
const extractLinks = (data) => {
  const { coverImages = [], projectImages = [], ...firebaseData } = data;
  return {
    firebaseData,
    mongoData: { coverImages, projectImages },
  };
};

const mergeProjectData = async (firebaseDoc) => {
  const data = firebaseDoc.data();
  const id = firebaseDoc.id;
  try {
    // Fetch ONLY Cloudinary image URLs from MongoDB
    const images = await ProjectLinks.findOne({ firebaseProjectId: id }).lean();
    if (images) {
      return {
        id,
        ...data,
        coverImages: images.coverImages || [],
        projectImages: images.projectImages || [],
      };
    }
  } catch (err) {
    log.error("Error fetching MongoDB images", { error: err });
  }
  // Ensure image arrays exist even if no MongoDB record found
  return {
    id,
    ...data,
    coverImages: data.coverImages || [],
    projectImages: data.projectImages || [],
  };
};

// ============================================================================
// CREATE
// ============================================================================

/**
 * Save a new project to Firestore and MongoDB.
 * @param {Object} data — validated project payload
 * @returns {string} — new document ID
 */
const createProject = async (data) => {
  const { firebaseData, mongoData } = extractLinks(
    AdvancedFormatter.formatProjectData(data),
  );

  const payload = {
    ...firebaseData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const ref = await db.collection(COLLECTION).add(payload);

  try {
    await ProjectLinks.create({
      firebaseProjectId: ref.id,
      ...mongoData,
    });
  } catch (err) {
    log.error("Error saving to MongoDB", { error: err });
  }

  log.info("Project created", { id: ref.id });
  return ref.id;
};

// ============================================================================
// READ ALL
// ============================================================================

/**
 * Fetch all projects, optionally filtered by category.
 * @param {{ category?: string, limit?: number }} opts
 */
const getAllProjects = async (opts = {}) => {
  let query = db.collection(COLLECTION).orderBy("createdAt", "desc");

  if (opts.category) {
    query = query.where("category", "==", opts.category);
  }

  if (opts.limit) {
    query = query.limit(Number(opts.limit));
  }

  const snap = await query.get();

  // Fetch MongoDB links concurrently for all projects
  const projects = await Promise.all(snap.docs.map(mergeProjectData));
  return projects;
};

// ============================================================================
// READ ONE
// ============================================================================

/**
 * Fetch a single project by ID.
 * @param {string} id
 */
const getProjectById = async (id) => {
  const doc = await db.collection(COLLECTION).doc(id).get();

  if (!doc.exists) return null;
  return await mergeProjectData(doc);
};

// ============================================================================
// UPDATE
// ============================================================================

/**
 * Partially update a project (merge).
 * @param {string} id
 * @param {Object} updates
 */
const updateProject = async (id, updates) => {
  const ref = db.collection(COLLECTION).doc(id);
  const existing = await ref.get();

  if (!existing.exists) return null;

  // Format only the fields present in the update; for fields not in `updates`
  // we feed safe empty defaults so formatProjectData never writes blanks over
  // existing Firestore data — we then strip them back out via formattedDelta.
  const formatted = AdvancedFormatter.formatProjectData({
    title: "",
    category: "",
    description: "",
    type: "",
    status: "",
    year: "",
    client: "",
    role: "",
    duration: "",
    team: [],
    technologies: [],
    features: "",
    challenges: "",
    solution: "",
    results: "",
    githubLinks: [],
    googlePlayLinks: [],
    appStoreLinks: [],
    webLiveLinks: [],
    videoUrls: [],
    coverImages: [],
    projectImages: [],
    ...updates,
  });

  // Rebuild a delta containing only the keys that were actually in updates
  const formattedDelta = Object.fromEntries(
    Object.keys(updates).map((key) => [key, formatted[key]]),
  );

  const { firebaseData, mongoData } = extractLinks(formattedDelta);

  if (Object.keys(firebaseData).length > 0) {
    await ref.set(
      { ...firebaseData, updatedAt: new Date().toISOString() },
      { merge: true },
    );
  }

  if (mongoData.coverImages?.length || mongoData.projectImages?.length) {
    try {
      await ProjectLinks.findOneAndUpdate(
        { firebaseProjectId: id },
        { $set: mongoData },
        { upsert: true },
      );
    } catch (err) {
      log.error("Error updating MongoDB links", { error: err });
    }
  }

  log.info("Project updated", { id });

  const updated = await ref.get();
  return await mergeProjectData(updated);
};

// ============================================================================
// DELETE
// ============================================================================

/**
 * Delete a project document.
 * @param {string} id
 * @returns {boolean} — true if existed, false if not found
 */
const deleteProject = async (id) => {
  const ref = db.collection(COLLECTION).doc(id);
  const existing = await ref.get();

  if (!existing.exists) return false;

  await ref.delete();
  try {
    await ProjectLinks.deleteOne({ firebaseProjectId: id });
  } catch (err) {
    log.error("Error deleting MongoDB links", { error: err });
  }

  log.info("Project deleted", { id });
  return true;
};

export {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
