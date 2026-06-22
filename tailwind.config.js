/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto': 'repeat(auto-fit, minmax(200px, 1fr))',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ]

}

