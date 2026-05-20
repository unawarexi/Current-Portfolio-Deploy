// ============================================================================
// QUERY CLIENT - TanStack Query configuration
// ============================================================================

import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';

// ============================================================================
// RETRY FILTER — Never retry 401/403 (auth errors handled by interceptor)
// ============================================================================

const shouldRetry = (failureCount, error) => {
  // Don't retry auth errors — the interceptor handles token refresh / logout
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    if (status === 401 || status === 403) return false;
    // Don't retry client errors (4xx) except rate-limit (429)
    if (status && status >= 400 && status < 500 && status !== 429) return false;
  }
  return failureCount < 3;
};

// ============================================================================
// DEFAULT OPTIONS
// ============================================================================

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Data is considered fresh for 5 minutes
      staleTime: 5 * 60 * 1000,
      
      // Cache data for 30 minutes
      gcTime: 30 * 60 * 1000,
      
      // Smart retry: skip auth errors, retry server errors up to 3x
      retry: shouldRetry,
      
      // Retry delay with exponential backoff
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      
      // Don't refetch on window focus for better UX
      refetchOnWindowFocus: false,
      
      // Refetch on reconnect
      refetchOnReconnect: true,
    },
    mutations: {
      // Smart retry for mutations too
      retry: (failureCount, error) => shouldRetry(failureCount, error),
      
      // Retry delay
      retryDelay: 1000,
    },
  },
});

// ============================================================================
// QUERY KEYS FACTORY
// ============================================================================

export const queryKeys = {
  auth: {
    all: ['auth'],
    currentUser: () => [...queryKeys.auth.all, 'currentUser'],
  },

  projects: {
    all: ['projects'],
    list: (params) => [...queryKeys.projects.all, 'list', params],
    detail: (id) => [...queryKeys.projects.all, 'detail', id],
  },

  experience: {
    all: ['experience'],
    list: () => [...queryKeys.experience.all, 'list'],
    detail: (id) => [...queryKeys.experience.all, 'detail', id],
  },

  about: {
    all: ['about'],
    profile: () => [...queryKeys.about.all, 'profile'],
  },

  upload: {
    all: ['upload'],
  },
};

export default queryClient;
