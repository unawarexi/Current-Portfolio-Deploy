// ============================================================================
// PROJECT LINKS MODEL — MongoDB
// Stores Cloudinary URLs and array of links for a Firebase Project ID
// ============================================================================
import mongoose from 'mongoose';

const projectLinksSchema = new mongoose.Schema({
  firebaseProjectId: { type: String, required: true, index: true, unique: true },
  coverImages: [{ type: String }],
  projectImages: [{ type: String }],
  githubLinks: [{ type: String }],
  googlePlayLinks: [{ type: String }],
  appStoreLinks: [{ type: String }],
  webLiveLinks: [{ type: String }],
  videoUrls: [{ type: String }],
}, { timestamps: true });

export default mongoose.model;('ProjectLinks', projectLinksSchema);
