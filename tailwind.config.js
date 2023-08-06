/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      xs: "475px",
      ...defaultTheme.screens,
    },
  },
  variants: {
    typography: ["dark"],
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["cmyk", "night"],
    darkTheme: "night",
  },
  important: true,
};
