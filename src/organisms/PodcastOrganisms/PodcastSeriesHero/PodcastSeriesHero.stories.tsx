import type { Meta, StoryObj } from '@storybook/react';
import { PodcastSeriesHero } from './PodcastSeriesHero';

const meta: Meta<typeof PodcastSeriesHero> = {
    title: 'Organisms/Podcast Organisms/PodcastSeriesHero',
    component: PodcastSeriesHero,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        imageUrl: 'https://picsum.photos/400/400?random=20',
        alt: 'Christine en Gerjanne weten het ook niet',
        title: 'Christine en Gerjanne weten het ook niet',
        description: 'Wekelijks spreken de reformatorische vriendinnen Christine Stam en Gerjanne van Lagen in de podcast Christine en Gerjanne weten het (ook niet) over geloof, opvoeding, relaties en de kerk.',
        trailerUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        trailerLabel: 'Luister de trailer',
    },
};

export const WithoutTrailer: Story = {
    args: {
        imageUrl: 'https://picsum.photos/400/400?random=21',
        alt: 'Gebroken gelofte',
        title: 'Gebroken gelofte',
        description: 'Voor iedereen die wil begrijpen wat scheiden betekent.',
    },
};

export const WithoutImage: Story = {
    args: {
        title: 'Dick en Daniël geloven het wel',
        description: 'Alles over geloof en kerk met elke week interessante gasten.',
        trailerUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    },
};
