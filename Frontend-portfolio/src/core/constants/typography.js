// ============================================================================
// TYPOGRAPHY — Futuristic font stack for the portfolio
// Rajdhani (display/headings) + Space Grotesk (body) + Share Tech Mono (code)
// ============================================================================

export const fontFamilies = {
  sans:    "'Space Grotesk', system-ui, sans-serif",
  display: "'Rajdhani', 'Space Grotesk', sans-serif",
  mono:    "'Share Tech Mono', monospace",
};

export const fontSizes = {
  xs:   { base: '0.625rem', sm: '0.75rem' },
  sm:   { base: '0.75rem',  sm: '0.875rem' },
  base: { base: '0.875rem', sm: '1rem' },
  lg:   { base: '1rem',     sm: '1.125rem' },
  xl:   { base: '1.125rem', sm: '1.25rem' },
  '2xl':{ base: '1.25rem',  sm: '1.5rem' },
  '3xl':{ base: '1.5rem',   sm: '1.875rem' },
  '4xl':{ base: '1.875rem', sm: '2.25rem' },
  '5xl':{ base: '2.25rem',  sm: '3rem' },
  '6xl':{ base: '2.75rem',  sm: '3.75rem' },
};

export const fontWeights = {
  light:    300,
  normal:   400,
  medium:   500,
  semibold: 600,
  bold:     700,
  extrabold:800,
};

export const lineHeights = {
  none:    1,
  tight:   1.25,
  snug:    1.375,
  normal:  1.5,
  relaxed: 1.625,
  loose:   2,
};

export const letterSpacing = {
  tighter: '-0.05em',
  tight:   '-0.025em',
  normal:  '0em',
  wide:    '0.025em',
  wider:   '0.05em',
  widest:  '0.1em',
};

// Pre-composed Tailwind className strings — use these in JSX
export const textStyles = {
  h1:        'font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-wide',
  h2:        'font-display text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-wide',
  h3:        'font-display text-xl sm:text-2xl md:text-3xl font-semibold leading-snug tracking-wide',
  h4:        'font-display text-lg sm:text-xl md:text-2xl font-semibold leading-snug',
  h5:        'font-display text-base sm:text-lg md:text-xl font-medium leading-normal',
  body:      'font-sans text-sm sm:text-base leading-relaxed',
  bodyLarge: 'font-sans text-base sm:text-lg leading-relaxed',
  bodySmall: 'font-sans text-xs sm:text-sm leading-normal',
  label:     'font-sans text-xs sm:text-sm font-medium leading-none tracking-wide uppercase',
  overline:  'font-display text-xs font-semibold uppercase tracking-widest',
  mono:      'font-mono text-sm',
  caption:   'font-sans text-xs leading-normal text-gray-500',
};

export default { fontFamilies, fontSizes, fontWeights, lineHeights, letterSpacing, textStyles };


