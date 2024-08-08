/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  important: '#root',
  theme: {
    extend: {
      colors: {
        'light-bg': '#f5f5f5',
        'light-bg-theme': '#e5e0d9',
        'light-decoration': '#dfb288',
        'light-title': '#b98746',
        'button-check': '#83684e',
        'button-check-border': '#8f6f3b',
        'button-border': '#8f5117',
        'alertBG': '#f9f1f1',
      }
    },
  },
  plugins: [],
  corePlugins: {
    // preflight: false,
  },
}

