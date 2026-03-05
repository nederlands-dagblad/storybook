import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import SearchFilter, { FilterCategory } from './SearchFilter';
import { DropdownOption } from '@atoms/actionAtoms/Dropdown/Dropdown';

const sortOptions: DropdownOption[] = [
    { label: 'Nieuwste eerst', value: 'newest' },
    { label: 'Beste eerst', value: 'best' },
    { label: 'Gebalanceerd', value: 'balanced' },
    { label: 'Alleen exacte trefwoorden', value: 'exact' },
];

const sampleCategories: FilterCategory[] = [
    {
        name: 'Categorie',
        options: [
            { label: 'Film', count: 288 },
            { label: 'Media', count: 188 },
            { label: 'Cultuur', count: 45 },
            { label: 'Nederland', count: 45 },
            { label: 'Leven', count: 31 },
            { label: 'Columns', count: 13 },
            { label: 'Sport', count: 9 },
            { label: 'Economie', count: 7 },
        ],
    },
    {
        name: 'Auteur',
        options: [
            { label: 'Jort van Slooten', count: 497 },
            { label: 'Redactie ND', count: 41 },
            { label: '-', count: 12 },
            { label: 'Hilbrand Rozema', count: 10 },
            { label: 'redactie / VK', count: 7 },
            { label: 'Maurice Hoogendoorn', count: 6 },
        ],
    },
    {
        name: 'Dossiers',
        options: [
            { label: 'Filmtip', count: 56 },
            { label: 'Student', count: 12 },
            { label: 'Student: media', count: 12 },
            { label: 'Niet te missen', count: 2 },
            { label: 'Coronavirus', count: 2 },
            { label: 'Essays', count: 2 },
        ],
    },
    {
        name: 'Periode',
        options: [
            { label: '2026', count: 15 },
            { label: '2025', count: 98 },
            { label: '2024', count: 133 },
            { label: '2023', count: 125 },
            { label: '2022', count: 140 },
            { label: '2021', count: 55 },
        ],
    },
];

const meta: Meta<typeof SearchFilter> = {
    title: 'Organisms/Search Organisms/SearchFilter',
    component: SearchFilter,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        searchTerm: {
            control: 'text',
            description: 'The search term shown in the heading',
        },
        maxVisible: {
            control: 'number',
            description: 'Max number of options visible per category before "Meer tonen"',
        },
    },
};

export default meta;
type Story = StoryObj<typeof SearchFilter>;

/**
 * Default state — filter panel closed, no active filters.
 */
export const Default: Story = {
    render: (args) => {
        const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
        const [sortValue, setSortValue] = useState<string | undefined>(undefined);

        const handleSelect = (label: string) => {
            setSelectedFilters((prev) =>
                prev.includes(label) ? prev.filter((f) => f !== label) : [...prev, label]
            );
        };

        return (
            <SearchFilter
                {...args}
                selectedFilters={selectedFilters}
                onFilterSelect={handleSelect}
                onFilterRemove={(label) => setSelectedFilters((prev) => prev.filter((f) => f !== label))}
                sortValue={sortValue}
                onSortChange={setSortValue}
            />
        );
    },
    args: {
        searchTerm: 'zoekterm',
        categories: sampleCategories,
        sortOptions,
    },
};

/**
 * Filter panel open with several active filters, matching the design screenshot.
 */
export const WithActiveFilters: Story = {
    render: (args) => {
        const [selectedFilters, setSelectedFilters] = useState<string[]>([
            'Cultuur',
            'Jort van Slooten',
            'Filmtip',
            '2026',
        ]);
        const [sortValue, setSortValue] = useState<string>('newest');

        const handleSelect = (label: string) => {
            setSelectedFilters((prev) =>
                prev.includes(label) ? prev.filter((f) => f !== label) : [...prev, label]
            );
        };

        return (
            <SearchFilter
                {...args}
                selectedFilters={selectedFilters}
                onFilterSelect={handleSelect}
                onFilterRemove={(label) => setSelectedFilters((prev) => prev.filter((f) => f !== label))}
                sortValue={sortValue}
                onSortChange={setSortValue}
            />
        );
    },
    args: {
        searchTerm: 'zoekterm',
        categories: sampleCategories,
        sortOptions,
    },
};
