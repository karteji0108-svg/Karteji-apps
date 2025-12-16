/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./public/**/*.{html,js}",
    "./SIC/**/*.{css,js}",
  ],
  theme: {
    extend: {
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        glass: "0 20px 40px rgba(0,0,0,.45)",
      },
    },
  },
  plugins: [],
};
