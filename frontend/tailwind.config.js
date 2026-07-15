/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cobalt: {
          primary: "#111827",
          secondary: "#6B7280",
          tertiary: "#2563EB",
          neutral: "#F9FAFB",
          surface: "#FFFFFF",
          'on-primary': "#FFFFFF",
        }
      },
      borderRadius: {
        'cobalt-sm': '6px',
        'cobalt-md': '8px',
        'cobalt-lg': '12px',
      },
      spacing: {
        'cobalt-sm': '8px',
        'cobalt-md': '16px',
        'cobalt-lg': '32px',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}