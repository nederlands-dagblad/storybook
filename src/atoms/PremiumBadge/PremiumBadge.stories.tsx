import type { Meta, StoryObj } from '@storybook/react';
import PremiumBadge from './PremiumBadge';

/**
 * This isn’t just any badge. This is the badge. The digital equivalent of velvet ropes, gold stars, and secret handshakes. Slap this on something, and suddenly it's too cool for free trials.
 *
 * Use responsibly—too much premium and your app might start charging you.
 *
 * ### React
 *
 * In React, we have a `<PremiumBadge>` component available. See the examples below for usage.
 *
 * ### HTML
 *
 * Using plain HTML? We got you covered. Here’s how you can use the PremiumBadge component:
 *
 * ```html
 * <div class="badge-premium">
 *   <Icon name="star-fill" size="18" />
 *   <span>Premium</span>
 * </div>
 */

const meta = {
  title: 'Atoms/Premium Badge',
  component: PremiumBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' }
  },
} satisfies Meta<typeof PremiumBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

/**
 * Use the `premium-badge-small` class to render a smaller version of the badge.
 */
export const Small: Story = {
  args: {
    size: 'small',
  },
};

export const InContext: Story = {
  render: () => (
    <div className="max-w-md p-4 border border-neutral-200 rounded">
      <h2 className="text-xl font-bold mb-2">Article Title</h2>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm text-neutral-600">March 29, 2025</span>
        <PremiumBadge />
      </div>
      <p className="text-neutral-800">
        This premium article provides in-depth analysis of the latest developments...
      </p>
    </div>
  ),
};
