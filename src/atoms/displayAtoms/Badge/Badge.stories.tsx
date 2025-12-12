import type { Meta, StoryObj } from '@storybook/react-vite';
import Badge from './Badge';

const meta = {
    title: 'Atoms/Display Atoms/Badge',
    component: Badge,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['premium', 'dnk'],
            description: 'Visual variant of the badge',
        },
        size: {
            control: 'select',
            options: ['small', 'large'],
            description: 'Size variant of the badge',
        },
        className: {
            control: 'text',
            description: 'Additional CSS classes',
        },
    },
} satisfies Meta<typeof Badge>;
export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default premium badge (large)
 */
export const Premium: Story = {
    args: {
        variant: 'premium',
        size: 'large',
    },
};

/**
 * Small premium badge
 */
export const PremiumSmall: Story = {
    args: {
        variant: 'premium',
        size: 'small',
    },
};

/**
 * De Nieuwe Koers badge (large)
 */
export const DNK: Story = {
    args: {
        variant: 'dnk',
        size: 'large',
    },
};

/**
 * Small De Nieuwe Koers badge
 */
export const DNKSmall: Story = {
    args: {
        variant: 'dnk',
        size: 'small',
    },
};
