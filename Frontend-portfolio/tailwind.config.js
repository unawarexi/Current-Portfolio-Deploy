/** @type {import('tailwindcss').Config} */
import colors from './src/core/constants/colors.js';

export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans:    ['Space Grotesk', 'system-ui', 'sans-serif'],
        display: ['Syne', 'Rajdhani', 'Space Grotesk', 'sans-serif'],
        mono:    ['Share Tech Mono', 'monospace'],
      },
      colors: {
        primary: colors.primary,
        accent:  colors.accent,
        burgundy: colors.burgundy,
        dark:    colors.dark,
        success: colors.semantic.success,
        warning: colors.semantic.warning,
        danger:  colors.semantic.error,
      },
    },
  },
  plugins: [],
};

