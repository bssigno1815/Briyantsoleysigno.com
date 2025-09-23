/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    colors: {
      orange: "#f97316",   // BSS Orange
      black: "#000000",
      white: "#ffffff",    // (only for text/background when needed)
      transparent: "transparent",
    },
    extend: {},
  },
  plugins: [],
};
