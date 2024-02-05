/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      keyframes: {
        "text-gradient": {
          "0%": {
            "background-size": "100%",
          },
          "100%": {
            "background-size": "200%",
          },
        },
      },
      animation: {
        "text-gradient": "text-gradient 4s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [],
};
