/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        robotoslab: ['"Roboto Slab, serif"'],
        bebasneue: ["'Bebas Neue', sans-serif"],
        inclusive: ["'Inclusive Sans', sans-serif"]
      }
    },
  },
  plugins: [],
}

