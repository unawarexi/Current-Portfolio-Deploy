// ============================================================================
// PROTECTED ROUTE - Guards admin routes using localStorage session
// Portfolio has one seeded admin — no user registration
// ============================================================================

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@store/auth.store';

export const ProtectedRoute = ({ children, redirectPath = '/auth' }) => {
  const { isAuthenticated, checkSession } = useAuthStore();
  const location = useLocation();

  // Re-validate session on each render
  const valid = isAuthenticated || checkSession();

  if (!valid) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

