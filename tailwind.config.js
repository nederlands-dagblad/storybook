import {
    primitiveColors,
    semanticColors,
    componentColors,
    spacing,
    primitiveFontFamilies,
    primitiveFontSizes,
    primitiveFontWeights,
    primitiveLetterSpacings, primitiveBorderRadius, primitiveBorderWidths, semanticBorderRadius,
    primitiveBoxShadows
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

    //Safelist utilities that get purged in Storybook production builds
    safelist: [
        'line-clamp-5',
        'line-clamp-4',
        'line-clamp-3',
        'line-clamp-2',
        'line-clamp-1',
    ],
    
    darkMode: 'media',
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
                ...primitiveFontFamilies
            },
            fontWeight: {
                ...primitiveFontWeights
            },
            fontSize: {
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
            letterSpacing: {
                ...primitiveLetterSpacings,
                '0': 'var(--typography-letter-spacing-0)',
                's': 'var(--typography-letter-spacing-s)',
                'm': 'var(--typography-letter-spacing-m)',
                'l': 'var(--typography-letter-spacing-l)'
            },
            borderWidth: {
                ...primitiveBorderWidths
            },
            borderRadius: {
                ...primitiveBorderRadius,
                ...semanticBorderRadius,
            },
            boxShadow: {
                ...primitiveBoxShadows
            }
        },
    },
    plugins: [
        tokenUtilities
    ],
}
