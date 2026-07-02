// ============================================================================
// LANDING PAGE — Hero loads immediately; every section below the fold is
// deferred via LazySection (mounted only when it scrolls into view).
// This cuts initial bundle parse + paint to the Hero alone.
// ============================================================================

import React, { lazy } from 'react';
import SmoothScroll from '@core/animations/ParallaxProvider';
import Hero        from '@landing/hero/Hero';
import LazySection from '@components/shared/LazySection';

// Stable lazy references — defined OUTSIDE the component so they're never
// recreated and React never unmounts/remounts the section on re-render.
const LazyAbout      = lazy(() => import('@landing/about/AboutSection'));
const LazyExperience = lazy(() => import('@landing/experience/ExperienceSection'));
const LazyPortfolio  = lazy(() => import('@landing/portfolio/PortfolioOverview'));
const LazyContact    = lazy(() => import('@landing/contact/ContactSection'));

const LandingPage = () => (
  <SmoothScroll>
    {/* Hero — always eager-loaded, above the fold */}
    <Hero />

    {/* Below-fold sections mount only when they enter the viewport */}
    <LazySection Component={LazyAbout}      minHeight="80vh" />
    <LazySection Component={LazyExperience} minHeight="70vh" />
    <LazySection Component={LazyPortfolio}  minHeight="80vh" />
    <LazySection Component={LazyContact}    minHeight="60vh" />
  </SmoothScroll>
);

export default LandingPage;
