// ============================================================================
// APP - Root component: router, providers, lazy-loaded route groups
// ============================================================================

import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';

// Core providers & layout
import ThemeProvider from '@context/ThemeProvider';
import MainLayout from '@layout/MainLayout';
import { ErrorBoundary } from '@components/shared/ErrorBoundary';
import { ProtectedRoute } from '@components/shared/ProtectedRoute';
import { PageLoader } from '@components/ui/Spinner';
import queryClient from '@core/lib/QueryClient';

// Public landing routes (lazy)
const LandingRoutes = lazy(() => import('@landing/Landing.routes'));

// Admin auth & form (lazy)
const Confirmation         = lazy(() => import('@app/auth/Confirmation'));
const TabbedForm           = lazy(() => import('@landing/projects/TabbedForm'));
const ExperienceTabbedForm = lazy(() => import('@landing/experience/ExperienceTabbedForm'));
const AboutTabbedForm      = lazy(() => import('@landing/about/AboutTabbedForm'));

// ========================
// SCROLL TO HASH
// ========================
const ScrollToHash = () => {
  const { hash, pathname } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.substring(1));
      el?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash, pathname]);
  return null;
};

// ========================
// APP
// ========================
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <ThemeProvider>
          <Router basename="/">
            <ScrollToHash />

            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Admin auth — outside main layout */}
                <Route path="/auth" element={<Confirmation />} />

                {/* Protected admin form — new project */}
                <Route
                  path="/auth/new"
                  element={
                    <ProtectedRoute>
                      <TabbedForm />
                    </ProtectedRoute>
                  }
                />

                {/* Protected admin form — new experience */}
                <Route
                  path="/auth/new-experience"
                  element={
                    <ProtectedRoute>
                      <ExperienceTabbedForm />
                    </ProtectedRoute>
                  }
                />

                {/* Protected admin form — edit about profile */}
                <Route
                  path="/auth/edit-about"
                  element={
                    <ProtectedRoute>
                      <AboutTabbedForm />
                    </ProtectedRoute>
                  }
                />

                {/* Public portfolio — wrapped in main layout */}
                <Route
                  path="/*"
                  element={
                    <MainLayout>
                      <LandingRoutes />
                    </MainLayout>
                  }
                />
              </Routes>
            </Suspense>
          </Router>
      </ThemeProvider>
    </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
