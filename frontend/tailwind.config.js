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
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}