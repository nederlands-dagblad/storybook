import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import Dropdown from './Dropdown';

const sortOptions = [
    { label: 'Nieuwste eerst', value: 'newest' },
    { label: 'Beste eerst', value: 'best' },
    { label: 'Gebalanceerd', value: 'balanced' },
    { label: 'Alleen exacte trefwoorden', value: 'exact' },
];

const categoryOptions = [
    { label: 'Film', value: 'film' },
    { label: 'Media', value: 'media' },
    { label: 'Cultuur', value: 'cultuur' },
    { label: 'Nederland', value: 'nederland' },
    { label: 'Leven', value: 'leven' },
];

const meta = {
    title: 'Molecules/Form Molecules/Dropdown',
    component: Dropdown,
    parameters: {
        layout: 'padded',
    },
    decorators: [
        (Story: React.ComponentType) => (
            <div style={{ minHeight: '300px', paddingTop: '1rem' }}>
                <Story />
            </div>
        ),
    ],
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['pill', 'select'],
            description: 'Visual variant of the dropdown',
        },
        label: {
            control: 'text',
            description: 'Label shown above (select) or on the trigger button (pill)',
        },
        placeholder: {
            control: 'text',
            description: 'Placeholder shown when no option is selected',
        },
    },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Pill dropdown — used for sort/filter buttons like "Sorteren".
 */
export const Pill: Story = {
    render: (args) => {
        const [value, setValue] = useState<string | undefined>(undefined);
        return (
            <Dropdown
                {...args}
                value={value}
                onChange={setValue}
            />
        );
    },
    args: {
        variant: 'pill',
        label: 'Sorteren',
        options: sortOptions,
    },
};

/**
 * Pill dropdown with a pre-selected value.
 */
export const PillWithSelection: Story = {
    render: (args) => {
        const [value, setValue] = useState<string>('newest');
        return (
            <Dropdown
                {...args}
                value={value}
                onChange={setValue}
            />
        );
    },
    args: {
        variant: 'pill',
        label: 'Sorteren',
        options: sortOptions,
    },
};

/**
 * Select dropdown — used as a form input field.
 */
export const Select: Story = {
    render: (args) => {
        const [value, setValue] = useState<string | undefined>(undefined);
        return (
            <Dropdown
                {...args}
                value={value}
                onChange={setValue}
            />
        );
    },
    args: {
        variant: 'select',
        label: 'Categorie',
        placeholder: 'Selecteer een categorie',
        options: categoryOptions,
    },
};

/**
 * Select dropdown with a pre-selected value.
 */
export const SelectWithSelection: Story = {
    render: (args) => {
        const [value, setValue] = useState<string>('cultuur');
        return (
            <Dropdown
                {...args}
                value={value}
                onChange={setValue}
            />
        );
    },
    args: {
        variant: 'select',
        label: 'Categorie',
        options: categoryOptions,
    },
};
