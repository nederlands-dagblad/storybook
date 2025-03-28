import { ModeDecorator } from "./modeDecorator";

import '../src/assets/css/tailwind.css';

// Force Tailwind styles to be loaded
import '../src/assets/css/tailwind.css';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
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
}

export const tags = ['autodocs'];

export const decorators = [ModeDecorator];
