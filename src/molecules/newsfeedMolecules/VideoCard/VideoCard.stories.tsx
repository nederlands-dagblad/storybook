import type { Meta, StoryObj } from '@storybook/react';
import { VideoCard } from './VideoCard';

const meta: Meta<typeof VideoCard> = {
    title: 'Molecules/Newsfeed Molecules/VideoCard',
    component: VideoCard,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        imageUrl: {
            control: 'text',
            description: 'URL of the video thumbnail (180x306px or 11.25x19.125rem)',
        },
        heading: {
            control: 'text',
            description: 'Video title',
        },
        articleType: {
            control: 'text',
            description: 'Type label (e.g., "Video")',
        },
        isPremium: {
            control: 'boolean',
            description: 'Show premium badge',
        },
        videoDuration: {
            control: 'text',
            description: 'Duration of the video (e.g., "1:55")',
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
type Story = StoryObj<typeof VideoCard>;

export const Default: Story = {
    args: {
        imageUrl: 'https://picsum.photos/180/306',
        articleType: 'Video',
        heading: 'Dit is een video artikel met een grotere thumbnail',
        videoDuration: '1:55',
        href: '/videos/1',
    },
};

export const ShortHeading: Story = {
    args: {
        imageUrl: 'https://picsum.photos/180/306',
        articleType: 'Video',
        heading: 'Korte video titel',
        videoDuration: '3:24',
        href: '/videos/2',
    },
};

export const NoImage: Story = {
    args: {
        articleType: 'Video',
        heading: 'Video zonder thumbnail toont een grijze placeholder',
        videoDuration: '2:10',
        href: '/videos/3',
    },
};

export const Premium: Story = {
    args: {
        imageUrl: 'https://picsum.photos/180/306',
        articleType: 'Video',
        heading: 'Premium video artikel alleen voor abonnees',
        videoDuration: '5:43',
        isPremium: true,
        href: '/videos/premium-1',
    },
};
