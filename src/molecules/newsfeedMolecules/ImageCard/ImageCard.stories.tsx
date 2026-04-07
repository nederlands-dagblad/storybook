import type { Meta, StoryObj } from '@storybook/react';
import { ImageCard } from './ImageCard';

const meta: Meta<typeof ImageCard> = {
    title: 'Molecules/Newsfeed Molecules/ImageCard',
    component: ImageCard,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        imageUrl: {
            control: 'text',
            description: 'URL of the image (square, 212x212px)',
        },
        alt: {
            control: 'text',
            description: 'Alt text for the image',
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
type Story = StoryObj<typeof ImageCard>;

export const Default: Story = {
    args: {
        imageUrl: 'https://picsum.photos/212/212?random=20',
        alt: 'Fotografie',
        href: '/photos/1',
    },
};

export const NoImage: Story = {
    args: {
        alt: 'Placeholder',
        href: '/photos/2',
    },
};

export const Card: Story = {
    args: {
        variant: 'card',
        imageUrl: 'https://picsum.photos/212/212?random=20',
        alt: 'Fotografie',
        description: 'Een mooie beschrijving van deze afbeelding',
        metaText: '12 maart 2024',
        href: '/photos/1',
    },
};

export const CardNoMeta: Story = {
    args: {
        variant: 'card',
        imageUrl: 'https://picsum.photos/212/212?random=21',
        alt: 'Fotografie',
        description: 'Alleen een beschrijving, geen meta tekst',
        href: '/photos/2',
    },
};

export const Grid: Story = {
    render: () => (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <ImageCard
                imageUrl="https://picsum.photos/212/212?random=40"
                alt="Cartoon 1"
                href="/cartoons/1"
            />
            <ImageCard
                imageUrl="https://picsum.photos/212/212?random=41"
                alt="Cartoon 2"
                href="/cartoons/2"
            />
            <ImageCard
                imageUrl="https://picsum.photos/212/212?random=42"
                alt="Cartoon 3"
                href="/cartoons/3"
            />
        </div>
    ),
};
