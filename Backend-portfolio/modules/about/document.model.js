import mongoose from "mongoose";

// ============================================================================
// DOCUMENT SCHEMA — Stores CV and Cover Letter links from Cloudinary
// ============================================================================

const documentItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: function () {
      return `${this.type} - ${new Date().toLocaleDateString()}`;
    },
  },
  // Type of document
  type: {
    type: String,
    enum: ["cv", "cover-letter"],
    required: true,
  },
  // Cloudinary URL
  url: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^https?:\/\/.+/.test(v),
      message: "Invalid URL",
    },
  },
  // Original filename
  filename: String,
  // Cloudinary public ID for easy deletion/updates
  cloudinaryPublicId: String,
  // When uploaded
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  // Whether this is the active/current version
  isActive: {
    type: Boolean,
    default: true,
  },
});

const documentsSchema = new mongoose.Schema(
  {
    // Single portfolio document collection (all CVs and cover letters in one place)
    documents: {
      type: [documentItemSchema],
      default: [],
    },
  },
  {
    collection: "documents", // Collection name
    timestamps: true, // Adds createdAt, updatedAt
  },
);

// ============================================================================
// HELPERS
// ============================================================================

documentsSchema.methods.getActiveCv = function () {
  return this.documents.find((d) => d.type === "cv" && d.isActive);
};

documentsSchema.methods.getActiveCoverLetter = function () {
  return this.documents.find((d) => d.type === "cover-letter" && d.isActive);
};

documentsSchema.methods.getAllCvs = function () {
  return this.documents.filter((d) => d.type === "cv");
};

documentsSchema.methods.getAllCoverLetters = function () {
  return this.documents.filter((d) => d.type === "cover-letter");
};

documentsSchema.methods.addDocument = function (doc) {
  // If this is being set as active, deactivate others of the same type
  if (doc.isActive) {
    this.documents
      .filter((d) => d.type === doc.type)
      .forEach((d) => {
        d.isActive = false;
      });
  }

  this.documents.push(doc);
  return this;
};

documentsSchema.methods.removeDocument = function (docId) {
  this.documents = this.documents.filter((d) => !d._id.equals(docId));
  return this;
};

documentsSchema.methods.setActiveDocument = function (docId) {
  const doc = this.documents.find((d) => d._id.equals(docId));
  if (!doc) throw new Error("Document not found");

  // Deactivate others of the same type
  this.documents
    .filter((d) => d.type === doc.type && !d._id.equals(docId))
    .forEach((d) => {
      d.isActive = false;
    });

  doc.isActive = true;
  return this;
};

const Documents = mongoose.model("Documents", documentsSchema);

export { Documents, documentItemSchema };
