import type { Meta, StoryObj } from '@storybook/react';
import CollapsedCard from './CollapsedCard';
import Button from '../Button/Button';

const meta = {
  title: 'Experimental/CollapsedCard',
  component: CollapsedCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    collapsed: { control: 'boolean' },
    title: { control: 'text' },
    onToggle: { action: 'toggled' }
  },
} satisfies Meta<typeof CollapsedCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Collapsible Card',
    children: <p>This is the collapsible content of the card. Click the header to toggle visibility.</p>,
  },
};

export const Expanded: Story = {
  args: {
    title: 'Expanded Card',
    collapsed: false,
    children: <p>This card starts expanded. Click the header to collapse it.</p>,
  },
};

export const WithCustomHeader: Story = {
  render: (args) => (
    <CollapsedCard {...args}>
      <p>This card has a custom header with an icon.</p>
    </CollapsedCard>
  ),
  args: {
    header: (
      <div className="flex items-center">
        <span className="mr-2">🔍</span>
        <span>Custom Header with Icon</span>
      </div>
    ),
  },
};

export const FAQ: Story = {
  render: () => (
    <div className="space-y-2">
      <CollapsedCard title="What is a design system?">
        <p>A design system is a collection of reusable components, guided by clear standards, that can be assembled to build any number of applications.</p>
      </CollapsedCard>
      <CollapsedCard title="Why use a design system?">
        <p>Design systems help maintain consistency across products, speed up development, and improve collaboration between designers and developers.</p>
      </CollapsedCard>
      <CollapsedCard title="How do I implement a design system?">
        <p>Start by defining your design tokens, creating core components, and documenting usage guidelines. Tools like Storybook help showcase and test components.</p>
      </CollapsedCard>
    </div>
  ),
};
