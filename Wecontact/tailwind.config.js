module.exports = {
  content: [
    "./src/*.{html,js,css}",
    "./views/*.ejs",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    {
      tailwindcss: {},
      autoprefixer: {},
    },
  ],
};