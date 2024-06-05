/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        evergreen: '#2B4341',
        evergreenLight: '#2AA78D',
        evergrayLight: '#6F7373',
      }
    },
  },
  plugins: [],
}

