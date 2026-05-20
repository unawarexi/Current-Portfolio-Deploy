import apiClient from '@core/api/client';
import ENDPOINTS from '@core/api/endpoints';

export const aboutRepository = {
  getProfile:    ()     => apiClient.get(ENDPOINTS.ABOUT.BASE),
  upsertProfile: (data) => apiClient.patch(ENDPOINTS.ABOUT.BASE, data),
  uploadCv:      (data) => apiClient.post(ENDPOINTS.ABOUT.CV, data),
};
