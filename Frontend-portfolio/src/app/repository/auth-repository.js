// ============================================================================
// AUTH REPOSITORY — authentication API calls
// ============================================================================

import apiClient from '@core/api/client';
import ENDPOINTS from '@core/api/endpoints';

export const authRepository = {
  /**
   * POST /api/auth/login
   * @param {{ username: string, password: string }} credentials
   */
  login: ({ username, password }) => apiClient.post(ENDPOINTS.AUTH.LOGIN, { username, password }),
};
