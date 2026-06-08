import type { Meta, StoryObj } from '@storybook/react';
import { PodcastSeriesLastEpisode } from './PodcastSeriesLastEpisode';

const meta: Meta<typeof PodcastSeriesLastEpisode> = {
    title: 'Organisms/Podcast Organisms/PodcastSeriesLastEpisode',
    component: PodcastSeriesLastEpisode,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        sectionTitle: 'Laatste aflevering',
        videoId: 'dQw4w9WgXcQ',
        videoTitle: 'Hoe vind je rust in een druk gezinsleven?',
        articleTitle: 'Hoe vind je rust in een druk gezinsleven?',
        intro: 'In deze aflevering spreken Christine en Gerjanne over het vinden van rust te midden van de drukte van het gezinsleven, en wat geloof daarin kan betekenen.',
        articleUrl: '#',
    },
};

export const WithoutVideo: Story = {
    args: {
        sectionTitle: 'Laatste aflevering',
        articleTitle: 'Gebroken gelofte: wat scheiden echt betekent',
        intro: 'Voor iedereen die wil begrijpen wat scheiden betekent voor het gezin en de gemeenschap.',
        articleUrl: '#',
    },
};
