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

// No longer needed as we're using CSS classes directly

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
            ...primitiveFontSizes,
            'heading-xs': 'var(--font-size-heading-xs)',
            'heading-s': 'var(--font-size-heading-s)',
            'heading-m': 'var(--font-size-heading-m)',
            'heading-l': 'var(--font-size-heading-l)',
            'heading-xl': 'var(--font-size-heading-xl)',
            'body-xs': 'var(--font-size-body-xs)',
            'body-s': 'var(--font-size-body-s)',
            'body-m': 'var(--font-size-body-m)',
            'body-l': 'var(--font-size-body-l)',
            'body-xl': 'var(--font-size-body-xl)',
            'body-xxl': 'var(--font-size-body-xxl)',
            'body-drop-cap': 'var(--font-size-body-drop-cap)',
            'meta': 'var(--font-size-meta)'
        },
        lineHeight: lineHeights,
        letterSpacing: {
            ...letterSpacings,
            ...primitiveLetterSpacings,
            '0': 'var(--typography-letter-spacing-0)',
            's': 'var(--typography-letter-spacing-s)',
            'm': 'var(--typography-letter-spacing-m)',
            'l': 'var(--typography-letter-spacing-l)'
        },
    },
  },
  plugins: [
      tokenUtilities
  ],
}
