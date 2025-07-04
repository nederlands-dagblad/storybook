import { MINIMAL_VIEWPORTS } from 'storybook/viewport';

import '../src/assets/css/tailwind.css';
import '../storybook/style.css';

const viewports = {
  mobile: {
    name: 'Mobile (default)',
    styles: {
      width: '375px', // fits <640px
      height: '667px',
    },
    type: 'mobile',
  },
  tablet: {
    name: 'Tablet (Tailwind md)',
    styles: {
      width: '768px', // Tailwind md
      height: '1024px',
    },
    type: 'tablet',
  },
  desktop: {
    name: 'Desktop (Tailwind lg)',
    styles: {
      width: '1024px', // Tailwind lg
      height: '768px',
    },
    type: 'desktop',
  },
  wideDesktop: {
    name: 'Wide Desktop (Tailwind xl)',
    styles: {
      width: '1280px',
      height: '800px',
    },
    type: 'desktop',
  },
  ...MINIMAL_VIEWPORTS,
}

/** @type { import('@storybook/react-vite').Preview } */
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
      viewports,
      defaultViewport: 'desktop',
    },
    docs: {
      source: {
        state: 'open',
      },
    },
    options: {
      storySort: {
        order: ['Intro', 'Tokens', 'Text Styles', 'Atoms' ,'Molecules', 'Components', 'Experimental', 'Guides', 'Hooks'],
        method: 'alphabetical',
        locales: 'en-US',
      }
    },
  },
};
