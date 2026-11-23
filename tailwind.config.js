/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        assam: {
          dark: '#0f172a',
          navy: '#1e293b',
          teal: '#0d9488',
          saffron: '#ea580c',
          green: '#15803d',
          gold: '#d97706'
        }
      }
    },
  },
  plugins: [],
}
