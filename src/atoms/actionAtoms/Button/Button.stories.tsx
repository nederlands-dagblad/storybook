import type { Meta, StoryObj } from '@storybook/react-vite';
import Button from './Button';
import { keys } from "../../../atoms/basicAtoms/Icon/list.ts";
import Icon from "../../basicAtoms/Icon/Icon";

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
 * <button class="nd-btn nd-btn-ghost">
 *   Ghost Button
 * </button>
 *
 * <button class="nd-btn nd-btn-pill">
 *   Pill Button
 * </button>
 *
 * <button class="nd-btn nd-btn-dark">
 *   Dark Button
 *  </button>
 * ```
 */

const meta = {
  title: 'Atoms/Action Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'dark', 'pill']
    },
    icon: {
      control: 'select',
      options: keys(),
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

/**
 * Use the `nd-btn-secondary` class to render a secondary button.
 */
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    icon: 'user-outline',
    children: 'Secondary Button',
  },
};

/**
 * Use the `nd-btn-ghost` class to render a ghost button.
 */
export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
};

/**
 * Use the `nd-btn-dark` class to render a dark button.
 */
export const Dark: Story = {
  args: {
    variant: 'dark',
    icon: 'square-fill',
    children: 'Dark Button',
  },
};

/**
 * Use the `nd-btn-pill` class to render a pill button.
 */
export const Pill: Story = {
  args: {
    variant: 'pill',
    icon: 'pencil-simple-outline',
    children: (
      <>
        Label
        <Icon name="caret-right-outline" size={18} />
      </>
    ),
  },
};

/**
 * Use the `iconOnly` prop to render a button with only an icon. This will remove the button's padding and display the icon at the center.
 */
export const IconOnly: Story = {
  args: {
    variant: 'pill',
    icon: 'user-outline',
    iconOnly: true,
  },
}
