import { addons } from 'storybook/preview-api';
import { create } from 'storybook/theming';

// Configure Storybook UI
addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'Design System',
  }),
  sidebar: {
    showRoots: true,
  },
});
