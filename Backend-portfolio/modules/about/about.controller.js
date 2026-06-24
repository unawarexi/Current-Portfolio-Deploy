import * as service from "./about.service.js";
import * as documentService from "./document.service.js";
import { aboutUpdateSchema } from "./about.schema.js";
import * as cloudinaryService from "../../services/cloudinary.service.js";
import { HttpStatus, ErrorCodes } from "../../config/constants.js";
import { createLogger } from "../../logs/logger.js";
import AdvancedFormatter from "../../utils/formatters.js";

const log = createLogger("About");

// ============================================================================
// GET PROFILE
// Fetches Firebase about data and merges the active CV url from MongoDB.
// The cvUrl lives in MongoDB only — we fetch it alongside and attach it.
// ============================================================================
const getProfile = async (_req, res) => {
  try {
    const [data, cvUrl, coverLetterUrl] = await Promise.all([
      service.get(),
      documentService.getActiveCvUrl(),
      documentService.getActiveCoverLetterUrl(),
    ]);

    // Merge the live document urls on top of whatever is stored in Firebase.
    // cvUrl is intentionally NOT stored in Firebase — it always comes from MongoDB.
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
    console.log(" [CONTROLLER] Received raw body:", {
      fields: Object.keys(req.body),
      sampleBio: req.body.bio ? `${req.body.bio.substring(0, 40)}...` : "EMPTY",
    });

    // ============================================================================
    // STEP 1: STRIP FIELDS THAT MUST NOT GO INTO FIREBASE
    // - cvUrl      → lives in MongoDB only (document service)
    // - id         → Firebase doc id, not a data field
    // - updatedAt  → set server-side in the service
    // ============================================================================
    const {
      cvUrl: _cvUrl,
      coverLetterUrl: _coverLetterUrl,
      id: _id,
      updatedAt: _updatedAt,
      ...bodyWithoutManagedFields
    } = req.body;

    // ============================================================================
    // STEP 2: BASIC DATA PREPARATION
    // Convert form-encoded scalar types before the formatter sees them.
    // ============================================================================
    const raw = {
      ...bodyWithoutManagedFields,
      openToWork:
        bodyWithoutManagedFields.openToWork === "true" ||
        bodyWithoutManagedFields.openToWork === true,

      // Numeric stats — coerce strings like '5', '25', '0' to numbers here
      // so the formatter never receives stringified zeros.
      yearsOfExperience: Number(
        bodyWithoutManagedFields.yearsOfExperience ?? 0,
      ),
      projectsCount: Number(bodyWithoutManagedFields.projectsCount ?? 0),
      clientsCount: Number(bodyWithoutManagedFields.clientsCount ?? 0),
      rating: Number(bodyWithoutManagedFields.rating ?? 5.0),

      socials:
        typeof bodyWithoutManagedFields.socials === "string"
          ? JSON.parse(bodyWithoutManagedFields.socials)
          : bodyWithoutManagedFields.socials || {},
    };

    console.log(" [CONTROLLER] Basic data prep complete, stats:", {
      yearsOfExperience: raw.yearsOfExperience,
      projectsCount: raw.projectsCount,
      clientsCount: raw.clientsCount,
      rating: raw.rating,
    });

    // ============================================================================
    // STEP 3: APPLY ADVANCED FORMATTER (ONCE — controller only)
    // The service will NOT re-run the formatter.
    // ============================================================================
    const formatted = AdvancedFormatter.formatAboutProfile(raw);

    console.log(" [CONTROLLER] Formatting applied:", {
      name: formatted.name,
      bio: formatted.bio ? `${formatted.bio.substring(0, 50)}...` : "EMPTY",
      goals: `${formatted.goals?.length ?? 0} items`,
      values: `${formatted.values?.length ?? 0} items`,
      hobbies: `${formatted.hobbies?.length ?? 0} items`,
      education: `${formatted.education?.length ?? 0} items`,
      certifications: `${formatted.certifications?.length ?? 0} items`,
      languages: `${formatted.languages?.length ?? 0} items`,
      yearsOfExperience: formatted.yearsOfExperience,
      projectsCount: formatted.projectsCount,
      clientsCount: formatted.clientsCount,
      rating: formatted.rating,
    });

    // ============================================================================
    // STEP 4: VALIDATE AGAINST SCHEMA
    // ============================================================================
    const result = aboutUpdateSchema.safeParse(formatted);

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
          hint: "Check that arrays are properly formatted and text fields are valid",
        },
      });
    }

    console.log(" [CONTROLLER] Schema validation passed");

    // ============================================================================
    // STEP 5: SAVE VALIDATED DATA TO FIREBASE (via service — no re-formatting)
    // cvUrl is intentionally excluded from result.data before saving.
    // ============================================================================
    const { cvUrl: _cv, coverLetterUrl: _cl, ...firebaseData } = result.data;

    const saveResult = await service.upsert(firebaseData);

    console.log(" [CONTROLLER] Profile saved successfully:", {
      savedAt: saveResult.savedAt,
    });

    // Fetch the current active cvUrl from MongoDB to return alongside saved data
    const activeCvUrl = await documentService.getActiveCvUrl();
    const activeCoverLetterUrl =
      await documentService.getActiveCoverLetterUrl();

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: {
        formatted: {
          ...saveResult.data,
          ...(activeCvUrl && { cvUrl: activeCvUrl }),
          ...(activeCoverLetterUrl && { coverLetterUrl: activeCoverLetterUrl }),
        },
        timestamp: saveResult.savedAt,
      },
    });
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
// NOTE: cvUrl is NEVER written to Firebase — it lives in MongoDB only.
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

    console.log(" [CONTROLLER] Uploading CV to Cloudinary:", {
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
      " [CONTROLLER] Cloudinary upload done:",
      cloudinaryResult.secure_url,
    );

    // Step 2 — persist to MongoDB Documents collection only
    // addDocument deactivates all previous CVs and marks this one active
    const saved = await documentService.addDocument({
      type: "cv",
      url: cloudinaryResult.secure_url,
      filename: file.originalname,
      cloudinaryPublicId: cloudinaryResult.public_id,
      name: `CV - ${new Date().toLocaleDateString()}`,
      isActive: true,
    });

    console.log(" [CONTROLLER] CV saved to MongoDB:", saved._id);

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

    console.log(" [CONTROLLER] Uploading cover letter to Cloudinary:", {
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
      " [CONTROLLER] Cloudinary upload done:",
      cloudinaryResult.secure_url,
    );

    // Step 2 — persist to MongoDB Documents collection only
    const saved = await documentService.addDocument({
      type: "cover-letter",
      url: cloudinaryResult.secure_url,
      filename: file.originalname,
      cloudinaryPublicId: cloudinaryResult.public_id,
      name: `Cover Letter - ${new Date().toLocaleDateString()}`,
      isActive: true,
    });

    console.log(" [CONTROLLER] Cover letter saved to MongoDB:", saved._id);

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
