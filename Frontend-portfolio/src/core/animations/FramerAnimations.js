// ============================================================================
// FRAMER MOTION VARIANTS — reusable animation presets for landing sections
// ============================================================================

// ── Entrance variants ────────────────────────────────────────────────────────

export const fadeInUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export const fadeInDown = {
  hidden:  { opacity: 0, y: -40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export const fadeInLeft = {
  hidden:  { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

export const fadeInRight = {
  hidden:  { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] } },
};

export const smoothPopIn = {
  hidden:  { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
};

// ── Stagger containers ────────────────────────────────────────────────────────

export const staggerContainer = (stagger = 0.1, delayChildren = 0.1) => ({
  hidden:  {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
});

/** Child item — pair with staggerContainer */
export const staggerItem = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

// ── Hover / interaction ───────────────────────────────────────────────────────

export const cardHover = {
  rest:  { scale: 1, y: 0 },
  hover: { scale: 1.02, y: -4, transition: { duration: 0.25, ease: 'easeOut' } },
};

export const buttonHover = {
  rest:  { scale: 1 },
  hover: { scale: 1.04, transition: { duration: 0.2 } },
  tap:   { scale: 0.97 },
};

// ── Carousel / slider ─────────────────────────────────────────────────────────

export const slideLeft = {
  initial: { opacity: 0, x: 80 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.45, ease: 'easeOut' } },
  exit:    { opacity: 0, x: -80, transition: { duration: 0.3 } },
};

export const slideRight = {
  initial: { opacity: 0, x: -80 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.45, ease: 'easeOut' } },
  exit:    { opacity: 0, x: 80, transition: { duration: 0.3 } },
};

// ── Page transition ───────────────────────────────────────────────────────────

export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

// ── Floating / idle loop ──────────────────────────────────────────────────────

export const floatLoop = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
  },
};

export const pulseGlow = {
  animate: {
    opacity: [0.4, 0.8, 0.4],
    scale:   [1, 1.05, 1],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },
};

export const toastVariants = {
  initial: { opacity: 0, y: 50, scale: 0.9 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit:    { opacity: 0, y: 20, scale: 0.9 },
  transition: { type: "spring", stiffness: 300, damping: 25 },
};
