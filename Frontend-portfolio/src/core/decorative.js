// ============================================================================
// DECORATIVE — Reusable background patterns, glows and overlays
// Use these as Tailwind className strings or inline style objects.
// ============================================================================

// ── CSS background-image patterns (inline style values) ─────────────────────

export const patterns = {
  /** Subtle dot-matrix grid — great for section backgrounds */
  dots: {
    backgroundImage:
      'radial-gradient(circle, rgba(99,102,241,0.15) 1px, transparent 1px)',
    backgroundSize: '28px 28px',
  },

  /** Fine grid lines — technical / blueprint feel */
  grid: {
    backgroundImage: `
      linear-gradient(rgba(99,102,241,0.07) 1px, transparent 1px),
      linear-gradient(90deg, rgba(99,102,241,0.07) 1px, transparent 1px)
    `,
    backgroundSize: '40px 40px',
  },

  /** Diagonal hatching — subtle texture */
  hatch: {
    backgroundImage:
      'repeating-linear-gradient(45deg, rgba(99,102,241,0.05) 0, rgba(99,102,241,0.05) 1px, transparent 0, transparent 50%)',
    backgroundSize: '12px 12px',
  },

  /** Cross marks — minimal tech accent */
  cross: {
    backgroundImage: `
      linear-gradient(rgba(99,102,241,0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(99,102,241,0.1) 1px, transparent 1px)
    `,
    backgroundSize: '60px 60px',
    backgroundPosition: 'center center',
  },

  /** Circuit-board grid — hero section tech aesthetic */
  circuit: {
    backgroundImage: `
      linear-gradient(rgba(99,102,241,0.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(99,102,241,0.08) 1px, transparent 1px),
      radial-gradient(circle 1.5px at 0 0, rgba(99,102,241,0.3) 1px, transparent 0)
    `,
    backgroundSize: '40px 40px, 40px 40px, 40px 40px',
  },
};

// ── Gradient glow overlays (inline style values) ─────────────────────────────

export const glows = {
  /** Top-left corner glow — hero section */
  topLeft:
    'radial-gradient(ellipse 60% 50% at 10% 5%, rgba(79,70,229,0.18) 0%, transparent 70%)',

  /** Bottom-right glow — section dividers */
  bottomRight:
    'radial-gradient(ellipse 50% 40% at 90% 95%, rgba(99,102,241,0.15) 0%, transparent 70%)',

  /** Centre radial — card/panel highlight */
  center:
    'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(79,70,229,0.12) 0%, transparent 70%)',

  /** Dual glow — full-section atmosphere */
  dual: `
    radial-gradient(ellipse 60% 50% at 10% 5%,  rgba(79,70,229,0.18) 0%, transparent 65%),
    radial-gradient(ellipse 50% 40% at 90% 95%, rgba(99,102,241,0.12) 0%, transparent 65%)
  `,
};

// ── Section wrapper helpers (Tailwind className strings) ─────────────────────

/** Base class applied to every section for consistent spacing */
export const sectionBase =
  'relative w-full overflow-hidden py-20 md:py-28';

/** Thin top-border accent line used to visually separate sections */
export const sectionDivider =
  'h-px w-full bg-gradient-to-r from-transparent via-primary-500/40 to-transparent my-2';

/** Card with minimal border, no heavy shadow */
export const card =
  'rounded-xl border border-gray-200/60 dark:border-white/[0.06] bg-white/80 dark:bg-white/[0.03] backdrop-blur-sm';

/** Pill / badge label */
export const pill =
  'inline-block px-3 py-1 rounded-full text-xs font-display font-semibold uppercase tracking-widest border border-primary-500/30 text-primary-500 bg-primary-500/10';

/** Glowing border ring on hover */
export const glowRing =
  'transition-all duration-300 hover:ring-2 hover:ring-primary-500/40 hover:ring-offset-2 hover:ring-offset-transparent';
