import type { Meta, StoryObj } from '@storybook/react-vite';
import Button from './Button';
import iconList from "../../../atoms/basicAtoms/Icon/list.ts";
import Icon from "../../basicAtoms/Icon/Icon";

/**
 * Behold, the Button: small in size, mighty in purpose. Whether it's submitting a form, launching a missile (okay, hopefully not), or just pretending to do something important, this little UI warrior is always ready for action. It comes in peace, but with variants.
 *
 * Click it. Or don't. It won't take it personally (probably).
 *
 * ### React
 *
 * In React, we have a `<Button>` component available. See the examples below for usage.
 *
 * ### HTML
 *
 * Using plain HTML? We got you covered. Here's how you can use the Button component:
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
    controls: { sort: 'requiredFirst' },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'dark', 'pill']
    },
    iconLeft: {
      control: 'select',
      options: [null, ...iconList.getIconNames()],
    },
    iconLeftVariant: {
      control: 'select',
      options: ['outline', 'fill'],
      description: 'Left icon variant',
    },
    iconRight: {
      control: 'select',
      options: [null, ...iconList.getIconNames()],
    },
    iconRightVariant: {
      control: 'select',
      options: ['outline', 'fill'],
      description: 'Right icon variant',
    },
    label: {
      control: 'text',
      description: 'The button label text',
    },
    iconOnly: {
      control: 'boolean',
    },
    disabled: { control: 'boolean' },
    onClick: { action: 'clicked' }
    
  },
} satisfies Meta<typeof Button>;

export default meta;

/**
 * The primary button variant
 */
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    iconLeft: 'square',
    label: 'Primary Button',
  },
};

/**
 * The secondary button variant with an outline style
 */
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    iconLeft: 'user',
    label: 'Secondary Button',
  },
};

/**
 * The ghost button variant - minimal styling, text only
 */
export const Ghost: Story = {
  args: {
    variant: 'ghost',
    label: 'Ghost Button',
  },
};

/**
 * The dark button variant for dark backgrounds
 */
export const Dark: Story = {
  args: {
    variant: 'dark',
    iconLeft: 'square',
    label: 'Dark Button',
  },
};

/**
 * The pill button variant with rounded edges
 */
export const Pill: Story = {
  args: {
    variant: 'pill',
    iconLeft: 'pencil',
    label: (
        <>
          Label
          <Icon name="caret-right" size={18} />
        </>
    ),
  },
};

/**
 * Icon-only button - displays just an icon with minimal padding
 */
export const IconOnly: Story = {
  args: {
    variant: 'pill',
    iconLeft: 'user',
    iconOnly: true,
    label: '',
  },
};

/**
 * Disabled state examples
 */
export const DisabledButtons: Story = {
  render: () => (
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <Button variant="primary" disabled>Primary Disabled</Button>
        <Button variant="secondary" disabled>Secondary Disabled</Button>
        <Button variant="ghost" disabled>Ghost Disabled</Button>
        <Button variant="dark" disabled>Dark Disabled</Button>
        <Button variant="pill" disabled>Pill Disabled</Button>
      </div>
  ),
};