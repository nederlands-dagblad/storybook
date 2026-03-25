import type { Meta, StoryObj } from '@storybook/react';
import ZakelijkAbonnementForm from './ZakelijkAbonnementForm';

const meta: Meta<typeof ZakelijkAbonnementForm> = {
    title: 'Organisms/Contact Form Organisms/Zakelijk Abonnement Form',
    component: ZakelijkAbonnementForm,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ZakelijkAbonnementForm>;

export const Default: Story = {};
