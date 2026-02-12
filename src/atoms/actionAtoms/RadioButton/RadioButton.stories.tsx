import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { RadioButton } from './RadioButton';

const meta: Meta<typeof RadioButton> = {
    title: 'Atoms/Action Atoms/RadioButton',
    component: RadioButton,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        label: {
            control: 'text',
            description: 'Label text for the radio button',
        },
        checked: {
            control: 'boolean',
            description: 'Whether the radio button is selected',
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the radio button is disabled',
        },
    },
};

export default meta;
type Story = StoryObj<typeof RadioButton>;

export const Default: Story = {
    args: {
        label: 'Option 1',
        checked: false,
    },
};

export const Selected: Story = {
    args: {
        label: 'Selected option',
        checked: true,
    },
};

export const Disabled: Story = {
    args: {
        label: 'Disabled option',
        disabled: true,
    },
};

export const DisabledSelected: Story = {
    args: {
        label: 'Disabled selected option',
        checked: true,
        disabled: true,
    },
};

export const RadioGroup: Story = {
    render: () => {
        const [selected, setSelected] = useState('option1');

        return (
            <div className="flex flex-col gap-y-s">
                <RadioButton
                    label="Option 1"
                    name="group"
                    value="option1"
                    checked={selected === 'option1'}
                    onChange={() => setSelected('option1')}
                />
                <RadioButton
                    label="Option 2"
                    name="group"
                    value="option2"
                    checked={selected === 'option2'}
                    onChange={() => setSelected('option2')}
                />
                <RadioButton
                    label="Option 3"
                    name="group"
                    value="option3"
                    checked={selected === 'option3'}
                    onChange={() => setSelected('option3')}
                />
            </div>
        );
    },
};
