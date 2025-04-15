import '../src/assets/css/tailwind.css';
import '../storybook/style.css';

/** @type { import('@storybook/react').Preview } */
const preview = {
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
    docs: {
      source: {
        state: 'open',
      },
    },
  },
};

export default preview;
