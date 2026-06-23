import { Documents } from "./document.model.js";
import { createLogger } from "../../logs/logger.js";
const log = createLogger("Document");

// ============================================================================
// INTERNAL HELPERS
// ============================================================================

/**
 * Always returns the single Documents record (creates it on first use).
 */
const _getOrCreateRecord = async () => {
  let record = await Documents.findOne();
  if (!record) {
    record = await Documents.create({ documents: [] });
    log.info("Documents record initialised");
  }
  return record;
};

// ============================================================================
// PUBLIC API
// ============================================================================

/**
 * Add a new document entry (CV or cover-letter) and persist it.
 * If isActive is true, all other documents of the same type are deactivated.
 *
 * @param {{ type: "cv"|"cover-letter", url: string, filename?: string, cloudinaryPublicId?: string, name?: string, isActive?: boolean }} docData
 * @returns {Promise<object>} The newly added subdocument
 */
const addDocument = async (docData) => {
  const record = await _getOrCreateRecord();
  record.addDocument({ isActive: true, ...docData }); // isActive defaults to true
  await record.save();
  log.info("Document added", { type: docData.type, url: docData.url });

  // Return the document that was just pushed (last of its type)
  return record.documents[record.documents.length - 1];
};

/**
 * Return the Cloudinary URL for the current active CV, or null.
 * @returns {Promise<string|null>}
 */
const getActiveCvUrl = async () => {
  const record = await _getOrCreateRecord();
  const active = record.getActiveCv();
  return active ? active.url : null;
};

/**
 * Return the Cloudinary URL for the current active cover letter, or null.
 * @returns {Promise<string|null>}
 */
const getActiveCoverLetterUrl = async () => {
  const record = await _getOrCreateRecord();
  const active = record.getActiveCoverLetter();
  return active ? active.url : null;
};

/**
 * Return all stored documents (both types).
 * @returns {Promise<object[]>}
 */
const getAllDocuments = async () => {
  const record = await _getOrCreateRecord();
  return record.documents;
};

/**
 * Return all CVs.
 * @returns {Promise<object[]>}
 */
const getAllCvs = async () => {
  const record = await _getOrCreateRecord();
  return record.getAllCvs();
};

/**
 * Return all cover letters.
 * @returns {Promise<object[]>}
 */
const getAllCoverLetters = async () => {
  const record = await _getOrCreateRecord();
  return record.getAllCoverLetters();
};

/**
 * Promote a specific document to active (deactivates siblings of same type).
 * @param {string} docId
 */
const setActiveDocument = async (docId) => {
  const record = await _getOrCreateRecord();
  record.setActiveDocument(docId); // throws if not found
  await record.save();
  log.info("Document set active", { docId });
};

/**
 * Remove a document entry by its subdocument _id.
 * @param {string} docId
 */
const removeDocument = async (docId) => {
  const record = await _getOrCreateRecord();
  record.removeDocument(docId);
  await record.save();
  log.info("Document removed", { docId });
};

export {
  addDocument,
  getActiveCvUrl,
  getActiveCoverLetterUrl,
  getAllDocuments,
  getAllCvs,
  getAllCoverLetters,
  setActiveDocument,
  removeDocument,
};
