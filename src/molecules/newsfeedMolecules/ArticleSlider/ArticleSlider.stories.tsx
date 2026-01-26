import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';
import { ArticleSlider } from './ArticleSlider';

// Mock backend response data for videos
const mockYouTubeVideos = [
    {
        videoId: 'dQw4w9WgXcQ',
        title: 'Voorbeeld YouTube video met een langere titel om te zien hoe het eruit ziet',
        thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
        duration: '3:24',
    },
    {
        videoId: 'jNQXAC9IVRw',
        title: 'Korte video titel',
        thumbnailUrl: 'https://img.youtube.com/vi/jNQXAC9IVRw/mqdefault.jpg',
        duration: '1:55',
    },
    {
        videoId: '9bZkp7q19f0',
        title: 'Een andere video met gemiddelde lengte titel',
        thumbnailUrl: 'https://img.youtube.com/vi/9bZkp7q19f0/mqdefault.jpg',
        duration: '5:43',
    },
    {
        videoId: 'kJQP7kiw5Fk',
        title: 'Video vier met nog een langere titel die meerdere regels beslaat',
        thumbnailUrl: 'https://img.youtube.com/vi/kJQP7kiw5Fk/mqdefault.jpg',
        duration: '2:10',
    },
    {
        videoId: 'L_jWHffIx5E',
        title: 'Vijfde video voorbeeld',
        thumbnailUrl: 'https://img.youtube.com/vi/L_jWHffIx5E/mqdefault.jpg',
        duration: '4:32',
    },
    {
        videoId: 'ZZ5LpwO-An4',
        title: 'Langere video met uitgebreide uitleg',
        thumbnailUrl: 'https://img.youtube.com/vi/ZZ5LpwO-An4/mqdefault.jpg',
        duration: '1:15:30',
    },
    {
        videoId: 'HEXWRTEbj1I',
        title: 'Zevende video in de serie',
        thumbnailUrl: 'https://img.youtube.com/vi/HEXWRTEbj1I/mqdefault.jpg',
        duration: '8:45',
    },
    {
        videoId: 'RBtlPT23PTM',
        title: 'Laatste video voorbeeld',
        thumbnailUrl: 'https://img.youtube.com/vi/RBtlPT23PTM/mqdefault.jpg',
        duration: '6:12',
    },
];

