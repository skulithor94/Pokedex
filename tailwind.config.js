const colors = require('tailwindcss/colors')


module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'light-blue': colors.lightBlue,
        cyan: colors.cyan,
        transparent: 'transparent',
        current: 'currentColor',
        black: colors.black,
        white: colors.white,
        gray: colors.trueGray,
        indigo: colors.indigo,
        red: colors.rose,
        yellow:{ 
          DEFAULT:colors.amber,
          mustard: '#ffcb63'
        },
        pink: colors.pink,
        green: {
          light: '#d3ff89'
        }, 
        skyblue: {
          DEFAULT: '#46cfea'
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
