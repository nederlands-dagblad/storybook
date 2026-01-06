import type { Meta, StoryObj } from '@storybook/react';
import { ArticleSlider } from './ArticleSlider';

const meta: Meta<typeof ArticleSlider> = {
    title: 'Molecules/Newsfeed Molecules/ArticleSlider',
    component: ArticleSlider,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        articles: {
            description: 'Array of article objects to display in the slider',
        },
        title: {
            control: 'text',
            description: 'Optional title for the slider section',
        },
        showButton: {
            control: 'boolean',
            description: 'Show/hide the "load more" button',
        },
        buttonLabel: {
            control: 'text',
            description: 'Label text for the button',
        },
        buttonUrl: {
            control: 'text',
            description: 'URL to navigate to when button is clicked',
        },
        onButtonClick: {
            action: 'button clicked',
            description: 'Optional callback function when button is clicked (for tracking, etc.)',
        },
        className: {
            control: 'text',
            description: 'Additional CSS classes',
        },
    },
};

export default meta;
type Story = StoryObj<typeof ArticleSlider>;

const mockArticles = [
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

const mockMixedArticles = [
    {
        imageUrl: 'https://picsum.photos/180/120?random=21',
        articleType: 'ACHTERGROND',
        heading: 'Traditionele waarden in een moderne wereld',
        href: '/articles/mixed-1',
    },
    {
        imageUrl: 'https://picsum.photos/180/120?random=22',
        articleType: 'De Nieuwe Koers',
        heading: 'Nieuwe geloofsgemeenschappen in stedelijk gebied',
        variant: 'de-nieuwe-koers' as const,
        href: '/articles/mixed-2',
    },
    {
        imageUrl: 'https://picsum.photos/180/120?random=23',
        articleType: 'NIEUWS',
        heading: 'Ontwikkelingen in de protestantse kerk',
        href: '/articles/mixed-3',
    },
    {
        imageUrl: 'https://picsum.photos/180/120?random=24',
        articleType: 'De Nieuwe Koers',
        heading: 'Jongerenwerk in de kerk krijgt nieuwe impulse',
        variant: 'de-nieuwe-koers' as const,
        href: '/articles/mixed-4',
    },
    {
        imageUrl: 'https://picsum.photos/180/120?random=25',
        articleType: 'INTERVIEW',
        heading: 'Gesprek met een kerkelijk werker over verandering',
        href: '/articles/mixed-5',
    },
    {
        imageUrl: 'https://picsum.photos/180/120?random=26',
        articleType: 'De Nieuwe Koers',
        heading: 'Experimentele vormen van gemeenschap en aanbidding',
        variant: 'de-nieuwe-koers' as const,
        href: '/articles/mixed-6',
    },
];

export const Default: Story = {
    args: {
        articles: mockArticles,
        title: 'Laatste artikelen',
    },
};

export const WithButton: Story = {
    args: {
        articles: mockArticles,
        title: 'Laatste artikelen',
        showButton: true,
        buttonLabel: 'Meer laden',
        buttonUrl: '/meer-artikelen',
    },
};

export const WithoutTitle: Story = {
    args: {
        articles: mockArticles,
    },
};

export const FewArticles: Story = {
    args: {
        articles: mockArticles.slice(0, 3),
        title: 'Uitgelichte artikelen',
        showButton: true,
        buttonLabel: 'Bekijk meer',
        buttonUrl: '/uitgelicht',
    },
};

export const ManyArticles: Story = {
    args: {
        articles: [...mockArticles, ...mockArticles, ...mockArticles],
        title: 'Alle artikelen',
    },
};

export const DeNieuweKoers: Story = {
    args: {
        articles: mockDnkArticles,
        title: 'De Nieuwe Koers',
        showButton: true,
        buttonLabel: 'Bekijk alle artikelen',
        buttonUrl: '/de-nieuwe-koers',
    },
};

export const MixedVariants: Story = {
    args: {
        articles: mockMixedArticles,
        title: 'Gemengde artikelen',
        showButton: true,
        buttonLabel: 'Meer artikelen',
        buttonUrl: '/artikelen',
    },
};