import type { Meta, StoryObj } from '@storybook/react';
import Logo from './Logo';

const meta: Meta<typeof Logo> = {
    title: 'Atoms/Basic Atoms/Logo',
    component: Logo,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'The Nederlands Dagblad brand logo. Supports a small monogram and a full wordmark, each available with or without a decorative square.',
            },
        },
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const SmallDefault: Story = {
    args: {
        size: 'small',
        variant: 'default',
    },
};

export const SmallWithSquare: Story = {
    args: {
        size: 'small',
        variant: 'with-square',
    },
};

export const FullDefault: Story = {
    args: {
        size: 'full',
        variant: 'default',
    },
};

export const FullWithSquare: Story = {
    args: {
        size: 'full',
        variant: 'with-square',
    },
};
