import type { Meta, StoryObj } from '@storybook/react';
import Hero from './Hero';

const meta: Meta<typeof Hero> = {
    title: 'Molecules/Page Section Molecules/Hero',
    component: Hero,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;
type Story = StoryObj<typeof Hero>;

export const Default: Story = {
    args: {
        backgroundImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600',
        heading: 'Zakelijk abonnement bij het ND',
        intro: 'Geef je organisatie meer dan alleen nieuws – geef ze inzicht, inspiratie en een herkenbaar perspectief. Met ons zakelijk abonnement krijgt je organisatie toegang tot journalistiek die dieper graaft, raakt en verbindt.',
        ctaLabel: 'Direct aanvragen',
        ctaHref: '#',
    },
};

export const WithoutCta: Story = {
    args: {
        backgroundImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600',
        heading: 'Zakelijk abonnement bij het ND',
        intro: 'Geef je organisatie meer dan alleen nieuws – geef ze inzicht, inspiratie en een herkenbaar perspectief.',
    },
};
