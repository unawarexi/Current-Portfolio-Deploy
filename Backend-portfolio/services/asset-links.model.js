import mongoose from 'mongoose';

const documentItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['cv', 'cover-letter'], required: true },
  url: { type: String, required: true },
  filename: String,
  cloudinaryPublicId: String,
  uploadedAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
});

const assetLinksSchema = new mongoose.Schema({
  firebaseId: { type: String, required: true, index: true },
  entityType: { type: String, enum: ['project', 'experience', 'about'], required: true },
  
  // Image arrays (mainly for projects, but could be used by others)
  coverImages:   [{ type: String }],
  projectImages: [{ type: String }],
  
  // Document links (mainly for about, CV etc.)
  documents:     [documentItemSchema],

  // Single URLs if needed
  avatar: { type: String },
  logo:   { type: String },
}, { timestamps: true });

// Ensure we only have one asset record per firebase entity
assetLinksSchema.index({ firebaseId: 1, entityType: 1 }, { unique: true });

export const AssetLinks = mongoose.model('AssetLinks', assetLinksSchema);
