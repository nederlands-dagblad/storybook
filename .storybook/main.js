/** @type { import('@storybook/react-vite').StorybookConfig } */
export default {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../storybook/**/*.mdx',
  ],

  staticDirs: ['../public'],

  features: {
    viewportStoryGlobals: true,
  },

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-docs',
    'msw-storybook-addon',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: 'postcss',
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