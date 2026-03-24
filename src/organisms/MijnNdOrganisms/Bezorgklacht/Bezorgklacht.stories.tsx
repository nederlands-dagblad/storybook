import type { Meta, StoryObj } from '@storybook/react';
import { Bezorgklacht } from './Bezorgklacht';

function simulateApi(success: boolean, message?: string, delay = 1000) {
    return () => {
        setTimeout(() => {
            window.dispatchEvent(new CustomEvent('bezorgklacht-result', {
                detail: { success, message },
            }));
        }, delay);
    };
}

const meta: Meta<typeof Bezorgklacht> = {
    title: 'Organisms/Mijn ND Organisms/Bezorgklacht',
    component: Bezorgklacht,
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
        onSubmit: simulateApi(false, 'Helaas kunnen wij uw klacht niet verwerken omdat de uiterste bezorgtijd nog niet is verstreken.'),
    },
};
