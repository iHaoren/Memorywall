/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        // Cozy palette (semantic tokens)
        accent: "#1e2939", // pastel gray
        background: "#022f2e", // light beige
        primary: "#2D2D2D", // main text / headings
        muted: "#666666", // secondary text
        card: "#FFFFFF", // card background
        soft: "#FFF5EF", // very light warm background for tags
      },
    },
  },
  plugins: [],
};
