import type { Meta, StoryObj } from '@storybook/react-vite';
import NavigationCards from './NavigationCards';

const meta = {
  title: 'Components/Portal/NavigationCards',
  component: NavigationCards,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NavigationCards>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      {
        icon: 'user-outline',
        headline: 'Profile',
        description: 'Manage your profile settings and preferences.',
        href: '/account',
      },
      {
        icon: 'star-outline',
        headline: 'Settings',
        description: 'Adjust your account settings and configurations.',
        href: '/settings',
      },
      {
        icon: 'star-outline',
        headline: 'Help Center',
        description: 'Get assistance and find answers to your questions.',
        href: '/help',
      }
    ],
  },
};
