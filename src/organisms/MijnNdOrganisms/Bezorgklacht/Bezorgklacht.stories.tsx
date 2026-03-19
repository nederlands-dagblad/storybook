import type { Meta, StoryObj } from '@storybook/react';
import { Bezorgklacht, BezorgklachtFormData } from './Bezorgklacht';

const meta: Meta<typeof Bezorgklacht> = {
    title: 'Organisms/Mijn ND Organisms/Bezorgklacht',
    component: Bezorgklacht,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        onSubmit: { action: 'onSubmit' },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
