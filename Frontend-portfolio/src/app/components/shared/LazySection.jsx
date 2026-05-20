// ============================================================================
// LazySection — renders a placeholder until the section enters view,
// then mounts the real section exactly once (React.lazy + Suspense per slot).
//
// IMPORTANT: pass a stable `Component` created with React.lazy() at module
// level (not inside render) to avoid remounting on every re-render.
//
// Usage (in LandingPage.jsx):
//   const LazyAbout = lazy(() => import('@landing/about/AboutSection'));
//   <LazySection Component={LazyAbout} minHeight="80vh" />
// ============================================================================
import React, { Suspense, memo } from 'react';
import useSectionInView from '@hooks/useSectionInView';

const Placeholder = ({ minHeight = '40vh' }) => (
  <div style={{ minHeight }} className="w-full bg-transparent" aria-hidden="true" />
);

const LazySection = memo(({ Component, minHeight = '60vh', skeletonHeight }) => {
  const { ref, inView } = useSectionInView({ rootMargin: '0px 0px -60px 0px' });

  return (
    <div ref={ref}>
      {inView ? (
        <Suspense fallback={<Placeholder minHeight={skeletonHeight ?? minHeight} />}>
          <Component />
        </Suspense>
      ) : (
        <Placeholder minHeight={minHeight} />
      )}
    </div>
  );
});

LazySection.displayName = 'LazySection';
export default LazySection;
