import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';

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
