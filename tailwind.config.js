/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'light-blue': '#87CEEB',
        'sky-blue': '#B8E3F5',
        'gold': '#FFD700',
        'gold-light': '#FFED4E',
        'dark-text': '#2C3E50'
      }
    }
  },
  plugins: []
}
