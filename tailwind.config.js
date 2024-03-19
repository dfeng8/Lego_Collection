/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/home.html"],
  theme: {
    extend: {fantasy},
  },
  plugins: [require('daisyui'), require('@tailwindcss/typography')],
}

