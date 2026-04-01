import type { Meta, StoryObj } from '@storybook/react';
import { AfwijkendBezorgAdres } from './AfwijkendBezorgAdres';

function simulateApi(success: boolean, message?: string, delay = 1000) {
    return () => {
        setTimeout(() => {
            window.dispatchEvent(new CustomEvent('afwijkend-bezorgadres-result', {
                detail: { success, message },
            }));
        }, delay);
    };
}

function simulateDelete(success: boolean, message?: string, delay = 1000) {
    return () => {
        setTimeout(() => {
            window.dispatchEvent(new CustomEvent('afwijkend-bezorgadres-delete-result', {
                detail: { success, message },
            }));
        }, delay);
    };
}

function simulateLookup(postcode: string, huisnummer: string): Promise<{ straat: string; plaats: string }> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ straat: 'Voorbeeldstraat', plaats: 'Amsterdam' });
        }, 500);
    });
}

const meta: Meta<typeof AfwijkendBezorgAdres> = {
    title: 'Organisms/Mijn ND Organisms/AfwijkendBezorgAdres',
    component: AfwijkendBezorgAdres,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        onSubmit: simulateApi(true),
        onDelete: simulateDelete(true),
        onLookupAdres: simulateLookup,
    },
};

export const WithError: Story = {
    args: {
        onSubmit: simulateApi(false, 'Er is iets misgegaan bij het opslaan van het adres. Probeer het later opnieuw.'),
        onDelete: simulateDelete(false, 'Er is iets misgegaan bij het verwijderen. Probeer het later opnieuw.'),
        onLookupAdres: simulateLookup,
    },
};

export const WithInitialData: Story = {
    args: {
        onSubmit: simulateApi(true),
        onDelete: simulateDelete(true),
        onLookupAdres: simulateLookup,
        initialData: {
            naamVerblijf: 'Hotel de Palmboom',
            kamernummer: '12',
            postcode: '3818 LA',
            huisnummer: '11',
            toevoeging: '',
            straat: 'Berkenweg',
            plaats: 'Amersfoort',
            ingangsDatum: '01/09/2024',
            eindDatum: '06/09/2024',
        },
    },
};

export const WithMultipleMeldingen: Story = {
    args: {
        onSubmit: simulateApi(true),
        onDelete: simulateDelete(true),
        onLookupAdres: simulateLookup,
        initialData: {
            naamVerblijf: 'Hotel de Palmboom',
            kamernummer: '12',
            postcode: '3818 LA',
            huisnummer: '11',
            toevoeging: '',
            straat: 'Berkenweg',
            plaats: 'Amersfoort',
            ingangsDatum: '15/09/2024',
            eindDatum: '30/09/2024',
        },
        initialPreviousSubmissions: [
            {
                naamVerblijf: 'Camping Zeeburg',
                kamernummer: '',
                postcode: '1095 KN',
                huisnummer: '7',
                toevoeging: '',
                straat: 'Zuider IJdijk',
                plaats: 'Amsterdam',
                ingangsDatum: '01/07/2024',
                eindDatum: '14/07/2024',
            },
        ],
    },
};
