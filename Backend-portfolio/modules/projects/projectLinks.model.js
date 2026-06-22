// ============================================================================
// PROJECT LINKS MODEL — MongoDB
// Stores ONLY Cloudinary image URLs for a Firebase Project ID
// All other links (github, play store, app store, etc.) are stored in Firebase
// ============================================================================
import mongoose from "mongoose";

const projectLinksSchema = new mongoose.Schema(
  {
    firebaseProjectId: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    coverImages: [{ type: String }],
    projectImages: [{ type: String }],
  },
  { timestamps: true },
);

export default mongoose.model("ProjectLinks", projectLinksSchema);
