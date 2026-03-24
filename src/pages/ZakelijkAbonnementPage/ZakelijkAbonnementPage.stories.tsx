import type { Meta, StoryObj } from '@storybook/react';
import ZakelijkAbonnementPage from './ZakelijkAbonnementPage';

const meta: Meta<typeof ZakelijkAbonnementPage> = {
    title: 'Pages/Zakelijk Abonnement',
    component: ZakelijkAbonnementPage,
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;
type Story = StoryObj<typeof ZakelijkAbonnementPage>;

export const Default: Story = {};
