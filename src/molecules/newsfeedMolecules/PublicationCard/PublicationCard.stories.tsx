import type { Meta, StoryObj } from '@storybook/react';
import { PublicationCard } from './PublicationCard';

const meta: Meta<typeof PublicationCard> = {
    title: 'Molecules/Newsfeed Molecules/PublicationCard',
    component: PublicationCard,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        imageUrl: {
            control: 'text',
            description: 'URL of the publication cover image',
        },
        heading: {
            control: 'text',
            description: 'Publication heading',
        },
        publicationMonth: {
            control: 'text',
            description: 'Publication month (e.g., "Januari 2025")',
        },
        placeholderText: {
            control: 'text',
            description: 'Text to display when no image (e.g., "Volgende editie: 1 februari")',
        },
        href: {
            control: 'text',
            description: 'URL to navigate to when clicking the card',
        },
        onClick: {
            action: 'clicked',
        },
        className: {
            control: 'text',
        },
    },
};

export default meta;
type Story = StoryObj<typeof PublicationCard>;

export const Default: Story = {
    args: {
        imageUrl: 'https://picsum.photos/180/306?random=7',
        heading: 'DNK Publications',
        publicationMonth: 'Januari 2025',
        href: '/publications/january-2025',
    },
};

export const NoImage: Story = {
    args: {
        heading: 'DNK Publications',
        publicationMonth: 'December 2024',
        placeholderText: 'Volgende editie: 1 februari',
        href: '/publications/december-2024',
    },
};

export const WithDownloadButton: Story = {
    args: {
        imageUrl: 'https://picsum.photos/180/306?random=13',
        heading: 'DNK Publications',
        publicationMonth: 'Januari 2025',
        href: '/publications/january-2025',
        buttonProps: {
            label: 'Download PDF',
            href: '/publications/january-2025',
            iconLeft: 'download',
            iconLeftVariant: 'outline',
        },
    },
};

export const Grid: Story = {
    render: () => (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', alignItems: 'start' }}>
            <PublicationCard
                imageUrl="https://picsum.photos/180/306?random=10"
                heading="DNK Publications"
                publicationMonth="Januari 2025"
                href="/publications/jan-2025"
            />
            <PublicationCard
                imageUrl="https://picsum.photos/180/306?random=11"
                heading="DNK Publications"
                publicationMonth="December 2024"
                href="/publications/dec-2024"
            />
            <PublicationCard
                heading="DNK Publications"
                publicationMonth="November 2024"
                placeholderText="Volgende editie: 1 november"
                href="/publications/nov-2024"
            />
        </div>
    ),
};
