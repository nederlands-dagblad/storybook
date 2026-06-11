import type { Meta, StoryObj } from '@storybook/react';
import { PodcastSeriesHosts } from './PodcastSeriesHosts';

const meta: Meta<typeof PodcastSeriesHosts> = {
    title: 'Organisms/Podcast Organisms/PodcastSeriesHosts',
    component: PodcastSeriesHosts,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        sectionTitle: 'De makers',
        hosts: [
            {
                image: '<img src="https://picsum.photos/400/400?random=40" alt="Christine Stam" class="w-full h-full object-cover" />',
                name: 'Christine Stam',
                description:
                    'Christine is journalist en moeder van drie. Ze schrijft over geloof, opvoeding en alles wat daarbij komt kijken.',
            },
            {
                image: '<img src="https://picsum.photos/400/400?random=41" alt="Gerjanne van Lagen" class="w-full h-full object-cover" />',
                name: 'Gerjanne van Lagen',
                description:
                    'Gerjanne werkt als theoloog en is altijd op zoek naar de praktische kant van het geloof in het dagelijks leven.',
            },
        ],
    },
};
