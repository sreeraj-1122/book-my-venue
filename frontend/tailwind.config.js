/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF385C", 
        secondary: "#6A6A6A", 
        primaryfont: "#222222", 
        secondaryfont: "rgb(34, 34, 34)", 
        bgPrimary:"#E00B41",
      },
      fontFamily: {
        bold: ['AirbnbCerealBold', 'sans-serif'],
        medium: ['AirbnbCerealMedium', 'sans-serif'],
        light: ['AirbnbCerealLight', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

