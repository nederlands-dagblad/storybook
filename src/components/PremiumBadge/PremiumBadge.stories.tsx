import type { Meta, StoryObj } from '@storybook/react';
import PremiumBadge from './PremiumBadge';

const meta = {
  title: 'Components/PremiumBadge',
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

export const WithCustomClass: Story = {
  args: {
    className: 'shadow-md',
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
