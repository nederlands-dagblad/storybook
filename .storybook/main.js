/** @type { import('@storybook/react-vite').StorybookConfig } */
module.exports = {
  stories: [
      '../src/**/*.mdx',
      '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
      '../storybook/**/*.mdx',
  ],
  features: {
    viewportStoryGlobals: true,
  },
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-viewport',
    '@storybook/addon-docs',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  docs: {
    autodocs: 'tag',
  },
  core: {
    builder: '@storybook/builder-vite',
  },
};
