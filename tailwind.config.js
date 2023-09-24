/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      display: ["Roboto", "sans-serif"],
      preview: ["Roboto Slab", "serif"],
      mono: ["Roboto Mono", "monospace"],
    },
    colors: {
      transparent: "transparent",
      cream: "#F5F5F5",
      white: "#FFFFFF",
      black: {
        600: "#35393F",
        700: "#2B2D31",
        800: "#1D1F22",
        900: "#151619",
      },
      grey: {
        600: "#E4E4E4",
        700: "#C1C4CB",
        800: "#7C8187",
        900: "#5A6069",
      },
      orange: {
        800: "#F39765",
        900: "#E46643",
      },
    },
    extend: {},
  },
  plugins: [require("tailwind-scrollbar")],
};
