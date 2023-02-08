/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.tsx',
    './index.html'
  ],
  theme: {
    extend: {
      backgroundColor: {
        'green-550': 'rgb(30 180 85 / var(--tw-bg-opacity))'
      }
    },
  },
  plugins: [],
}
