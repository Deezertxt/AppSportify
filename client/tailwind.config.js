/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        first: '#0B6477', // Definir un nuevo color primario
        second: '#F0F9F9',
        third: '#F2D9CD',
        fourth: '#ACBOCA',
        fifth: '#EDEDED',
      },
    },
  },
  plugins: [],
}

