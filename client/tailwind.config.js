/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",          // Include the main HTML file
    "./src/**/*.{js,jsx,ts,tsx}",   // Include all JavaScript/TypeScript files in `src`
    "./src/Components/**/*.{js,jsx}",  // Specifically target your Components folder
    "./src/Views/**/*.{js,jsx}",       // Include Views folder files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

