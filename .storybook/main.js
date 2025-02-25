module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-docs',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  features: {
    storyStoreV7: false,
  },
  framework: {
    name: '@storybook/vue3-webpack5',
    options: {},
  },
  docs: {
    autodocs: true,
  },
  webpackFinal: async (config) => {
    // Make sure Tailwind is properly processed
    config.module.rules.push({
      test: /\.css$/,
      use: [
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                require('tailwindcss')({
                  // Force Tailwind to include all variants
                  safelist: [
                    // Button classes
                    'btn',
                    'btn-primary',
                    'btn-secondary',
                    'btn-white',
                    'btn-sm',
                    'btn-md',
                    'btn-lg',
                    
                    // Collapsed Card classes
                    'collapsed-card',
                    'collapsed-card-header',
                    'collapsed-card-content',
                    'border',
                    'border-t',
                    'rounded-lg',
                    'shadow-sm',
                    'overflow-hidden',
                    'transform',
                    'transition-transform',
                    'rotate-180',
                    
                    // Utility classes
                    'opacity-50',
                    'cursor-not-allowed'
                  ]
                }),
                require('autoprefixer'),
              ],
            },
          },
        },
      ],
      include: [/tailwind\.css$/, /node_modules/],
    });
    return config;
  },
};
