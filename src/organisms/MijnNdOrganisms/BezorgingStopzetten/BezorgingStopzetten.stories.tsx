import type { Meta, StoryObj } from '@storybook/react';
import { BezorgingStopzetten } from './BezorgingStopzetten';

function simulateApi(success: boolean, message?: string, delay = 1000) {
    return () => {
        setTimeout(() => {
            window.dispatchEvent(new CustomEvent('bezorging-stopzetten-result', {
                detail: { success, message },
            }));
        }, delay);
    };
}

function simulateDelete(success: boolean, message?: string, delay = 1000) {
    return () => {
        setTimeout(() => {
            window.dispatchEvent(new CustomEvent('bezorging-stopzetten-delete-result', {
                detail: { success, message },
            }));
        }, delay);
    };
}

const meta: Meta<typeof BezorgingStopzetten> = {
    title: 'Organisms/Mijn ND Organisms/BezorgingStopzetten',
    component: BezorgingStopzetten,
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
    },
};

export const WithError: Story = {
    args: {
        onSubmit: simulateApi(false, 'Er is iets misgegaan bij het stopzetten van de bezorging. Probeer het later opnieuw.'),
        onDelete: simulateDelete(false, 'Er is iets misgegaan bij het verwijderen. Probeer het later opnieuw.'),
    },
};

export const WithInitialData: Story = {
    args: {
        onSubmit: simulateApi(true),
        onDelete: simulateDelete(true),
        initialData: {
            ingangsDatum: '01/09/2024',
            eindDatum: '15/09/2024',
        },
    },
};

export const WithMultipleMeldingen: Story = {
    args: {
        onSubmit: simulateApi(true),
        onDelete: simulateDelete(true),
        initialData: {
            ingangsDatum: '15/09/2024',
            eindDatum: '30/09/2024',
        },
        initialPreviousSubmissions: [
            {
                ingangsDatum: '01/07/2024',
                eindDatum: '14/07/2024',
            },
        ],
    },
};
