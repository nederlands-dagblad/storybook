import type { Meta, StoryObj } from '@storybook/react';
import { CardContainer } from './CardContainer';
import { IconText } from '@atoms/basicAtoms/IconText/IconText';

const meta: Meta<typeof CardContainer> = {
    title: 'Atoms/Display Atoms/CardContainer',
    component: CardContainer,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        padding: {
            control: 'select',
            options: ['none', 'xs', 's', 'm', 'l', 'xl'],
            description: 'Padding inside the container',
        },
        borderColor: {
            control: 'select',
            options: ['default', 'brand', 'accent-gray', 'accent-gray-subtle', 'disabled', 'warning', 'none'],
            description: 'Border color of the container',
        },
        background: {
            control: 'select',
            options: ['transparent', 'accent-gray'],
            description: 'Background color variant',
        },
        className: {
            control: 'text',
            description: 'Additional CSS classes',
        },
    },
};

export default meta;
type Story = StoryObj<typeof CardContainer>;

export const Default: Story = {
    args: {
        children: <p>Dit is een standaard card container met default instellingen. Je kunt hier alle mogelijke content aan toevoegen.</p>
    },
};

