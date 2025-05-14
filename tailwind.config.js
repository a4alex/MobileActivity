/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Merriweather', 'ui-serif', 'Georgia', 'serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
            h1: {
              fontFamily: 'Merriweather, serif',
            },
            h2: {
              fontFamily: 'Merriweather, serif',
            },
            h3: {
              fontFamily: 'Merriweather, serif',
            },
            h4: {
              fontFamily: 'Merriweather, serif',
            },
          },
        },
      },
    },
  },
  plugins: [],
};