# Company Design System

This repository contains the design system for our company, built with Vue 3, Tailwind CSS, and Storybook.

## Getting Started

### Installation

```bash
npm install
```

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
