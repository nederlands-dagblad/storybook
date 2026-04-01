import type { Meta, StoryObj } from '@storybook/react';
import { ImageSlider } from './ImageSlider';

const meta: Meta<typeof ImageSlider> = {
    title: 'Molecules/Newsfeed Molecules/ImageSlider',
    component: ImageSlider,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockImages = [
    { imageUrl: 'https://picsum.photos/212/212?random=50', alt: 'Afbeelding 1', href: '/afbeelding/1' },
    { imageUrl: 'https://picsum.photos/212/212?random=51', alt: 'Afbeelding 2', href: '/afbeelding/2' },
    { imageUrl: 'https://picsum.photos/212/212?random=52', alt: 'Afbeelding 3', href: '/afbeelding/3' },
    { imageUrl: 'https://picsum.photos/212/212?random=53', alt: 'Afbeelding 4', href: '/afbeelding/4' },
    { imageUrl: 'https://picsum.photos/212/212?random=54', alt: 'Afbeelding 5', href: '/afbeelding/5' },
    { imageUrl: 'https://picsum.photos/212/212?random=55', alt: 'Afbeelding 6', href: '/afbeelding/6' },
    { imageUrl: 'https://picsum.photos/212/212?random=56', alt: 'Afbeelding 7', href: '/afbeelding/7' },
    { imageUrl: 'https://picsum.photos/212/212?random=57', alt: 'Afbeelding 8', href: '/afbeelding/8' },
];

export const Default: Story = {
    args: {
        images: mockImages,
    },
};

export const WithTitle: Story = {
    args: {
        title: 'Cartoons',
        images: mockImages,
    },
};

export const WithButton: Story = {
    args: {
        title: 'Cartoons',
        images: mockImages,
        showButton: true,
        buttonLabel: 'Bekijk alle cartoons',
        buttonUrl: '/cartoons',
    },
};

const mockCardImages = [
    { variant: 'card' as const, imageUrl: 'https://picsum.photos/212/212?random=60', alt: 'Foto 1', description: 'Zonsondergang boven de stad', metaText: '14 januari 2024', href: '/fotos/1' },
    { variant: 'card' as const, imageUrl: 'https://picsum.photos/212/212?random=61', alt: 'Foto 2', description: 'Markt in het centrum', metaText: '21 februari 2024', href: '/fotos/2' },
    { variant: 'card' as const, imageUrl: 'https://picsum.photos/212/212?random=62', alt: 'Foto 3', description: 'Portret van een straatmuzikant', metaText: '3 maart 2024', href: '/fotos/3' },
    { variant: 'card' as const, imageUrl: 'https://picsum.photos/212/212?random=63', alt: 'Foto 4', description: 'Vogels bij het meer', metaText: '18 april 2024', href: '/fotos/4' },
    { variant: 'card' as const, imageUrl: 'https://picsum.photos/212/212?random=64', alt: 'Foto 5', description: 'Oude binnenstad in de regen', metaText: '5 mei 2024', href: '/fotos/5' },
    { variant: 'card' as const, imageUrl: 'https://picsum.photos/212/212?random=65', alt: 'Foto 6', description: 'Kinderen op het schoolplein', metaText: '29 mei 2024', href: '/fotos/6' },
    { variant: 'card' as const, imageUrl: 'https://picsum.photos/212/212?random=66', alt: 'Foto 7', description: 'Fietser door het park', metaText: '12 juni 2024', href: '/fotos/7' },
    { variant: 'card' as const, imageUrl: 'https://picsum.photos/212/212?random=67', alt: 'Foto 8', description: 'Zeilboten op het IJsselmeer', metaText: '7 juli 2024', href: '/fotos/8' },
];

export const CardVariant: Story = {
    args: {
        title: 'Fotografie',
        images: mockCardImages,
        showButton: true,
        buttonLabel: 'Bekijk alle foto\'s',
        buttonUrl: '/fotos',
    },
};
