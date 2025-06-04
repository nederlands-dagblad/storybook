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
    '@storybook/addon-viewport',
    '@storybook/addon-docs',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    }
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {}
  },

  core: {
    builder: '@storybook/builder-vite',
  },

  output: {
    dir: 'storybook-static',
  }
};
