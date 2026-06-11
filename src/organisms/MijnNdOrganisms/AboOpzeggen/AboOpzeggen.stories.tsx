import type { Meta, StoryObj } from '@storybook/react';
import { AboOpzeggen } from './AboOpzeggen';

function simulateApi(success: boolean, message?: string, delay = 1000) {
    return () => {
        setTimeout(() => {
            window.dispatchEvent(new CustomEvent('abo-opzeggen-result', {
                detail: { success, message },
            }));
        }, delay);
    };
}

const meta: Meta<typeof AboOpzeggen> = {
    title: 'Organisms/Mijn ND Organisms/AboOpzeggen',
    component: AboOpzeggen,
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
    },
};

export const WithError: Story = {
    args: {
        onSubmit: simulateApi(false, 'Helaas kunnen wij uw verzoek niet verwerken. Probeer het later opnieuw.'),
    },
};
