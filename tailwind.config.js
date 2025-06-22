// tailwind.config.js
module.exports = {
  darkMode: 'class', // class-based dark mode for fine control
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#3b82f6',    // blue-500
          dark: '#2563eb',     // blue-600
          mutedLight: '#93c5fd', // blue-300
          mutedDark: '#1e40af'  // blue-900
        },
        background: {
          light: '#f9fafb',    // gray-50
          dark: '#121212',     // true dark bg
          cardLight: '#ffffff',
          cardDark: '#1f2937', // slate-800
          inputLight: '#f3f4f6',
          inputDark: '#374151'  // slate-700
        },
        text: {
          light: '#1f2937',    // gray-800
          dark: '#e5e7eb',     // gray-200
          mutedLight: '#6b7280',
          mutedDark: '#9ca3af'
        },
        border: {
          light: '#d1d5db',
          dark: '#4b5563'
        }
      }
    }
  },
  plugins: [],
};
