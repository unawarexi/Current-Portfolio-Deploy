// ============================================================================
// Projects Service — Firestore CRUD via Firebase Admin SDK
// Each project document stores Cloudinary URLs as strings alongside form data.
// ============================================================================
'use strict';

const { db }           = require('../../config/firebase.config');
const { createLogger } = require('../../logs/logger');

const log        = createLogger('Projects');
const COLLECTION = 'projects';

// ============================================================================
// CREATE
// ============================================================================

/**
 * Save a new project to Firestore.
 * @param {Object} data — validated project payload (Cloudinary URLs already included)
 * @returns {string} — new document ID
 */
const createProject = async (data) => {
  const payload = {
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const ref = await db.collection(COLLECTION).add(payload);
  log.info('Project created', { id: ref.id });
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
  let query = db.collection(COLLECTION).orderBy('createdAt', 'desc');

  if (opts.category) {
    query = query.where('category', '==', opts.category);
  }

  if (opts.limit) {
    query = query.limit(Number(opts.limit));
  }

  const snap = await query.get();
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
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
  return { id: doc.id, ...doc.data() };
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

  await ref.set({ ...updates, updatedAt: new Date().toISOString() }, { merge: true });
  log.info('Project updated', { id });

  const updated = await ref.get();
  return { id: updated.id, ...updated.data() };
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
  log.info('Project deleted', { id });
  return true;
};

module.exports = { createProject, getAllProjects, getProjectById, updateProject, deleteProject };
