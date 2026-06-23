import * as service from "./about.service.js";
import * as documentService from "./document.service.js";
import { aboutUpdateSchema } from "./about.schema.js";
import * as cloudinaryService from "../../services/cloudinary.service.js";
import { HttpStatus, ErrorCodes } from "../../config/constants.js";
import { createLogger } from "../../logs/logger.js";
const log = createLogger("About");

// ============================================================================
// GET PROFILE
// Fetches Firebase about data and merges the active CV url from MongoDB.
// ============================================================================
const getProfile = async (_req, res) => {
  try {
    const [data, cvUrl, coverLetterUrl] = await Promise.all([
      service.get(),
      documentService.getActiveCvUrl(),
      documentService.getActiveCoverLetterUrl(),
    ]);

    // Merge the live document urls on top of whatever is stored in Firebase
    const profile = {
      ...(data || {}),
      ...(cvUrl && { cvUrl }),
      ...(coverLetterUrl && { coverLetterUrl }),
    };

    res.json({ success: true, data: profile });
  } catch (err) {
    log.error("getProfile", { error: err });
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: { message: "Failed to fetch profile." },
    });
  }
};

// ============================================================================
// UPSERT PROFILE
// ============================================================================
const upsertProfile = async (req, res) => {
  try {
    console.log("📥 [CONTROLLER] Received body:", {
      ...req.body,
      goals: Array.isArray(req.body.goals)
        ? `[Array(${req.body.goals.length})]`
        : typeof req.body.goals,
      education: Array.isArray(req.body.education)
        ? `[Array(${req.body.education.length})]`
        : typeof req.body.education,
    });

    const raw = {
      ...req.body,
      openToWork:
        req.body.openToWork === "true" || req.body.openToWork === true,
      socials:
        typeof req.body.socials === "string"
          ? JSON.parse(req.body.socials)
          : req.body.socials || {},
    };

    console.log("📦 [CONTROLLER] After basic prep:", {
      name: raw.name,
      bio: raw.bio ? `${raw.bio.substring(0, 50)}...` : "EMPTY",
      openToWork: raw.openToWork,
      goals: Array.isArray(raw.goals)
        ? `[Array(${raw.goals.length})]`
        : "NOT_ARRAY",
      education: Array.isArray(raw.education)
        ? `[Array(${raw.education.length})]`
        : "NOT_ARRAY",
    });

    const result = aboutUpdateSchema.safeParse(raw);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      console.error("❌ [CONTROLLER] Validation failed:", {
        errors: fieldErrors,
        problematicFields: Object.keys(fieldErrors),
      });

      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        error: {
          code: ErrorCodes.VALIDATION_ERROR,
          details: fieldErrors,
          received: {
            fields: Object.keys(raw),
            bio: raw.bio ? `${raw.bio.length} chars` : "missing",
            goals: Array.isArray(raw.goals) ? raw.goals.length : "not_array",
            education: Array.isArray(raw.education)
              ? raw.education.length
              : "not_array",
          },
        },
      });
    }

    console.log("✅ [CONTROLLER] Validation passed, data:", {
      name: result.data.name,
      bio: result.data.bio ? `${result.data.bio.substring(0, 50)}...` : "EMPTY",
      goals: `${result.data.goals?.length || 0} items`,
      education: `${result.data.education?.length || 0} items`,
    });

    await service.upsert(result.data);

    res.json({ success: true });
  } catch (err) {
    log.error("upsertProfile", { error: err });
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: {
        message: "Failed to update profile.",
        details: err.message,
      },
    });
  }
};

