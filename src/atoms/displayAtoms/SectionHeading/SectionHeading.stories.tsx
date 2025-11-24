import type { Meta, StoryObj } from '@storybook/react';
import { SectionHeading } from './SectionHeading';

const meta: Meta<typeof SectionHeading> = {
    title: 'Atoms/Display Atoms/SectionHeading',
    component: SectionHeading,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        children: {
            control: 'text',
            description: 'Heading text content',
        },
        className: {
            control: 'text',
            description: 'Additional CSS classes',
        },
    },
};

export default meta;
type Story = StoryObj<typeof SectionHeading>;

export const Default: Story = {
    args: {
        children: 'Laatste artikelen',
    },
};

export const ShortText: Story = {
    args: {
        children: 'Nieuws',
    },
};

export const LongText: Story = {
    args: {
        children: 'De meest gelezen artikelen van deze week',
    },
};