// ============================================================================
// Projects Service — Firestore CRUD via Firebase Admin SDK + MongoDB for Links
// Each project document stores form data in Firestore, while image URLs
// and multiple links are stored in MongoDB.
// ============================================================================

import { db } from "../../config/firebase.config.js";
import { createLogger } from "../../logs/logger.js";
import ProjectLinks from "./projectLinks.model.js";

const log = createLogger("Projects");
const COLLECTION = "projects";

// ============================================================================
// HELPERS
// ============================================================================

/**
 * Parse space-separated link strings into numbered arrays
 * "url1 url2 url3" → [1. url1, 2. url2, 3. url3]
 */
const parseLinksWithNumbers = (linkString = "") => {
  if (!linkString || typeof linkString !== "string") return [];

  return linkString
    .split(/\s+/)
    .filter((url) => url.startsWith("http://") || url.startsWith("https://"))
    .map((url, idx) => `${idx + 1}. ${url.trim()}`);
};

/**
 * Extract only Cloudinary image URLs for MongoDB
 * Keep all links (including parsed ones) in Firebase
 */
const extractLinks = (data) => {
  const {
    coverImages = [],
    projectImages = [],
    // Links stay in firebaseData
    ...firebaseData
  } = data;

  // Parse any space-separated link strings into numbered arrays
  if (
    firebaseData.googlePlayLinks &&
    typeof firebaseData.googlePlayLinks === "string"
  ) {
    firebaseData.googlePlayLinks = parseLinksWithNumbers(
      firebaseData.googlePlayLinks,
    );
  }
  if (
    firebaseData.appStoreLinks &&
    typeof firebaseData.appStoreLinks === "string"
  ) {
    firebaseData.appStoreLinks = parseLinksWithNumbers(
      firebaseData.appStoreLinks,
    );
  }
  if (
    firebaseData.githubLinks &&
    typeof firebaseData.githubLinks === "string"
  ) {
    firebaseData.githubLinks = parseLinksWithNumbers(firebaseData.githubLinks);
  }
  if (
    firebaseData.webLiveLinks &&
    typeof firebaseData.webLiveLinks === "string"
  ) {
    firebaseData.webLiveLinks = parseLinksWithNumbers(
      firebaseData.webLiveLinks,
    );
  }
  if (firebaseData.videoUrls && typeof firebaseData.videoUrls === "string") {
    firebaseData.videoUrls = parseLinksWithNumbers(firebaseData.videoUrls);
  }

  return {
    firebaseData,
    mongoData: {
      // ONLY Cloudinary image URLs go to MongoDB
      coverImages,
      projectImages,
    },
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
  const { firebaseData, mongoData } = extractLinks(data);

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

  const { firebaseData, mongoData } = extractLinks(updates);

  if (Object.keys(firebaseData).length > 0) {
    await ref.set(
      { ...firebaseData, updatedAt: new Date().toISOString() },
      { merge: true },
    );
  }

  if (Object.keys(mongoData).length > 0) {
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
