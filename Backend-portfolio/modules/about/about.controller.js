import * as service from "./about.service.js";
import { assetLinksService } from "../../services/asset-links.service.js";
import * as cloudinaryService from "../../services/cloudinary.service.js";
import { HttpStatus, ErrorCodes } from "../../config/constants.js";
import { createLogger } from "../../logs/logger.js";
import AdvancedFormatter from "../../utils/formatters.js";

const log = createLogger("About");

// ============================================================================
// GET PROFILE
// ============================================================================
const getProfile = async (_req, res) => {
  try {
    const [data, cvUrl, coverLetterUrl] = await Promise.all([
      service.get(),
      assetLinksService.getActiveCvUrl(),
      assetLinksService.getActiveCoverLetterUrl(),
    ]);

    const profile = {
      ...AdvancedFormatter.sanitizeProfileResponse(data || {}),
      ...(cvUrl && { cvUrl }),
      ...(coverLetterUrl && { coverLetterUrl }),
    };

    res.json({ success: true, data: profile });
  } catch (err) {
    log.error("getProfile", { error: err.message });
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
    // req.validated contains data already validated by Zod
    const { cvUrl: _cvUrl, coverLetterUrl: _coverLetterUrl, id: _id, updatedAt: _updatedAt, ...firebaseData } = req.validated;

    const saveResult = await service.upsert(firebaseData);

    const activeCvUrl = await assetLinksService.getActiveCvUrl();
    const activeCoverLetterUrl = await assetLinksService.getActiveCoverLetterUrl();

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
    log.error("upsertProfile", { error: err.message });
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: { message: "Failed to update profile.", details: err.message },
    });
  }
};

// ============================================================================
// UPLOAD CV
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

    const cloudinaryResult = await cloudinaryService.uploadRaw(file.buffer, {
      folder: "portfolio/cv",
      resource_type: "raw",
      public_id: "resume",
      format: "pdf",
    });

    const saved = await assetLinksService.addDocument({
      type: "cv",
      url: cloudinaryResult.secure_url,
      filename: file.originalname,
      cloudinaryPublicId: cloudinaryResult.public_id,
      name: `CV - ${new Date().toLocaleDateString()}`,
      isActive: true,
    });

    res.json({
      success: true,
      data: {
        cvUrl: cloudinaryResult.secure_url,
        documentId: saved._id,
      },
    });
  } catch (err) {
    log.error("uploadCv", { error: err.message });
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: { message: "Failed to upload CV." },
    });
  }
};

// ============================================================================
// UPLOAD COVER LETTER
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

    const cloudinaryResult = await cloudinaryService.uploadRaw(file.buffer, {
      folder: "portfolio/cover-letter",
      resource_type: "raw",
      public_id: "cover-letter",
      format: "pdf",
    });

    const saved = await assetLinksService.addDocument({
      type: "cover-letter",
      url: cloudinaryResult.secure_url,
      filename: file.originalname,
      cloudinaryPublicId: cloudinaryResult.public_id,
      name: `Cover Letter - ${new Date().toLocaleDateString()}`,
      isActive: true,
    });

    res.json({
      success: true,
      data: {
        coverLetterUrl: cloudinaryResult.secure_url,
        documentId: saved._id,
      },
    });
  } catch (err) {
    log.error("uploadCoverLetter", { error: err.message });
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: { message: "Failed to upload cover letter." },
    });
  }
};

// ============================================================================
// GET ALL DOCUMENTS
// ============================================================================
const getDocuments = async (_req, res) => {
  try {
    const [cvs, coverLetters] = await Promise.all([
      assetLinksService.getAllCvs(),
      assetLinksService.getAllCoverLetters(),
    ]);

    res.json({
      success: true,
      data: { cvs, coverLetters },
    });
  } catch (err) {
    log.error("getDocuments", { error: err.message });
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: { message: "Failed to fetch documents." },
    });
  }
};

// ============================================================================
// SET ACTIVE DOCUMENT
// ============================================================================
const setActiveDocument = async (req, res) => {
  try {
    const { id } = req.params;
    await assetLinksService.setActiveDocument(id);
    res.json({ success: true });
  } catch (err) {
    log.error("setActiveDocument", { error: err.message });
    const isNotFound = err.message === "Document not found";
    res
      .status(isNotFound ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR)
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
    await assetLinksService.removeDocument(id);
    res.json({ success: true });
  } catch (err) {
    log.error("deleteDocument", { error: err.message });
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
