import type { Meta, StoryObj } from '@storybook/react-vite';
import Tabs from './Tabs';

const meta = {
    title: 'Molecules/Navigation Molecules/Tabs',
    component: Tabs,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        items: {
            control: 'object',
            description: 'Array of tab items with href and label',
        },
        active: {
            control: 'boolean',
            description: 'Whether to show active mobile view',
        },
        backHref: {
            control: 'text',
            description: 'Back button href for mobile active view',
        },
        currentLocation: {
            control: 'text',
            description: 'Current location path (for testing in Storybook)',
        },
    },
} satisfies Meta<typeof Tabs>;

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
        currentLocation: '/profile',
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
        currentLocation: '/profile',
    },
    parameters: {
        docs: {
            description: {
                story: 'When an item is active and on mobile view, only the active item is shown with a back button.',
            },
        },
    },
};

export const DifferentActiveTab: Story = {
    args: {
        items: [
            { href: '/account', label: 'Account' },
            { href: '/profile', label: 'Profile' },
            { href: '/settings', label: 'Settings' },
            { href: '/billing', label: 'Billing' },
            { href: '/notifications', label: 'Notifications' },
        ],
        active: false,
        currentLocation: '/settings',
    },
};