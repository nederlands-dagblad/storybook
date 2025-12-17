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
        href: {
            control: 'text',
            description: 'URL to navigate to when clicking the card',
        },
        onClick: {
            action: 'clicked',
            description: 'Custom click handler',
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
        href: '/articles/1',
    },
};

export const ShortHeading: Story = {
    args: {
        imageUrl: 'https://picsum.photos/180/120',
        articleType: 'Nieuws',
        heading: 'Korte kop voor dit artikel',
        href: '/articles/2',
    },
};

export const DeNieuweKoers: Story = {
    args: {
        imageUrl: 'https://picsum.photos/180/120',
        articleType: 'De Nieuwe Koers',
        heading: 'Dit artikel is onderdeel van De Nieuwe Koers en heeft een rode typografie.',
        variant: 'de-nieuwe-koers',
        href: '/articles/dnk-1',
    },
};

export const DeNieuweKoersLongHeading: Story = {
    args: {
        imageUrl: 'https://picsum.photos/180/120',
        articleType: 'De Nieuwe Koers',
        heading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin scelerisque purus ut orci tincidunt, sed sollicitudin nunc vehicula.',
        variant: 'de-nieuwe-koers',
        href: '/articles/dnk-2',
    },
};

export const DeNieuweKoersNoImage: Story = {
    args: {
        articleType: 'De Nieuwe Koers',
        heading: 'Dit artikel heeft geen afbeelding maar toont wel de DNK badge op de placeholder.',
        variant: 'de-nieuwe-koers',
        href: '/articles/dnk-3',
    },
};

export const Premium: Story = {
    args: {
        imageUrl: 'https://picsum.photos/180/120',
        articleType: 'Achtergrond',
        heading: 'Dit is een premium artikel alleen voor abonnees',
        isPremium: true,
        href: '/articles/premium-1',
    },
};

export const PremiumShortHeading: Story = {
    args: {
        imageUrl: 'https://picsum.photos/180/120',
        articleType: 'Nieuws',
        heading: 'Premium artikel met korte kop',
        isPremium: true,
        href: '/articles/premium-2',
    },
};

export const PremiumDeNieuweKoers: Story = {
    args: {
        imageUrl: 'https://picsum.photos/180/120',
        articleType: 'De Nieuwe Koers',
        heading: 'Dit premium artikel combineert De Nieuwe Koers met premium badge',
        variant: 'de-nieuwe-koers',
        isPremium: true,
        href: '/articles/premium-dnk-1',
    },
};

export const PremiumNoImage: Story = {
    args: {
        articleType: 'Interview',
        heading: 'Premium artikel zonder afbeelding toont alleen de premium badge bij het type',
        isPremium: true,
        href: '/articles/premium-3',
    },
};

export const WithoutLink: Story = {
    args: {
        imageUrl: 'https://picsum.photos/180/120',
        articleType: 'Nieuws',
        heading: 'Dit artikel heeft geen link en werkt als een statische card',
        // No href provided
    },
};

export const WithCustomClickHandler: Story = {
    args: {
        imageUrl: 'https://picsum.photos/180/120',
        articleType: 'Nieuws',
        heading: 'Dit artikel heeft een custom click handler (check de Actions tab)',
        href: '/articles/custom',
    },
};

export const InteractiveGrid: Story = {
    render: () => (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <ArticleCard
                imageUrl="https://picsum.photos/180/120?random=1"
                articleType="Nieuws"
                heading="Eerste artikel in grid"
                href="/articles/grid-1"
            />
            <ArticleCard
                imageUrl="https://picsum.photos/180/120?random=2"
                articleType="Achtergrond"
                heading="Tweede artikel in grid"
                href="/articles/grid-2"
                isPremium
            />
            <ArticleCard
                imageUrl="https://picsum.photos/180/120?random=3"
                articleType="De Nieuwe Koers"
                heading="Derde artikel in grid"
                href="/articles/grid-3"
                variant="de-nieuwe-koers"
            />
        </div>
    ),
};