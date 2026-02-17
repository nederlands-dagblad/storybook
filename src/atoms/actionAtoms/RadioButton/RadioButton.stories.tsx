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
        variant: {
            control: 'select',
            options: ['default', 'card'],
            description: 'Visual variant of the radio button',
        },
        label: {
            control: 'text',
            description: 'Main label text for the radio button',
        },
        heading: {
            control: 'text',
            description: 'Optional heading text (card variant only)',
        },
        badgeText: {
            control: 'text',
            description: 'Optional badge text (card variant only)',
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

// Default variant stories
export const Default: Story = {
    args: {
        variant: 'default',
        label: 'Option 1',
        checked: false,
    },
};

export const DefaultSelected: Story = {
    args: {
        variant: 'default',
        label: 'Selected option',
        checked: true,
    },
};

export const DefaultDisabled: Story = {
    args: {
        variant: 'default',
        label: 'Disabled option',
        disabled: true,
    },
};

export const DefaultGroup: Story = {
    render: () => {
        const [selected, setSelected] = useState('option1');

        return (
            <div className="flex flex-col gap-s">
                <RadioButton
                    variant="default"
                    label="Option 1"
                    name="default-group"
                    value="option1"
                    checked={selected === 'option1'}
                    onChange={() => setSelected('option1')}
                />
                <RadioButton
                    variant="default"
                    label="Option 2"
                    name="default-group"
                    value="option2"
                    checked={selected === 'option2'}
                    onChange={() => setSelected('option2')}
                />
                <RadioButton
                    variant="default"
                    label="Option 3"
                    name="default-group"
                    value="option3"
                    checked={selected === 'option3'}
                    onChange={() => setSelected('option3')}
                />
            </div>
        );
    },
};

// Card variant stories
export const Card: Story = {
    args: {
        variant: 'card',
        label: 'Door iedereen te lezen',
        heading: 'Als cadeau',
        checked: false,
    },
};

export const CardSelected: Story = {
    args: {
        variant: 'card',
        label: 'Door abonnees te lezen',
        heading: 'Standaard delen',
        checked: true,
    },
};

export const CardWithBadge: Story = {
    args: {
        variant: 'card',
        label: 'Door iedereen te lezen',
        heading: 'Als cadeau',
        badgeText: '5',
        checked: false,
    },
};

export const CardWithBadgeSelected: Story = {
    args: {
        variant: 'card',
        label: 'Door iedereen te lezen',
        heading: 'Als cadeau',
        badgeText: '5',
        checked: true,
    },
};

export const CardDisabled: Story = {
    args: {
        variant: 'card',
        label: 'Door iedereen te lezen',
        heading: 'Als cadeau',
        badgeText: '5',
        disabled: true,
    },
};

export const CardGroup: Story = {
    render: () => {
        const [selected, setSelected] = useState('option1');

        return (
            <div className="flex flex-col gap-s">
                <RadioButton
                    variant="card"
                    label="Door iedereen te lezen"
                    heading="Als cadeau"
                    badgeText="5"
                    name="card-group"
                    value="option1"
                    checked={selected === 'option1'}
                    onChange={() => setSelected('option1')}
                />
                <RadioButton
                    variant="card"
                    label="Door abonnees te lezen"
                    heading="Standaard delen"
                    name="card-group"
                    value="option2"
                    checked={selected === 'option2'}
                    onChange={() => setSelected('option2')}
                />
                <RadioButton
                    variant="card"
                    label="Alleen voor mezelf"
                    heading="Privé"
                    name="card-group"
                    value="option3"
                    checked={selected === 'option3'}
                    onChange={() => setSelected('option3')}
                />
            </div>
        );
    },
};

export const CardTwoColumnLayout: Story = {
    render: () => {
        const [selected, setSelected] = useState('gift');

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-s">
                <RadioButton
                    variant="card"
                    label="Door iedereen te lezen"
                    heading="Als cadeau"
                    badgeText="5"
                    name="layout"
                    value="gift"
                    checked={selected === 'gift'}
                    onChange={() => setSelected('gift')}
                />
                <RadioButton
                    variant="card"
                    label="Door abonnees te lezen"
                    heading="Standaard delen"
                    name="layout"
                    value="standard"
                    checked={selected === 'standard'}
                    onChange={() => setSelected('standard')}
                />
            </div>
        );
    },
};
