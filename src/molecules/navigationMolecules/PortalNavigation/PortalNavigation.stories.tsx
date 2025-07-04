import type { Meta, StoryObj } from '@storybook/react-vite';
import PortalNavigation from './PortalNavigation';

// We no longer need a location mock decorator since we're using props

const meta = {
  title: 'Molecules/ Navigation Molecules/PortalNavigation',
  component: PortalNavigation,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PortalNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { href: '/account', label: 'Account' },
      { href: '/profile', label: 'Profile' },
      { href: '/settings', label: 'Settings' },
      { href: '/billing', label: 'Billing' },
      { href: '/notifications', label: 'Notifications' },
    ],
    active: false,
  },
};

export const WithActiveItem: Story = {
  args: {
    items: [
      { href: '/account', label: 'Account' },
      { href: '/profile', label: 'Profile' },
      { href: '/settings', label: 'Settings' },
      { href: '/billing', label: 'Billing' },
      { href: '/notifications', label: 'Notifications' },
    ],
    active: true,
    backHref: '/dashboard',
  },
  parameters: {
    docs: {
      description: {
        story: 'When an item is active and on mobile view, only the active item is shown with a back button.',
      },
    },
  },
};
