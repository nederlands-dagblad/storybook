import type { Meta, StoryObj } from '@storybook/react';
import { AudioPlayer } from './AudioPlayer';

const meta: Meta<typeof AudioPlayer> = {
    title: 'Molecules/Media Molecules/AudioPlayer',
    component: AudioPlayer,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        label: 'Luister de trailer',
    },
};

export const WithoutLabel: Story = {
    args: {
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
};
