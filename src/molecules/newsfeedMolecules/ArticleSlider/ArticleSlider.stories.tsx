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
        onButtonClick: {
            description: 'Callback function when button is clicked',
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
    },
    {
        imageUrl: 'https://picsum.photos/180/120?random=2',
        articleType: 'NIEUWS',
        heading: 'Nieuwe ontwikkelingen in de Nederlandse kerkgemeenschap',
    },
    {
        imageUrl: 'https://picsum.photos/180/120?random=3',
        articleType: 'INTERVIEW',
        heading: 'In gesprek met een jonge dominee over de toekomst van de kerk',
    },
    {
        imageUrl: 'https://picsum.photos/180/120?random=4',
        articleType: 'OPINIE',
        heading: 'Waarom jonge gelovigen de kerk verlaten en hoe we dat kunnen keren',
    },
    {
        imageUrl: 'https://picsum.photos/180/120?random=5',
        articleType: 'REPORTAGE',
        heading: 'Een week in het leven van een stadspredikant in Amsterdam',
    },
    {
        imageUrl: 'https://picsum.photos/180/120?random=6',
        articleType: 'ACHTERGROND',
        heading: 'De geschiedenis van het Nederlands Dagblad in 10 hoogtepunten',
    },
    {
        imageUrl: 'https://picsum.photos/180/120?random=7',
        articleType: 'NIEUWS',
        heading: 'Kerken zoeken nieuwe manieren om jongeren te bereiken',
    },
    {
        imageUrl: 'https://picsum.photos/180/120?random=8',
        articleType: 'INTERVIEW',
        heading: 'Theoloog over de rol van geloof in moderne samenleving',
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
    },
};

export const ManyArticles: Story = {
    args: {
        articles: [...mockArticles, ...mockArticles, ...mockArticles],
        title: 'Alle artikelen',
    },
};