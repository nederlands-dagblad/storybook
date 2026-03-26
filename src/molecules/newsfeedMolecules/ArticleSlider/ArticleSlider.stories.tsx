import type { Meta, StoryObj } from '@storybook/react';
import { ArticleSlider } from './ArticleSlider';

const meta: Meta<typeof ArticleSlider> = {
    title: 'Molecules/Newsfeed Molecules/ArticleSlider',
    component: ArticleSlider,
    parameters: {
        layout: 'padded',
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

// 3. Cartoons Image Slider
const mockCartoons = [
    { imageUrl: 'https://picsum.photos/212/212?random=40', articleType: 'Cartoon', heading: '', variant: 'image' as const, href: '/cartoons/1' },
    { imageUrl: 'https://picsum.photos/212/212?random=41', articleType: 'Cartoon', heading: '', variant: 'image' as const, href: '/cartoons/2' },
    { imageUrl: 'https://picsum.photos/212/212?random=42', articleType: 'Cartoon', heading: '', variant: 'image' as const, href: '/cartoons/3' },
    { imageUrl: 'https://picsum.photos/212/212?random=43', articleType: 'Cartoon', heading: '', variant: 'image' as const, href: '/cartoons/4' },
    { imageUrl: 'https://picsum.photos/212/212?random=44', articleType: 'Cartoon', heading: '', variant: 'image' as const, href: '/cartoons/5' },
    { imageUrl: 'https://picsum.photos/212/212?random=45', articleType: 'Cartoon', heading: '', variant: 'image' as const, href: '/cartoons/6' },
    { imageUrl: 'https://picsum.photos/212/212?random=46', articleType: 'Cartoon', heading: '', variant: 'image' as const, href: '/cartoons/7' },
    { imageUrl: 'https://picsum.photos/212/212?random=47', articleType: 'Cartoon', heading: '', variant: 'image' as const, href: '/cartoons/8' },
];

export const Cartoons: Story = {
    args: {
        title: 'Cartoons',
        articles: mockCartoons,
        showButton: false,
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
