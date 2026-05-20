// ============================================================================
// API CLIENT - Axios instance for portfolio backend
// ============================================================================

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// ============================================================================
// AXIOS INSTANCE
// ============================================================================

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// ============================================================================
// REQUEST INTERCEPTOR - attach admin session token if present
// ============================================================================

apiClient.interceptors.request.use((config) => {
  try {
    const raw = localStorage.getItem('portfolio_auth');
    if (raw) {
      const { admin } = JSON.parse(raw);
      if (admin?.token) {
        config.headers.Authorization = `Bearer ${admin.token}`;
      }
    }
  } catch {
    // ignore
  }
  return config;
});

// ============================================================================
// RESPONSE INTERCEPTOR - normalise errors
// ============================================================================

apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    const message =
      error.response?.data?.message ?? error.message ?? 'Request failed';
    return Promise.reject(new Error(message));
  }
);

export default apiClient;
