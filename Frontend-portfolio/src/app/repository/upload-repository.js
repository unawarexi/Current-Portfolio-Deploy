// ============================================================================
// UPLOAD REPOSITORY — Cloudinary file upload via backend
// ============================================================================

import apiClient from '@core/api/client';
import ENDPOINTS from '@core/api/endpoints';

export const uploadRepository = {
  /**
   * POST /api/upload
   * Uploads a single file and returns { url, publicId }
   * @param {File} file
   */
  uploadOne: (file) => {
    const form = new FormData();
    form.append('file', file);
    return apiClient.post(ENDPOINTS.UPLOAD.SINGLE, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  /**
   * POST /api/upload/multiple
   * Uploads multiple files and returns [{ url, publicId }, ...]
   * @param {File[]} files
   */
  uploadMany: (files) => {
    const form = new FormData();
    files.forEach((f) => form.append('files', f));
    return apiClient.post(ENDPOINTS.UPLOAD.MULTIPLE, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};
