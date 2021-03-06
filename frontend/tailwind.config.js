const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.js',
    './src/**/*.jsx',
    './src/**/*.ts',
    './src/**/*.tsx',
    './public/index.html',
  ],
  theme: {
    extend: {colors: {
      blue: colors.cyan,
    },}
  },
  variants: {},
  plugins: []
}
