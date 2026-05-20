// ============================================================================
// PROJECTS REPOSITORY — Firestore project data via backend
// ============================================================================

import apiClient from '@core/api/client';
import ENDPOINTS from '@core/api/endpoints';

export const projectsRepository = {
  /** GET /api/projects  — optional { category, limit } query params */
  getAll: (params) => apiClient.get(ENDPOINTS.PROJECTS.BASE, { params }),

  /** GET /api/projects/:id */
  getById: (id) => apiClient.get(ENDPOINTS.PROJECTS.BY_ID(id)),

  /** POST /api/projects  — requires auth token */
  create: (data) => apiClient.post(ENDPOINTS.PROJECTS.BASE, data),

  /** PATCH /api/projects/:id  — requires auth token */
  update: (id, data) => apiClient.patch(ENDPOINTS.PROJECTS.BY_ID(id), data),

  /** DELETE /api/projects/:id  — requires auth token */
  remove: (id) => apiClient.delete(ENDPOINTS.PROJECTS.BY_ID(id)),
};
