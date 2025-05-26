import type { Meta, StoryObj } from '@storybook/react';
import PortalNavigation from './PortalNavigation';

const meta = {
  title: 'Components/Portal/PortalNavigation',
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

export const MobileView: Story = {
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
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Mobile view of the navigation without an active item.',
      },
    },
  },
};

export const MobileViewWithActiveItem: Story = {
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
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Mobile view with an active item showing the back button.',
      },
    },
  },
};
