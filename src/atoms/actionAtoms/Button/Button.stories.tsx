import type { Meta, StoryObj } from '@storybook/react-vite';
import Button from './Button';
import iconList from "../../../atoms/basicAtoms/Icon/list.ts";
import Icon from "../../basicAtoms/Icon/Icon";
import { useState } from 'react';

/**
 * Behold, the Button: small in size, mighty in purpose. Whether it's submitting a form, launching a missile (okay, hopefully not), or just pretending to do something important, this little UI warrior is always ready for action. It comes in peace, but with variants.
 *
 * Click it. Or don't. It won't take it personally (probably).
 *
 * ## Features
 * - Multiple variants: primary, secondary, ghost, dark, and pill
 * - Optional left and right icons with outline/fill variants
 * - Icon-only mode for compact buttons
 * - Interactive states: hover, active, disabled
 * - Special behaviors:
 *   - Pill buttons with left icons change to fill when active
 *   - Pill buttons with caret-down icons rotate on toggle
 *   - Primary buttons with square icons rotate 90° on hover
 *
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
      options: ['primary', 'secondary', 'ghost', 'dark', 'pill'],
      description: 'Visual style variant of the button',
    },
    iconLeft: {
      control: 'select',
      options: [null, ...iconList.getIconNames()],
      description: 'Icon to display on the left side',
    },
    iconLeftVariant: {
      control: 'select',
      options: ['outline', 'fill'],
      description: 'Outline or fill',
    },
    iconRight: {
      control: 'select',
      options: [null, ...iconList.getIconNames()],
      description: 'Icon to display on the right side',
    },
    iconRightVariant: {
      control: 'select',
      options: ['outline', 'fill'],
      description: 'Outline or fill',
    },
    label: {
      control: 'text',
      description: 'The button label text',
    },
    iconOnly: {
      control: 'boolean',
      description: 'Display only the icon without text',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable button interactions',
    },
    isActive: {
      control: 'boolean',
      description: 'Control active state (for pill variant)',
    },
    onClick: { action: 'clicked' },
    onToggle: { action: 'toggled' }
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The primary button variant
 */
export const Primary: Story = {
  args: {
    variant: 'primary',
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
 *  Pill button example showing controlled state
 */
export const InteractivePill: Story = {
  render: () => {
    const [isActive, setIsActive] = useState(false);

    return (
        <div style={{ display: 'flex', gap: '10px', flexDirection: 'column', alignItems: 'center' }}>
          <Button
              variant="pill"
              iconLeft="heart"
              label="Like"
              isActive={isActive}
              onToggle={setIsActive}
          />
          <p style={{ fontSize: '14px', color: '#666' }}>
            Status: {isActive ? 'Active (filled icon)' : 'Inactive (outline icon)'}
          </p>
        </div>
    );
  },
};

/**
 * Pill button with caret icon that rotates on toggle
 */
export const PillWithCaret: Story = {
  args: {
    variant: 'pill',
    iconLeft: 'funnel',
    iconRight: 'caret-down',
    label: 'Filter',
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
    label: 'User profile',
  },
};

/**
 * Disabled state examples across all variants
 */
export const DisabledButtons: Story = {
  render: () => (
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <Button variant="primary" iconLeft="square" label="Primary" disabled />
        <Button variant="secondary" iconLeft="user" label="Secondary" disabled />
        <Button variant="ghost" label="Ghost" disabled />
        <Button variant="dark" iconLeft="square" label="Dark" disabled />
        <Button variant="pill" iconLeft="pencil" label="Pill" disabled />
      </div>
  ),
};