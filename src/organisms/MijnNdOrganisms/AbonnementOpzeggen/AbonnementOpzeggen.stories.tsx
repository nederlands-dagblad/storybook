import type { Meta, StoryObj } from '@storybook/react';
import { AbonnementOpzeggen } from './AbonnementOpzeggen';

function simulateOpzeggen(success: boolean, message?: string, delay = 1000) {
    return (data: { reden: string }) => {
        console.log('Abonnement opzeggen data:', data);
        setTimeout(() => {
            window.dispatchEvent(
                new CustomEvent('abonnement-opzeggen-result', {
                    detail: { success, message },
                })
            );
        }, delay);
    };
}

const meta: Meta<typeof AbonnementOpzeggen> = {
    title: 'Organisms/Mijn ND Organisms/AbonnementOpzeggen',
    component: AbonnementOpzeggen,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Within2WeekWindow: Story = {
    args: {
        isWithin2WeekWindow: true,
        onSubmit: simulateOpzeggen(true),
    },
};

export const Within2WeekWindowWithError: Story = {
    args: {
        isWithin2WeekWindow: true,
        onSubmit: simulateOpzeggen(
            false,
            'Er is een fout opgetreden bij het opzeggen van je abonnement.'
        ),
    },
};

export const OutsideWindow: Story = {
    args: {
        isWithin2WeekWindow: false,
    },
};
