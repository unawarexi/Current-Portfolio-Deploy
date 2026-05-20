// ============================================================================
// COLORS — Single source of truth for the portfolio's color palette.
// Based on what the landing pages actually use:
//   Primary:  indigo scale  (brand, CTAs, active states)
//   Neutral:  gray scale    (text, backgrounds, borders)
//   Accent:   blue scale    (secondary decorative elements)
//   Dark:     custom dark-mode backgrounds
//   Semantic: status colors (success / warning / error / info)
// ============================================================================

export const colors = {
  primary: {
    50:  '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1',
    DEFAULT: '#4f46e5',
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
  },

  neutral: {
    50:  '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },

  accent: {
    300: '#93c5fd',
    400: '#60a5fa',
    DEFAULT: '#3b82f6',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
  },

  // Dark-mode background surfaces
  dark: {
    bg:      '#1a1a2e',   // page background
    surface: '#1b2a5b',   // card / panel background
    overlay: 'rgba(27, 42, 91, 0.33)', // semi-transparent card overlay
  },

  semantic: {
    success: '#22c55e',
    warning: '#f59e0b',
    error:   '#ef4444',
    info:    '#6366f1',
  },
};

export default colors;
