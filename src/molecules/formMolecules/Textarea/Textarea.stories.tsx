import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Textarea from './Textarea';

const meta: Meta<typeof Textarea> = {
    title: 'Molecules/Form Molecules/Textarea',
    component: Textarea,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
    render: (args) => {
        const [value, setValue] = useState('');
        return <Textarea {...args} value={value} setValue={setValue} />;
    },
    args: {
        label: 'Opmerkingen',
        rows: 5,
    },
};

export const WithError: Story = {
    render: (args) => {
        const [value, setValue] = useState('');
        return <Textarea {...args} value={value} setValue={setValue} />;
    },
    args: {
        label: 'Opmerkingen',
        errors: ['Dit veld is verplicht'],
    },
};

export const WithHelp: Story = {
    render: (args) => {
        const [value, setValue] = useState('');
        return <Textarea {...args} value={value} setValue={setValue} />;
    },
    args: {
        label: 'Opmerkingen',
        help: 'Maximaal 500 tekens.',
    },
};
