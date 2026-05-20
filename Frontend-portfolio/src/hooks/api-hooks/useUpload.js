// ============================================================================
// UPLOAD HOOKS — TanStack Query mutations for Cloudinary file upload
// ============================================================================

import { useMutation } from '@tanstack/react-query';
import { uploadRepository } from '@app/repository/upload-repository';
import { toast } from '@store/toast.store';

/** Upload a single file — returns { url, publicId } */
export const useUploadOne = () =>
  useMutation({
    mutationFn: (file) => uploadRepository.uploadOne(file).then((r) => r.data.data),
    onError: (err) => toast.error(err.message || 'Upload failed'),
  });

/** Upload multiple files — returns [{ url, publicId }, ...] */
export const useUploadMany = () =>
  useMutation({
    mutationFn: (files) => uploadRepository.uploadMany(files).then((r) => r.data.data),
    onError: (err) => toast.error(err.message || 'Upload failed'),
  });