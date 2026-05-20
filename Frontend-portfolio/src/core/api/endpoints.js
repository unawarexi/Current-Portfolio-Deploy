// ============================================================================
// API ENDPOINTS — single source of truth for all backend routes
// ============================================================================

const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
  },

  PROJECTS: {
    BASE:  '/projects',
    BY_ID: (id) => `/projects/${id}`,
  },

  EXPERIENCE: {
    BASE:  '/experience',
    BY_ID: (id) => `/experience/${id}`,
  },

  ABOUT: {
    BASE: '/about',
    CV:   '/about/cv',
  },

  UPLOAD: {
    SINGLE:   '/upload',
    MULTIPLE: '/upload/multiple',
  },
};

export default ENDPOINTS;
