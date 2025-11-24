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