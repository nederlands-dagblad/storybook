import type { Meta, StoryObj } from '@storybook/react';
import { ArticleCard } from './ArticleCard';

const meta: Meta<typeof ArticleCard> = {
    title: 'Molecules/Newsfeed Molecules/ArticleCard',
    component: ArticleCard,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        imageUrl: {
            control: 'text',
            description: 'URL of the article image (180x120px or 11.25x7.5rem)',
        },
        articleType: {
            control: 'text',
            description: 'Type or category of the article',
        },
        heading: {
            control: 'text',
            description: 'Article heading/title',
        },
        variant: {
            control: 'select',
            options: ['default', 'de-nieuwe-koers'],
            description: 'Default of De Nieuwe Koers variant',
        },
        isPremium: {
            control: 'boolean',
            description: 'Show premium badge next to article type',
        },
        className: {
            control: 'text',
            description: 'Additional CSS classes',
        },
    },
};

export default meta;
type Story = StoryObj<typeof ArticleCard>;

export const Default: Story = {
    args: {
        articleType: 'Achtergrond',
        heading: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin scelerisque purus ut orci tincidunt.",
    },
};

export const ShortHeading: Story = {
    args: {
        imageUrl: 'https://picsum.photos/180/120',
        articleType: 'Nieuws',
        heading: 'Korte kop voor dit artikel',
    },
};

export const DeNieuweKoers: Story = {
    args: {
        imageUrl: 'https://picsum.photos/180/120',
        articleType: 'De Nieuwe Koers',
        heading: 'Dit artikel is onderdeel van De Nieuwe Koers en heeft een rode typografie.',
        variant: 'de-nieuwe-koers',
    },
};

export const DeNieuweKoersLongHeading: Story = {
    args: {
        imageUrl: 'https://picsum.photos/180/120',
        articleType: 'De Nieuwe Koers',
        heading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin scelerisque purus ut orci tincidunt, sed sollicitudin nunc vehicula.',
        variant: 'de-nieuwe-koers',
    },
};

export const DeNieuweKoersNoImage: Story = {
    args: {
        articleType: 'De Nieuwe Koers',
        heading: 'Dit artikel heeft geen afbeelding maar toont wel de DNK badge op de placeholder.',
        variant: 'de-nieuwe-koers',
    },
};

export const Premium: Story = {
    args: {
        imageUrl: 'https://picsum.photos/180/120',
        articleType: 'Achtergrond',
        heading: 'Dit is een premium artikel alleen voor abonnees',
        isPremium: true,
    },
};

export const PremiumShortHeading: Story = {
    args: {
        imageUrl: 'https://picsum.photos/180/120',
        articleType: 'Nieuws',
        heading: 'Premium artikel met korte kop',
        isPremium: true,
    },
};

export const PremiumDeNieuweKoers: Story = {
    args: {
        imageUrl: 'https://picsum.photos/180/120',
        articleType: 'De Nieuwe Koers',
        heading: 'Dit premium artikel combineert De Nieuwe Koers met premium badge',
        variant: 'de-nieuwe-koers',
        isPremium: true,
    },
};

export const PremiumNoImage: Story = {
    args: {
        articleType: 'Interview',
        heading: 'Premium artikel zonder afbeelding toont alleen de premium badge bij het type',
        isPremium: true,
    },
};