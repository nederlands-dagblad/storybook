import type { Meta, StoryObj } from '@storybook/react';
import Table from './Table';
import Icon from '@atoms/basicAtoms/Icon/Icon';

const meta: Meta<typeof Table> = {
    title: 'Molecules/Content Organization Molecules/Table',
    component: Table,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        headers: ['', 'Digitaal basis', 'Digitaal plus'],
        rows: [
            ['Alle ND-artikelen',
                <Icon name="check" variant="fill" size="m" color="brand" />,
                <Icon name="check" variant="fill" size="m" color="brand" />,
            ],
            ['Premium artikelen',
                <Icon name="check" variant="fill" size="m" color="brand" />,
                <Icon name="check" variant="fill" size="m" color="brand" />,
            ],
            ['Artikelen van opiniemagazine De Nieuwe Koers',
                <Icon name="x-mark" variant="fill" size="m" color="default" />,
                <Icon name="check" variant="fill" size="m" color="brand" />,
            ],
            ['Volledige digitale krant',
                <Icon name="x-mark" variant="fill" size="m" color="default" />,
                <Icon name="check" variant="fill" size="m" color="brand" />,
            ],
            ['Archief met eerdere edities',
                <Icon name="x-mark" variant="fill" size="m" color="default" />,
                <Icon name="check" variant="fill" size="m" color="brand" />,
            ],
        ],
    },
};

export const TextOnly: Story = {
    args: {
        headers: ['Naam', 'Rol', 'Status'],
        rows: [
            ['Jan de Vries', 'Redacteur', 'Actief'],
            ['Maria Jansen', 'Beheerder', 'Actief'],
            ['Piet Bakker', 'Lezer', 'Inactief'],
        ],
    },
};

export const NoHeaders: Story = {
    args: {
        rows: [
            ['Minimale contractperiode', '12 maanden'],
            ['Opzegtermijn', '1 maand'],
            ['Facturering', 'Per kwartaal'],
        ],
    },
};
