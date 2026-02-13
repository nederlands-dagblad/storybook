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
            description: 'Main label text for the radio button',
        },
        heading: {
            control: 'text',
            description: 'Optional heading text displayed above the label',
        },
        badgeText: {
            control: 'text',
            description: 'Optional badge text displayed on the right side',
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
        label: 'Door iedereen te lezen',
        heading: 'Als cadeau',
        checked: false,
    },
};

export const Selected: Story = {
    args: {
        label: 'Door abonnees te lezen',
        heading: 'Standaard delen',
        checked: true,
    },
};

export const WithBadge: Story = {
    args: {
        label: 'Door iedereen te lezen',
        heading: 'Als cadeau',
        badgeText: '5',
        checked: false,
    },
};

export const WithBadgeSelected: Story = {
    args: {
        label: 'Door iedereen te lezen',
        heading: 'Als cadeau',
        badgeText: '5',
        checked: true,
    },
};

export const WithoutHeading: Story = {
    args: {
        label: 'Simple option without heading',
        checked: false,
    },
};

export const Disabled: Story = {
    args: {
        label: 'Door iedereen te lezen',
        heading: 'Als cadeau',
        badgeText: '5',
        disabled: true,
    },
};

export const DisabledSelected: Story = {
    args: {
        label: 'Door abonnees te lezen',
        heading: 'Standaard delen',
        checked: true,
        disabled: true,
    },
};

export const RadioGroup: Story = {
    render: () => {
        const [selected, setSelected] = useState('option1');

        return (
            <div className="flex flex-col gap-4">
                <RadioButton
                    label="Door iedereen te lezen"
                    heading="Als cadeau"
                    badgeText="5"
                    name="group"
                    value="option1"
                    checked={selected === 'option1'}
                    onChange={() => setSelected('option1')}
                />
                <RadioButton
                    label="Door abonnees te lezen"
                    heading="Standaard delen"
                    name="group"
                    value="option2"
                    checked={selected === 'option2'}
                    onChange={() => setSelected('option2')}
                />
                <RadioButton
                    label="Alleen voor mezelf"
                    heading="Privé"
                    name="group"
                    value="option3"
                    checked={selected === 'option3'}
                    onChange={() => setSelected('option3')}
                />
            </div>
        );
    },
};

export const RadioGroupWithMixedOptions: Story = {
    render: () => {
        const [selected, setSelected] = useState('standard');

        return (
            <div className="flex flex-col gap-4 max-w-2xl">
                <RadioButton
                    label="Door iedereen te lezen"
                    heading="Als cadeau"
                    badgeText="4"
                    name="sharing"
                    value="gift"
                    checked={selected === 'gift'}
                    onChange={() => setSelected('gift')}
                />
                <RadioButton
                    label="Door abonnees te lezen"
                    heading="Standaard delen"
                    name="sharing"
                    value="standard"
                    checked={selected === 'standard'}
                    onChange={() => setSelected('standard')}
                />
                <RadioButton
                    label="Beperkte toegang"
                    name="sharing"
                    value="limited"
                    checked={selected === 'limited'}
                    onChange={() => setSelected('limited')}
                />
            </div>
        );
    },
};

export const TwoColumnLayout: Story = {
    render: () => {
        const [selected, setSelected] = useState('gift');

        return (
            <div className="grid grid-cols-2 gap-4">
                <RadioButton
                    label="Door iedereen te lezen"
                    heading="Als cadeau"
                    badgeText="5"
                    name="layout"
                    value="gift"
                    checked={selected === 'gift'}
                    onChange={() => setSelected('gift')}
                />
                <RadioButton
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