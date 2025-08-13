import type { Meta, StoryObj } from '@storybook/react-vite';
import MenuItems from './MenuItems';
import MenuItem from './menuItem';

const meta = {
    title: 'Molecules/Portal Molecules/MenuItems',
    component: MenuItems,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        orientation: {
            control: { type: 'radio' },
            options: ['horizontal', 'vertical'],
        },
        activeIndex: {
            control: { type: 'number', min: -1, max: 5 },
        },
    },
} satisfies Meta<typeof MenuItems>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HorizontalMenu: Story = {
    args: {
        orientation: 'horizontal',
        items: [
            {
                text: 'Home',
                href: '/',
            },
            {
                text: 'About',
                href: '/about',
            },
            {
                text: 'Services',
                href: '/services',
            },
            {
                text: 'Contact',
                href: '/contact',
            },
        ],
    },
};

export const HorizontalMenuWithActive: Story = {
    args: {
        orientation: 'horizontal',
        activeIndex: 1,
        items: [
            {
                text: 'Home',
                href: '/',
            },
            {
                text: 'About',
                href: '/about',
            },
            {
                text: 'Services',
                href: '/services',
            },
            {
                text: 'Contact',
                href: '/contact',
            },
        ],
    },
};

export const VerticalMenu: Story = {
    args: {
        orientation: 'vertical',
        items: [
            {
                text: 'Dashboard',
                href: '/dashboard',
            },
            {
                text: 'Profile',
                href: '/profile',
            },
            {
                text: 'Settings',
                href: '/settings',
            },
            {
                text: 'Help',
                href: '/help',
            },
        ],
    },
};

export const MenuWithClickHandlers: Story = {
    args: {
        orientation: 'horizontal',
        items: [
            {
                text: 'Action 1',
                onClick: () => console.log('Action 1 clicked'),
            },
            {
                text: 'Action 2',
                onClick: () => console.log('Action 2 clicked'),
            },
            {
                text: 'Action 3',
                onClick: () => console.log('Action 3 clicked'),
            },
        ],
    },
};

// For showcasing individual menu item states
export const IndividualStates: Story = {
    args: {
        orientation: 'vertical',
        items: [
            {
                text: 'Default State',
                href: '/default',
            },
            {
                text: 'Hover State (hover to see)',
                href: '/hover',
            },
            {
                text: 'Active State',
                href: '/active',
            },
        ],
        activeIndex: 2, // Makes the third item active
    },
};

// Separate story for demonstrating the MenuItem component directly
export const SingleMenuItemDemo = {
    render: () => (
        <div className="flex flex-col gap-m">
            <div>
                <h3 className="text-heading-3 mb-s">Menu Item States:</h3>
                <div className="flex flex-col gap-s">
                    <MenuItem text="Default State" state="default" href="/default" />
                    <MenuItem text="Hover State (always shown)" state="hover" href="/hover" />
                    <MenuItem text="Active State (always shown)" state="active" href="/active" />
                </div>
            </div>
        </div>
    ),
};