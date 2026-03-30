import type { Meta, StoryObj } from '@storybook/react';
import ZakelijkAbonnementPage from './ZakelijkAbonnementPage';

const meta: Meta<typeof ZakelijkAbonnementPage> = {
    title: 'Pages/Zakelijk Abonnement',
    component: ZakelijkAbonnementPage,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {
        heroImage: { control: 'text', description: 'URL of the hero background image' },
        heroHeading: { control: 'text', description: 'Main heading in the hero' },
        heroIntro: { control: 'text', description: 'Intro text in the hero' },
        heroCtaLabel: { control: 'text', description: 'Label for the hero CTA button' },
        whyHeading: { control: 'text', description: 'Heading of the "Waarom" section' },
        whyIntro: { control: 'text', description: 'Intro text of the "Waarom" section' },
        comparisonHeading: { control: 'text', description: 'Heading of the comparison table section' },
        featureHeading: { control: 'text', description: 'Heading of the feature section' },
        featureIntro: { control: 'text', description: 'Intro text of the feature section' },
        featureImage: { control: 'text', description: 'URL of the feature section image' },
        featureImageAlt: { control: 'text', description: 'Alt text for the feature section image' },
        ctaHref: { control: 'text', description: 'Destination href for all CTA buttons' },
        ctaLabel: { control: 'text', description: 'Label for the comparison table and closing CTA buttons' },
        ctaHeading: { control: 'text', description: 'Heading of the closing CTA section' },
        ctaIntro: { control: 'text', description: 'Intro text of the closing CTA section' },
    },
};

export default meta;
type Story = StoryObj<typeof ZakelijkAbonnementPage>;

export const Default: Story = {};
