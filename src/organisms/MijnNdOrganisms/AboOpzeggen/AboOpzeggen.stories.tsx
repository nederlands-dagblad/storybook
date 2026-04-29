import type { Meta, StoryObj } from '@storybook/react';
import { AboOpzeggen } from './AboOpzeggen';

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

export const NaVeertienDagen: Story = {
    args: {
        eersteVeertienDagen: false,
    },
};

export const EersteVeertienDagen: Story = {
    args: {
        eersteVeertienDagen: true,
        onOpzeggen: (reden) => console.log('Opzeggen met reden:', reden),
    },
};
