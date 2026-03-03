/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "sans-serif"], // This applies the new font!
      },
      colors: {
        vsbg: "#0B1120", // A deep, rich midnight blue for the background
        vscard: "#1E293B", // A slightly lighter slate blue for our Bento boxes
        vsblue: {
          light: "#60A5FA", // Soft blue for highlights
          DEFAULT: "#3B82F6", // Primary vibrant blue for buttons
          dark: "#1D4ED8", // Deep blue for hover effects
          glow: "#93C5FD", // Very light blue for glowing borders
        },
      },
    },
  },
  plugins: [],
};
