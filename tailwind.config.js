/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx,stories.js}",
  ],
  theme: {
    extend: {
      colors: {
        'blue': {
          900: '#09254A',
          500: '#02A1D9',
          400: '#02B4F2'
        },
        'pink': {
            900: '#E9425B',
            500: '#F2E1DF',
            400: '#FDECEF'
        },
        'brown': {
            900: '#3A1A1C',
            800: '#6A4847',
            500: '#A27675'
        },
        'neutral': {
            900: '#121212',
            800: '#222222',
            700: '#484544',
            600: '#727272',
            500: '#999999',
            400: '#BDBDBD',
            300: '#D4D4D4',
            200: '#F2F2F2',
            black: '#000000',
            white: '#FFFFFF'
        }
      },

        fontSize: {
            'heading-xs': 'var(--font-size-heading-xs)',
            'heading-s': 'var(--font-size-heading-s)',
            'heading-m': 'var(--font-size-heading-m)',
            'heading-l': 'var(--font-size-heading-l)',
            'heading-xl': 'var(--font-size-heading-xl)',
        },
    },
  },
  plugins: [],
}
