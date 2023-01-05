/* @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
  purge: ['./index.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
}
