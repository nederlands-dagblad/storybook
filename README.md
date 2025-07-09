# Company Design System

This repository contains the design system for our company, built with Vue 3, Tailwind CSS, and Storybook.

## Getting Started

### Installation

```bash
npm install
```

### Updating tokens

1. Go to the Design system in Figma: https://www.figma.com/design/KBKdkDiytfjb5XDctGX367.
2. Install the plugin 'Design token manager' from the Figma community.
3. Open the plugin and click the 'export' button.
4. Copy the generated JSON to the `/tokens` folder in this project.
5. Run the `yarn build-tailwind-tokens` command to generate the Tailwind CSS configuration from the tokens.

> Note: this command only needs to be run when the tokens are updated in Figma. No need to call this method every time you run the project, or deploy it.

### Development

To run the development server:

```bash
npm run serve
```

To run Storybook:

```bash
npm run storybook
```

### Building

To build the library:

```bash
npm run build
```

To build Storybook:

```bash
npm run build-storybook
```

## Components

The design system includes the following components:

- Button
- Card

Each component has its own directory with:
- Vue component file
- Storybook stories file

## Customization

The design system uses Tailwind CSS for styling. You can customize the design tokens in the `tailwind.config.js` file.

## Adding New Components

1. Create a new directory in `src/components/`
2. Add your Vue component file
3. Create a Storybook stories file
4. Export the component in `src/components/index.js`
