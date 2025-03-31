import {
    primitiveColors,
    semanticColors,
    componentColors,
    spacing,
    fontFamilies,
    fontWeights,
    fontSizes,
    lineHeights,
    letterSpacings,
    primitiveFontFamilies,
    primitiveFontSizes,
    primitiveFontWeights,
    primitiveLetterSpacings
} from './tailwind.tokens.js';

import tokenUtilities from './tokens.utilities.js';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx,stories.js}",
    "./storybook/**/*.{mdx,vue,js,ts,jsx,tsx,stories.js}",
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
            // 'xs': 'var(--spacing-inset-spacing-inset-xs)',
            // 's': 'var(--spacing-inset-spacing-inset-s)',
            // 'm': 'var(--spacing-inset-spacing-inset-m)',
            // 'l': 'var(--spacing-inset-spacing-inset-l)',
            // 'xl': 'var(--spacing-inset-spacing-inset-xl)',
        },

        fontFamily: {
            ...fontFamilies,
            ...primitiveFontFamilies
        },
        fontWeight: {
            ...fontWeights,
            ...primitiveFontWeights
        },
        fontSize: {
            ...fontSizes,
            ...primitiveFontSizes
        },
        lineHeight: lineHeights,
        letterSpacing: {
            ...letterSpacings,
            ...primitiveLetterSpacings
        },
    },
  },
  plugins: [
      tokenUtilities
  ],
}
