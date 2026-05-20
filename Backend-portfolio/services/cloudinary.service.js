// ============================================================================
// Cloudinary Service — upload & delete helpers
// ============================================================================
const cloudinary = require('../config/cloudinary.config');

/**
 * Upload a raw buffer to Cloudinary.
 * @param {Buffer} buffer
 * @param {{ folder?: string, publicId?: string }} options
 */
const uploadBuffer = (buffer, options = {}) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder:        options.folder  || 'portfolio',
        resource_type: 'auto',
        public_id:     options.publicId || undefined,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve({
          publicId: result.public_id,
          url:      result.secure_url,
          format:   result.format,
          bytes:    result.bytes,
          width:    result.width,
          height:   result.height,
        });
      }
    );
    stream.end(buffer);
  });

/**
 * Upload an array of buffers in parallel.
 * @param {Buffer[]} buffers
 * @param {{ folder?: string }} options
 */
const uploadMany = (buffers, options = {}) =>
  Promise.all(buffers.map((buf) => uploadBuffer(buf, options)));

/**
 * Delete a single asset by publicId.
 * @param {string} publicId
 */
const deleteFile = (publicId) =>
  cloudinary.uploader.destroy(publicId);

/**
 * Delete multiple assets — best-effort (errors are swallowed per item).
 * @param {string[]} publicIds
 */
const deleteMany = (publicIds) =>
  Promise.all(publicIds.map((id) => deleteFile(id).catch(() => {})));

module.exports = { uploadBuffer, uploadMany, deleteFile, deleteMany, uploadRaw: uploadBuffer };
