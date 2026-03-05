import type { Meta, StoryObj } from '@storybook/react-vite';
import Tag from './Tag';

const meta = {
    title: 'Atoms/Action Atoms/Tag',
    component: Tag,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        label: {
            control: 'text',
            description: 'Text label of the tag',
        },
        onRemove: {
            description: 'Callback when the close button is clicked',
        },
        className: {
            control: 'text',
            description: 'Additional CSS classes',
        },
    },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Tag with a close button
 */
export const WithRemove: Story = {
    args: {
        label: 'Nieuws',
        onRemove: () => {},
    },
};
