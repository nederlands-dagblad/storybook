import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';
import icons from '../Icon/list.ts'

/**
 * Behold, the Button: small in size, mighty in purpose. Whether it’s submitting a form, launching a missile (okay, hopefully not), or just pretending to do something important, this little UI warrior is always ready for action. It comes in peace, but with variants.
 *
 * Click it. Or don’t. It won’t take it personally (probably).
 *
 * ### React
 *
 * In React, we have a `<Button>` component available. See the examples below for usage.
 *
 * ### HTML
 *
 * Using plain HTML? We got you covered. Here’s how you can use the Button component:
 *
 * ```html
 * <button class="nd-btn nd-btn-primary">
 *   Primary Button
 * </button>
 *
 * <button class="nd-btn nd-btn-secondary">
 *   Secondary Button
 * </button>
 *
 * <button class="nd-btn nd-btn-white">
 *   White Button
 * </button>
 *
 * <button class="nd-btn nd-btn-dark">
 *   Dark Button
 *  </button>
 * ```
 */

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'white', 'dark']
    },
    icon: {
      control: 'select',
      options: icons.keys(),
    },
    disabled: { control: 'boolean' },
    onClick: { action: 'clicked' }
  },
} satisfies Meta<typeof Button>;

export default meta;

/**
 * Yaeg
 */
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    icon: 'square-fill',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const White: Story = {
  args: {
    variant: 'white',
    children: 'White Button',
  },
};

export const Dark: Story = {
  args: {
    variant: 'dark',
    children: 'Dark Button',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};
