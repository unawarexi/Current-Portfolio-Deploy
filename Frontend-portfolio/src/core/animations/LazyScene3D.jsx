// ============================================================================
// LAZY SCENE 3D — code-split wrapper so Three.js (~800 kB) is never bundled
// in the initial JS chunk. The canvas only loads after the page is interactive.
// ============================================================================
import React, { Suspense, lazy } from 'react';

const Scene3D = lazy(() => import('./Scene3D'));

const LazyScene3D = (props) => (
  <Suspense fallback={null}>
    <Scene3D {...props} />
  </Suspense>
);

export default LazyScene3D;
