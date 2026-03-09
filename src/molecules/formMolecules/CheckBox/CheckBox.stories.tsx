import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { CheckBox } from './CheckBox';

const meta: Meta<typeof CheckBox> = {
    title: 'Molecules/Form Molecules/CheckBox',
    component: CheckBox,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'card'],
            description: 'Visual variant of the checkbox',
        },
        label: {
            control: 'text',
            description: 'Main label text for the checkbox',
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
            description: 'Whether the checkbox is selected',
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the checkbox is disabled',
        },
    },
};

export default meta;
type Story = StoryObj<typeof CheckBox>;

export const Default: Story = {
    args: {
        variant: 'default',
        label: 'Accept terms and conditions',
        checked: false,
    },
};

export const DefaultChecked: Story = {
    args: {
        variant: 'default',
        label: 'Accept terms and conditions',
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
        const [values, setValues] = useState<Record<string, boolean>>({
            option1: true,
            option2: false,
            option3: false,
        });

        const toggle = (key: string) =>
            setValues((prev) => ({ ...prev, [key]: !prev[key] }));

        return (
            <div className="flex flex-col gap-s">
                <CheckBox
                    label="Option 1"
                    checked={values.option1}
                    onChange={() => toggle('option1')}
                />
                <CheckBox
                    label="Option 2"
                    checked={values.option2}
                    onChange={() => toggle('option2')}
                />
                <CheckBox
                    label="Option 3"
                    checked={values.option3}
                    onChange={() => toggle('option3')}
                />
            </div>
        );
    },
};

export const Card: Story = {
    args: {
        variant: 'card',
        label: 'Door iedereen te lezen',
        heading: 'Als cadeau',
        checked: false,
    },
};

export const CardChecked: Story = {
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

export const CardWithBadgeChecked: Story = {
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
        const [values, setValues] = useState<Record<string, boolean>>({
            option1: true,
            option2: false,
            option3: false,
        });

        const toggle = (key: string) =>
            setValues((prev) => ({ ...prev, [key]: !prev[key] }));

        return (
            <div className="flex flex-col gap-s">
                <CheckBox
                    variant="card"
                    label="Door iedereen te lezen"
                    heading="Als cadeau"
                    badgeText="5"
                    checked={values.option1}
                    onChange={() => toggle('option1')}
                />
                <CheckBox
                    variant="card"
                    label="Door abonnees te lezen"
                    heading="Standaard delen"
                    checked={values.option2}
                    onChange={() => toggle('option2')}
                />
                <CheckBox
                    variant="card"
                    label="Alleen voor mezelf"
                    heading="Priv\u00e9"
                    checked={values.option3}
                    onChange={() => toggle('option3')}
                />
            </div>
        );
    },
};
