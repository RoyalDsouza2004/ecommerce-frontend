/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        palanquin: ['Palanquin', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors:{
        "purple": "rgb(47,0, 255)",
        "green": "rgb(0,195,0)",
        "darkblue": "rgb(0,104,136)",
        "lightblack" : " rgb(46,46,46)"

      }
    },
  },
  plugins: [],
}