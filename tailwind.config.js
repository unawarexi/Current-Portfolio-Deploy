/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // Ensure dark mode is enabled
  theme: {
    extend: {
      colors: {
        // Add custom colors if needed
        darkBackground: '#1a1a2e',
        darkText: '#e0e0e0',
      },
    },
  },
  plugins: [],
}

