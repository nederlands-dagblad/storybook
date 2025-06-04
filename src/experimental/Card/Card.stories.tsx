import type { Meta, StoryObj } from '@storybook/react-vite';
import Card from './Card';
import Button from '../../atoms/Button/Button.tsx';

const meta = {
  title: 'Experimental/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Card Title',
    children: <p>This is the default card with just a title and content.</p>,
  },
};

export const WithImage: Story = {
  args: {
    title: 'Card with Image',
    image: <img src="https://placehold.co/1000x600" alt="Placeholder" />,
    children: <p>This card includes an image at the top.</p>,
  },
};

export const WithFooter: Story = {
  args: {
    title: 'Card with Footer',
    children: <p>This card has a footer section with a button.</p>,
    footer: <Button>Learn More</Button>,
  },
};
