import type { Meta, StoryObj } from '@storybook/react';
import { IconText } from './IconText';
import iconList from "../Icon/list";

const meta: Meta<typeof IconText> = {
    title: 'Atoms/Basic Atoms/IconText',
    component: IconText,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        icon: {
            control: 'select',
            options: [...iconList.getIconNames()],
            description: 'Name of the icon to display',
        },
        text: {
            control: 'text',
            description: 'Text content to display next to the icon',
        },
        iconVariant: {
            control: 'select',
            options: ['outline', 'fill'],
            description: 'Outline or fill variant of the icon',
        },
        iconSize: {
            control: 'select',
            options: ['s', 'm', 'l', 'xl', 'xxl'],
            description: 'Size of the icon',
        },
        iconColor: {
            control: 'select',
            options: ['default', 'gray', 'brand', 'warning', 'inverse'],
            description: 'Color of the icon',
        },
        textWeight: {
            control: 'select',
            options: ['light', 'regular', 'bold'],
            description: 'Font weight of the text',
        },
        className: {
            control: 'text',
            description: 'Additional tailwind classes',
        },
    },
};

export default meta;
type Story = StoryObj<typeof IconText>;

export const Default: Story = {
    args: {
        icon: 'square',
        iconColor: 'brand',
        text: 'Dit is standaard informatie.',
    },
};