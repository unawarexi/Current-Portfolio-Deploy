// ============================================================================
// LANDING ROUTES - All public-facing portfolio routes
// ============================================================================

import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageLoader } from '@components/ui/Spinner';

// Critical path — loaded directly (no lazy)
import LandingPage from '@landing/LandingPage';

// Lazy-loaded secondary pages
const Library         = lazy(() => import('@landing/portfolio/Library'));
const SinglePortfolio = lazy(() => import('@landing/portfolio/SinglePortfolio'));
const SingleExperience = lazy(() => import('@landing/experience/SingleExperience'));

// ============================================================================
// LANDING ROUTES COMPONENT
// ============================================================================
const LandingRoutes = () => (
  <Suspense fallback={<PageLoader />}>
    <Routes>
      {/* Home — all sections assembled */}
      <Route index element={<LandingPage />} />

      {/* Portfolio pages */}
      <Route path="projects"     element={<Library />} />
      <Route path="projects/:id" element={<SinglePortfolio />} />

      {/* Experience detail */}
      <Route path="experience/:id" element={<SingleExperience />} />
    </Routes>
  </Suspense>
);

export default LandingRoutes;
