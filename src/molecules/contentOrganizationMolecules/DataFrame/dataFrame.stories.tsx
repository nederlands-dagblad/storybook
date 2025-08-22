import type { Meta, StoryObj } from '@storybook/react-vite';
import DataFrame from './dataFrame';
import DataFrames from './dataFrames';

const meta = {
    title: 'Molecules/Content Organization Molecules/DataFrame',
    component: DataFrame,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof DataFrame>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================
// BASIC DATAFRAME EXAMPLES
// ============================================

export const Default: Story = {
    name: '1. Basic DataFrame',
    args: {
        title: 'Persoonsgegevens',
        items: [
            { label: 'Naam', value: 'Jan de Vries' },
            { label: 'Email', value: 'jan.devries@example.com' },
            { label: 'Telefoon', value: '06-12345678' },
            { label: 'Mobiel', value: '06-98765432' }
        ]
    },
};

export const EmptyValues: Story = {
    name: '2. With Empty Values',
    args: {
        title: 'Incomplete Data',
        items: [
            { label: 'Naam', value: 'John Doe' },
            { label: 'Email', value: undefined },
            { label: 'Telefoon', value: '' },
            { label: 'Mobiel', value: null }
        ]
    },
};

// ============================================
// EDITABLE DATAFRAMES
// ============================================

export const Editable: Story = {
    name: '3. Editable DataFrame',
    args: {
        title: 'Persoonsgegevens',
        editable: true,
        onEdit: () => console.log('Edit clicked'),
        onSave: (data) => console.log('Save clicked', data),
        onCancel: () => console.log('Cancel clicked'),
        items: [
            { label: 'Naam', value: 'Jan de Vries' },
            { label: 'Email', value: 'jan.devries@example.com' },
            { label: 'Telefoon', value: '06-12345678' }
        ],
        // Auto-generates edit fields from items
    },
};

export const EditableWithCustomFields: Story = {
    name: '4. Editable with Custom Fields',
    args: {
        title: 'Adresgegevens',
        editable: true,
        onEdit: () => console.log('Edit clicked'),
        onSave: (data) => console.log('Save clicked', data),
        onCancel: () => console.log('Cancel clicked'),
        items: [
            { label: 'Adres', value: 'Hoofdstraat 123A' },
            { label: 'Postcode', value: '1234 AB' },
            { label: 'Plaats', value: 'Amsterdam' }
        ],
        editFields: [
            { name: 'street', label: 'Straat', value: 'Hoofdstraat', width: 'third' },
            { name: 'houseNumber', label: 'Huisnummer', value: '123', width: 'third' },
            { name: 'addition', label: 'Toevoeging', value: 'A', width: 'third' },
            { name: 'postalCode', label: 'Postcode', value: '1234 AB', width: 'half' },
            { name: 'city', label: 'Plaats', value: 'Amsterdam', width: 'half' },
            { name: 'country', label: 'Land', value: 'Nederland', width: 'full' }
        ]
    },
};

// ============================================
// SPECIAL STATES
// ============================================

export const Loading: Story = {
    name: '5. Loading State',
    args: {
        title: 'Loading Data',
        editable: true,
        onEdit: () => console.log('Edit clicked'),
        items: [
            {
                label: 'Naam',
                isLoading: true,
                skeleton: ['dataframe-item__skeleton--md', 'dataframe-item__skeleton--md']
            },
            {
                label: 'Email',
                isLoading: true,
                skeleton: ['dataframe-item__skeleton--lg']
            },
            {
                label: 'Telefoon',
                isLoading: true,
                skeleton: ['dataframe-item__skeleton--md']
            }
        ]
    },
};

// ============================================
// ALERTS & MESSAGES
// ============================================

export const WithInfoAlert: Story = {
    name: '7. With Info Alert',
    args: {
        title: 'Betaalgegevens',
        alert: {
            type: 'info' as any,
            message: 'U heeft toegang tot dit account via het abonnement van uw bedrijf.'
        },
        items: [
            { label: 'IBAN', value: 'NL91 ABNA 0417 1643 00' }
        ]
    },
};

export const WithErrorAlert: Story = {
    name: '8. With Error Alert',
    args: {
        title: 'Adresgegevens',
        editable: true,
        onEdit: () => console.log('Edit clicked'),
        alert: {
            type: 'warning' as any,
            message: 'Er is een fout opgetreden bij het laden van uw adresgegevens.'
        },
        items: [
            { label: 'Straat', value: undefined },
            { label: 'Postcode', value: undefined },
            { label: 'Plaats', value: undefined }
        ]
    },
};

// ============================================
// ACTION BUTTONS
// ============================================

export const WithActionButtons: Story = {
    name: '9. With Action Buttons',
    args: {
        title: 'Accountgegevens',
        items: [
            { label: 'Relatienummer', value: '123456789' }
        ],
        actions: [
            {
                label: 'Wachtwoord wijzigen',
                icon: 'pencil-simple-outline',
                onClick: () => console.log('Change password clicked')
            },
            {
                label: 'Uitloggen',
                icon: 'sign-out-outline',
                onClick: () => console.log('Logout clicked')
            }
        ]
    },
};

// ============================================
// COMPLETE PAGE EXAMPLE - MIJN GEGEVENS
// ============================================

export const MijnGegevensComplete: Story = {
    name: '10. Complete Page - Mijn Gegevens',
    args: {} as any, // Empty args since we're using render
    render: () => (
        <DataFrames
            frames={[
                {
                    title: 'Persoonsgegevens',
                    editable: true,
                    onEdit: () => console.log('Edit personal data'),
                    onSave: (data) => console.log('Save personal data', data),
                    items: [
                        { label: 'Naam', value: 'Jan de Vries' },
                        { label: 'Email', value: 'jan.devries@nd.nl' },
                        { label: 'Telefoon', value: '020-1234567' },
                        { label: 'Mobiel', value: undefined }
                    ]
                },
                {
                    title: 'Adresgegevens',
                    editable: true,
                    onEdit: () => console.log('Edit address'),
                    onSave: (data) => console.log('Save address', data),
                    items: [
                        { label: 'Straat', value: 'Hoofdstraat 123' },
                        { label: 'Postcode', value: '1234 AB' },
                        { label: 'Plaats', value: 'Amsterdam' },
                        { label: 'Land', value: 'Nederland' }
                    ]
                },
                {
                    title: 'Betaalgegevens',
                    items: [
                        { label: 'IBAN', value: 'NL91 ABNA 0417 1643 00' }
                    ]
                },
                {
                    title: 'Accountgegevens',
                    items: [
                        { label: 'Relatienummer', value: '123456789' }
                    ],
                    actions: [
                        {
                            label: 'Wachtwoord wijzigen',
                            icon: 'pencil-simple-outline',
                            onClick: () => console.log('Change password')
                        },
                        {
                            label: 'Uitloggen',
                            icon: 'sign-out-outline',
                            onClick: () => console.log('Logout')
                        }
                    ]
                }
            ]}
        />
    ),
};