const meta: Meta<typeof ArticleSlider> = {
    title: 'Molecules/Newsfeed Molecules/ArticleSlider',
    component: ArticleSlider,
    parameters: {
        layout: 'padded',
        msw: {
            handlers: [
                http.get('/api/youtube/channel', ({ request }) => {
                    const url = new URL(request.url);
                    const maxResults = parseInt(url.searchParams.get('maxResults') || '10');

                    return HttpResponse.json(
                        mockYouTubeVideos.slice(0, maxResults),
                        { status: 200 }
                    );
                }),
            ],
        },
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ArticleSlider>;

// Mock article data
const mockDefaultArticles = [
    {
        imageUrl: 'https://picsum.photos/180/120?random=1',
        articleType: 'ACHTERGROND',
        heading: '"Een oude, krakkemikkige dominee? Dat is mijn schrikbeeld." Deze predikanten werken door na hun 67e',
        href: '/articles/1',
    },
    {
        imageUrl: 'https://picsum.photos/180/120?random=2',
        articleType: 'NIEUWS',
        heading: 'Nieuwe ontwikkelingen in de Nederlandse kerkgemeenschap',
        href: '/articles/2',
    },
    {
        imageUrl: 'https://picsum.photos/180/120?random=3',
        articleType: 'INTERVIEW',
        heading: 'In gesprek met een jonge dominee over de toekomst van de kerk',
        href: '/articles/3',
    },
    {
        imageUrl: 'https://picsum.photos/180/120?random=4',
        articleType: 'OPINIE',
        heading: 'Waarom jonge gelovigen de kerk verlaten en hoe we dat kunnen keren',
        href: '/articles/4',
    },
    {
        imageUrl: 'https://picsum.photos/180/120?random=5',
        articleType: 'REPORTAGE',
        heading: 'Een week in het leven van een stadspredikant in Amsterdam',
        href: '/articles/5',
    },
    {
        imageUrl: 'https://picsum.photos/180/120?random=6',
        articleType: 'ACHTERGROND',
        heading: 'De geschiedenis van het Nederlands Dagblad in 10 hoogtepunten',
        href: '/articles/6',
    },
    {
        imageUrl: 'https://picsum.photos/180/120?random=7',
        articleType: 'NIEUWS',
        heading: 'Kerken zoeken nieuwe manieren om jongeren te bereiken',
        href: '/articles/7',
    },
    {
        imageUrl: 'https://picsum.photos/180/120?random=8',
        articleType: 'INTERVIEW',
        heading: 'Theoloog over de rol van geloof in moderne samenleving',
        href: '/articles/8',
    },
];

const mockDnkArticles = [
    {
        imageUrl: 'https://picsum.photos/180/120?random=11',
        articleType: 'De Nieuwe Koers',
        heading: 'Jongeren over geloof: "We zoeken naar nieuwe wegen"',
        variant: 'de-nieuwe-koers' as const,
        href: '/articles/dnk-1',
    },
    {
        imageUrl: 'https://picsum.photos/180/120?random=12',
        articleType: 'De Nieuwe Koers',
        heading: 'Innovatieve kerkdiensten trekken nieuwe bezoekers',
        variant: 'de-nieuwe-koers' as const,
        href: '/articles/dnk-2',
    },
    {
        imageUrl: 'https://picsum.photos/180/120?random=13',
        articleType: 'De Nieuwe Koers',
        heading: 'De toekomst van geloof in Nederland: een andere aanpak',
        variant: 'de-nieuwe-koers' as const,
        href: '/articles/dnk-3',
    },
    {
        imageUrl: 'https://picsum.photos/180/120?random=14',
        articleType: 'De Nieuwe Koers',
        heading: 'Moderne theologie bereikt nieuwe generaties',
        variant: 'de-nieuwe-koers' as const,
        href: '/articles/dnk-4',
    },
    {
        imageUrl: 'https://picsum.photos/180/120?random=15',
        articleType: 'De Nieuwe Koers',
        heading: 'Digitale kerk: geloof in het online tijdperk',
        variant: 'de-nieuwe-koers' as const,
        href: '/articles/dnk-5',
    },
];

const mockDnkPublications = [
    {
        articleType: 'De Nieuwe Koers',
        heading: 'DNK Publications',
        variant: 'dnk-publications' as const,
        publicationMonth: 'Februari 2025',
        placeholderText: 'Volgende editie: 1 februari',
        href: '/publications/feb-2025',
    },
    {
        imageUrl: 'https://picsum.photos/180/306?random=31',
        articleType: 'De Nieuwe Koers',
        heading: 'DNK Publications',
        variant: 'dnk-publications' as const,
        publicationMonth: 'Januari 2025',
        href: '/publications/jan-2025',
    },
    {
        imageUrl: 'https://picsum.photos/180/306?random=32',
        articleType: 'De Nieuwe Koers',
        heading: 'DNK Publications',
        variant: 'dnk-publications' as const,
        publicationMonth: 'December 2024',
        href: '/publications/dec-2024',
    },
    {
        imageUrl: 'https://picsum.photos/180/306?random=33',
        articleType: 'De Nieuwe Koers',
        heading: 'DNK Publications',
        variant: 'dnk-publications' as const,
        publicationMonth: 'November 2024',
        href: '/publications/nov-2024',
    },
    {
        imageUrl: 'https://picsum.photos/180/306?random=34',
        articleType: 'De Nieuwe Koers',
        heading: 'DNK Publications',
        variant: 'dnk-publications' as const,
        publicationMonth: 'Oktober 2024',
        href: '/publications/oct-2024',
    },
    {
        imageUrl: 'https://picsum.photos/180/306?random=35',
        articleType: 'De Nieuwe Koers',
        heading: 'DNK Publications',
        variant: 'dnk-publications' as const,
        publicationMonth: 'September 2024',
        href: '/publications/sep-2024',
    },
];

// 1. Default Articles
export const DefaultArticles: Story = {
    args: {
        title: 'Laatste Artikelen',
        articles: mockDefaultArticles,
        showButton: true,
        buttonLabel: 'Meer artikelen',
        buttonUrl: '/artikelen',
    },
};

// 2. Mixed: Default + De Nieuwe Koers
export const MixedArticles: Story = {
    args: {
        title: 'Alle Artikelen',
        articles: [
            ...mockDefaultArticles.slice(0, 4),
            ...mockDnkArticles.slice(0, 4),
        ],
        showButton: true,
        buttonLabel: 'Bekijk meer',
        buttonUrl: '/artikelen',
    },
};

// 3. Video Slider
export const VideoSlider: Story = {
    args: {
        title: "Bekijk onze video's",
        videoConfig: {
            apiEndpoint: '/api/youtube/channel',
            channelId: 'UCxxxxxx',
            maxResults: 8,
        },
        showButton: true,
        buttonLabel: "Bekijk alle video's",
        buttonUrl: 'https://www.youtube.com/@nederlandsdagblad',
    },
};

// 4. DNK Publications with Selection
export const DnkPublicationsWithSelection: Story = {
    args: {
        title: 'De Nieuwe Koers Publicaties',
        articles: mockDnkPublications,
        enableSelection: true,
        showButton: true,
        buttonLabel: 'Bekijk alle publicaties',
        buttonUrl: '/publicaties',
    },
};