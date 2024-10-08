/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        first: '#6276A5', // Definir un nuevo color primario
        second: '#B2CDD4',
        third: '#F2D9CD',
        fourth: '#ACBOCA',
        fifth: '#EDEDED',
      },
    },
  },
  plugins: [],
}

