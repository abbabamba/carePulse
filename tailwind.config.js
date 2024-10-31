/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary":"#24AE7C",
        "secondary":"#0D2A1F",
        dark: {
          200: "#0D0F10",
          300: "#131619",
          400: "#1A1D21",
          500: "#363A3D",
          600: "#76828D",
          700: "#ABB8C4",
        },
      },
      gridTemplateColumns:{
        "auto": "repeat(auto-fill, minmax(200px, 1fr))"
      }
    },
  },
  plugins: [],
}