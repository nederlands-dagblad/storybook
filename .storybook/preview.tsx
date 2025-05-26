import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

import '../src/assets/css/tailwind.css';
import '../storybook/style.css';

/** @type { import('@storybook/react').Preview } */
export default {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
    },
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'desktop',
    },
    docs: {
      source: {
        state: 'open',
      },
    },
    options: {
      storySort: {
        order: ['Intro', 'General', 'Atoms', 'Experimental', 'Guides', 'Hooks'],
        method: 'alphabetical',
        locales: 'en-US',
      }
    },
  },
};
