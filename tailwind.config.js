/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    borderRadius: {
      'none': '0',
      'sm': '0.125rem',
      DEFAULT: '0.25rem',
      DEFAULT: '4px',
      'md': '0.375rem',
      'lg': '0.5rem',
      'full': '9999px',
      'large': '12px',
      'rnd-6p': '12px',
      'rnd-2p': '4px'
    },
    extend: {
      fontFamily: {
        'sourcecode': ['Source Code Pro', 'monospace'],
        'crimson': ['Crimson Pro', 'serif'],
        'bungee': ['Bungee Spice', 'sans-serif'],
        'sevillana': ['Sevillana', 'cursive'],
        'amatic': ['Amatic SC', 'sans-serif'],
        'poppins-800': ['Poppins', 'sans-serif'],
        'poppins-500': ['Poppins', 'sans-serif'],
        'poppins-200': ['Poppins', 'sans-serif'],
      },
      colors: {
        'black-bg': '#121212',
        'white-e' : "#EEEEEE",
        'bone' : "#DFD0BB",
        'harvest-gold' : "#E5BD77",
        'seinna' : "#CC7952",
        "mule" : "#943D2C",
        "tundora" : "#474344"
      },
      maxHeight: {
        '500': '32rem',
      },
      height: {
        '400': '25rem',
      }
    },
  },
  plugins: [],
})