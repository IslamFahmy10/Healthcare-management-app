/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#06283D',
        secondary: '#1363DF',
        accent: '#47B5FF',
        light: '#DFF6FF'
      },
      borderRadius: {
        'ellipse': '50% 25%',
      },
      fontFamily: {
        'merriweather': ['Merriweather', 'serif'],
      },
      fontWeight: {
        'light': 300,
        'regular': 400,
        'bold': 700,
        'black': 900,
      },
      backgroundImage: {
        'custom-pattern': "url('./src/assets/background.jpg')",
      },
    },
  },
  plugins: [],
}

