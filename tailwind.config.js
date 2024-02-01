/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'azulSebrae': '#084298',
      'white': 'white',
      'cinzaSebrae' : '#6c757d',
      'neutralSebrae' : '#a3a3a3',
      'textAzulSebrae': '#084298',
      'red': 'red',
      'redEscuro': '#b91c1c',
      'green': 'green',
      'transparent': 'transparent'
    },
    borderWidth: {
      DEFAULT: '0.5px',
      '0': '0.5px',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '6': '6px',
      '8': '8px',
    },
    extend: {},
  },
  plugins: [],
}