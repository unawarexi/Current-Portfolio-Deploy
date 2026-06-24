import { db } from "../../config/firebase.config.js";
import { createLogger } from "../../logs/logger.js";

const log = createLogger("About");
const DOC_ID = "profile"; // single document in 'about' collection

/**
 * Fetch raw profile from Firebase.
 * NOTE: cvUrl is NOT stored here — it is fetched from MongoDB by the controller.
 */
const get = async () => {
  try {
    const doc = await db.collection("about").doc(DOC_ID).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  } catch (err) {
    log.error("get", { error: err.message });
    throw err;
  }
};

/**
 * Upsert profile.
 *
 * Receives data that has ALREADY been formatted and validated by the controller.
 * Does NOT re-run AdvancedFormatter — doing so would corrupt already-structured
 * arrays (education objects → strings, etc.) and overwrite numeric stats with 0.
 *
 * cvUrl is intentionally excluded from the payload — it lives in MongoDB only.
 *
 * @param {Object} data - Pre-validated data from controller (no cvUrl)
 * @returns {{ success: boolean, data: Object, savedAt: string }}
 */
const upsert = async (data) => {
  try {
    console.log(" [SERVICE] Saving pre-validated data to Firebase:", {
      fields: Object.keys(data),
      yearsOfExperience: data.yearsOfExperience,
      projectsCount: data.projectsCount,
      clientsCount: data.clientsCount,
      rating: data.rating,
    });

    // ============================================================================
    // PREPARE PAYLOAD FOR FIREBASE
    // Ensure cvUrl never leaks into Firebase even if accidentally passed in.
    // ============================================================================
    const { cvUrl: _cv, coverLetterUrl: _cl, ...firebaseSafeData } = data;

    const payload = {
      ...firebaseSafeData,
      updatedAt: new Date().toISOString(),
    };

    console.log(" [SERVICE] Saving to Firebase:", {
      id: DOC_ID,
      timestamp: payload.updatedAt,
    });

    await db.collection("about").doc(DOC_ID).set(payload, { merge: true });

    log.info("About profile upserted successfully");

    return {
      success: true,
      data: firebaseSafeData,
      savedAt: payload.updatedAt,
    };
  } catch (err) {
    log.error("upsert", { error: err.message, stack: err.stack });
    throw new Error(`Failed to upsert profile: ${err.message}`);
  }
};

/**
 * Update CV URL — intentionally a no-op for Firebase.
 * cvUrl is managed exclusively in MongoDB via document.service.js.
 * Kept for backward compatibility; callers should use documentService.addDocument instead.
 */
const updateCv = async (_cvUrl) => {
  log.warn(
    "updateCv called on about.service — cvUrl lives in MongoDB only, skipping Firebase write.",
  );
};

/**
 * Get formatted profile as stored in Firebase.
 * Returns data as-is (formatter was applied on write, not on read).
 */
const getFormatted = async () => {
  try {
    const doc = await db.collection("about").doc(DOC_ID).get();
    if (!doc.exists) return null;

    const data = { id: doc.id, ...doc.data() };

    console.log(" [SERVICE] Retrieved profile:", {
      name: data.name,
      sections: {
        vision: data.vision?.sections?.length || 0,
        mission: data.mission?.sections?.length || 0,
        values: data.values?.length || 0,
        education: data.education?.length || 0,
      },
    });

    return data;
  } catch (err) {
    log.error("getFormatted", { error: err.message });
    throw err;
  }
};

/**
 * Validate data structure before saving.
 * Ensures all arrays are properly formatted.
 */
const validateStructure = (data) => {
  const issues = [];

  if (data.bio && typeof data.bio !== "string") {
    issues.push("Bio must be a string");
  }

  if (data.goals && !Array.isArray(data.goals)) {
    issues.push("Goals must be an array");
  }

  if (data.values && !Array.isArray(data.values)) {
    issues.push("Values must be an array");
  }

  if (data.education && !Array.isArray(data.education)) {
    issues.push("Education must be an array");
  }

  if (data.certifications && !Array.isArray(data.certifications)) {
    issues.push("Certifications must be an array");
  }

  if (issues.length > 0) {
    log.warn("Validation issues detected:", { issues });
    return { valid: false, issues };
  }

  return { valid: true, issues: [] };
};

export { get, getFormatted, upsert, updateCv, validateStructure };
