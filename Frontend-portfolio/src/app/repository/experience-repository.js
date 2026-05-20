import apiClient from '@core/api/client';
import ENDPOINTS from '@core/api/endpoints';

export const experienceRepository = {
  getAll:    ()         => apiClient.get(ENDPOINTS.EXPERIENCE.BASE),
  getById:   (id)       => apiClient.get(ENDPOINTS.EXPERIENCE.BY_ID(id)),
  create:    (data)     => apiClient.post(ENDPOINTS.EXPERIENCE.BASE, data),
  update:    (id, data) => apiClient.patch(ENDPOINTS.EXPERIENCE.BY_ID(id), data),
  remove:    (id)       => apiClient.delete(ENDPOINTS.EXPERIENCE.BY_ID(id)),
};
