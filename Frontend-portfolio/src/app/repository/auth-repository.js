// ============================================================================
// AUTH REPOSITORY — authentication API calls
// ============================================================================

import apiClient from '@core/api/client';
import ENDPOINTS from '@core/api/endpoints';

export const authRepository = {
  /**
   * POST /api/auth/login
   * @param {string} password
   */
  login: (password) => apiClient.post(ENDPOINTS.AUTH.LOGIN, { password }),
};
