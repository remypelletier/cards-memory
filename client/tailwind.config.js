const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      zIndex: {
        '-10': '-10',
       }
    },
    minWidth: {
      '0': '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      'full': '100%',
      'md': defaultTheme.screens.md,
      'lg': defaultTheme.screens.lg,
      'xl': defaultTheme.screens.xl
     }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
