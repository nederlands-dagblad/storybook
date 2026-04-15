import type { Meta, StoryObj } from '@storybook/react';
import PodcastSeriesOverview, { PodcastSeries } from './PodcastSeriesOverview';

const sampleSeries: PodcastSeries[] = [
    {
        imageUrl: 'https://picsum.photos/300/300?random=10',
        alt: 'Widya zoekt God',
        title: 'Widya zoekt God',
        description: 'Van volop actief in de new age-wereld naar radicaal tot geloof in Jezus.',
        metaText: '8 afleveringen',
        href: '/podcasts/widya-zoekt-god',
    },
    {
        imageUrl: 'https://picsum.photos/300/300?random=11',
        alt: 'Christine en Gerjanne weten het ook niet',
        title: 'Christine en Gerjanne weten het ook niet',
        description: 'Over geloof, opvoeding, relaties en de kerk.',
        metaText: 'Wekelijks',
        href: '/podcasts/christine-en-gerjanne',
    },
    {
        imageUrl: 'https://picsum.photos/300/300?random=12',
        alt: 'Dick en Daniël geloven het wel',
        title: 'Dick en Daniël geloven het wel',
        description: 'Alles over geloof en kerk met elke week interessante gasten.',
        metaText: 'Wekelijks',
        href: '/podcasts/dick-en-daniel',
    },
    {
        imageUrl: 'https://picsum.photos/300/300?random=13',
        alt: 'Gebroken gelofte',
        title: 'Gebroken gelofte',
        description: 'Voor iedereen die wil begrijpen wat scheiden betekent.',
        metaText: '2 seizoenen',
        href: '/podcasts/gebroken-gelofte',
    },
    {
        imageUrl: 'https://picsum.photos/300/300?random=14',
        alt: 'Boekenclub podcasts',
        title: 'Boekenclub podcasts',
        description: 'Krijg inzichten over de thema\'s die in het besproken boek aan de orde komen.',
        metaText: '2 seizoenen',
        href: '/podcasts/boekenclub',
    },
    {
        imageUrl: 'https://picsum.photos/300/300?random=15',
        alt: 'Relatie podcast',
        title: 'Relatie podcast',
        metaText: '2 seizoenen',
        href: '/podcasts/relatie',
    },
    {
        imageUrl: 'https://picsum.photos/300/300?random=16',
        alt: 'Veertig dagen poëzie',
        title: 'Veertig dagen poëzie',
        metaText: 'Wekelijks',
        href: '/podcasts/veertig-dagen-poezie',
    },
];

const meta: Meta<typeof PodcastSeriesOverview> = {
    title: 'Organisms/Podcast Organisms/PodcastSeriesOverview',
    component: PodcastSeriesOverview,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        series: {
            description: 'Array van podcast series om weer te geven. Elke serie bevat een titel (verplicht), en optioneel een afbeelding, beschrijving, metatekst en link.',
            control: 'object',
        },
    },
};

export default meta;
type Story = StoryObj<typeof PodcastSeriesOverview>;

export const Default: Story = {
    args: {
        series: sampleSeries,
    },
};

