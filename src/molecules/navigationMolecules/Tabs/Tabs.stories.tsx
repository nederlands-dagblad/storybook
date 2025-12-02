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
            description: 'Whether to show active mobile view (only for vertical layout)',
        },
        backHref: {
            control: 'text',
            description: 'Back button href for mobile active view (only for vertical layout)',
        },
        currentLocation: {
            control: 'text',
            description: 'Current location path (for testing in Storybook)',
        },
        mobileLayout: {
            control: 'select',
            options: ['vertical', 'horizontal'],
            description: 'Mobile layout behavior: vertical list or horizontal tabs',
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
        mobileLayout: 'vertical',
    },
};

export const VerticalMobile: Story = {
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
        mobileLayout: 'vertical',
    },
    parameters: {
        docs: {
            description: {
                story: 'On mobile, tabs are displayed as a vertical list with borders and caret icons. The active tab is removed from the list.',
            },
        },
    },
};

export const HorizontalMobile: Story = {
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
        mobileLayout: 'horizontal',
    },
    parameters: {
        docs: {
            description: {
                story: 'On mobile, tabs stay in a horizontal row just like on desktop. All tabs remain visible.',
            },
        },
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
        mobileLayout: 'vertical',
    },
    parameters: {
        docs: {
            description: {
                story: 'When active is true on mobile vertical layout, only the active item is shown with a back button. This is useful for drill-down navigation.',
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
        mobileLayout: 'vertical',
    },
};