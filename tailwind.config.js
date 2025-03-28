import {
    primitiveColors,
    semanticColors,
    componentColors,
    spacing
} from './tailwind.tokens.js';

import tokenUtilities from './tokens.utilities.js';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx,stories.js}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
        colors: {
            ...primitiveColors,
            ...semanticColors,
            ...componentColors
        },

        spacing: {
            ...spacing,
            'xs': 'var(--spacing-inset-spacing-inset-xs)',
            's': 'var(--spacing-inset-spacing-inset-s)',
            'm': 'var(--spacing-inset-spacing-inset-m)',
            'l': 'var(--spacing-inset-spacing-inset-l)',
            'xl': 'var(--spacing-inset-spacing-inset-xl)',
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
  plugins: [
      tokenUtilities
  ],
}
