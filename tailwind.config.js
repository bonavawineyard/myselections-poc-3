module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        forrestgreen: "#013B2D",
        mint: "#50E3C2",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