// ============================================================================
// UPLOAD CV
// 1. Upload file buffer → Cloudinary
// 2. Save the resulting URL + metadata → MongoDB (Documents collection)
// 3. Return the secure URL to the caller
// ============================================================================
const uploadCv = async (req, res) => {
  try {
    const file = req.files?.cv?.[0] || req.file;
    if (!file) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        error: { message: "No CV file provided." },
      });
    }

    console.log("📤 [CONTROLLER] Uploading CV to Cloudinary:", {
      originalname: file.originalname,
      size: file.size,
    });

    // Step 1 — push to Cloudinary
    const cloudinaryResult = await cloudinaryService.uploadRaw(file.buffer, {
      folder: "portfolio/cv",
      resource_type: "raw",
      public_id: "resume",
      format: "pdf",
    });

    console.log(
      "✅ [CONTROLLER] Cloudinary upload done:",
      cloudinaryResult.secure_url,
    );

    // Step 2 — persist to MongoDB Documents collection
    // addDocument deactivates all previous CVs and marks this one active
    const saved = await documentService.addDocument({
      type: "cv",
      url: cloudinaryResult.secure_url,
      filename: file.originalname,
      cloudinaryPublicId: cloudinaryResult.public_id,
      name: `CV - ${new Date().toLocaleDateString()}`,
      isActive: true,
    });

    console.log("💾 [CONTROLLER] CV saved to MongoDB:", saved._id);

    res.json({
      success: true,
      data: {
        cvUrl: cloudinaryResult.secure_url,
        documentId: saved._id,
      },
    });
  } catch (err) {
    log.error("uploadCv", { error: err });
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: { message: "Failed to upload CV." },
    });
  }
};

// ============================================================================
// UPLOAD COVER LETTER
// Mirrors uploadCv but stores type "cover-letter".
// ============================================================================
const uploadCoverLetter = async (req, res) => {
  try {
    const file = req.files?.coverLetter?.[0] || req.file;
    if (!file) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        error: { message: "No cover letter file provided." },
      });
    }

    console.log("📤 [CONTROLLER] Uploading cover letter to Cloudinary:", {
      originalname: file.originalname,
      size: file.size,
    });

    // Step 1 — push to Cloudinary
    const cloudinaryResult = await cloudinaryService.uploadRaw(file.buffer, {
      folder: "portfolio/cover-letter",
      resource_type: "raw",
      public_id: "cover-letter",
      format: "pdf",
    });

    console.log(
      "✅ [CONTROLLER] Cloudinary upload done:",
      cloudinaryResult.secure_url,
    );

    // Step 2 — persist to MongoDB Documents collection
    const saved = await documentService.addDocument({
      type: "cover-letter",
      url: cloudinaryResult.secure_url,
      filename: file.originalname,
      cloudinaryPublicId: cloudinaryResult.public_id,
      name: `Cover Letter - ${new Date().toLocaleDateString()}`,
      isActive: true,
    });

    console.log("💾 [CONTROLLER] Cover letter saved to MongoDB:", saved._id);

    res.json({
      success: true,
      data: {
        coverLetterUrl: cloudinaryResult.secure_url,
        documentId: saved._id,
      },
    });
  } catch (err) {
    log.error("uploadCoverLetter", { error: err });
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: { message: "Failed to upload cover letter." },
    });
  }
};

// ============================================================================
// GET ALL DOCUMENTS  (list view — all CVs and cover letters)
// ============================================================================
const getDocuments = async (_req, res) => {
  try {
    const [cvs, coverLetters] = await Promise.all([
      documentService.getAllCvs(),
      documentService.getAllCoverLetters(),
    ]);

    res.json({
      success: true,
      data: { cvs, coverLetters },
    });
  } catch (err) {
    log.error("getDocuments", { error: err });
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: { message: "Failed to fetch documents." },
    });
  }
};

// ============================================================================
// SET ACTIVE DOCUMENT  (promote a specific version)
// ============================================================================
const setActiveDocument = async (req, res) => {
  try {
    const { id } = req.params;
    await documentService.setActiveDocument(id);
    res.json({ success: true });
  } catch (err) {
    log.error("setActiveDocument", { error: err });
    const isNotFound = err.message === "Document not found";
    res
      .status(
        isNotFound ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR,
      )
      .json({
        success: false,
        error: { message: err.message || "Failed to update active document." },
      });
  }
};

// ============================================================================
// DELETE DOCUMENT
// ============================================================================
const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    await documentService.removeDocument(id);
    res.json({ success: true });
  } catch (err) {
    log.error("deleteDocument", { error: err });
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: { message: "Failed to delete document." },
    });
  }
};

export {
  getProfile,
  upsertProfile,
  uploadCv,
  uploadCoverLetter,
  getDocuments,
  setActiveDocument,
  deleteDocument,
};
