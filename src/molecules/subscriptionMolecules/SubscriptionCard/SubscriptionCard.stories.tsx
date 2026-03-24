import type { Meta, StoryObj } from '@storybook/react-vite';
import SubscriptionCard from './subscriptionCard';

const meta = {
    title: 'Molecules/Subscription Molecules/SubscriptionCard',
    component: SubscriptionCard,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        pricePerWeek: { control: 'number' },
        originalPricePerWeek: { control: 'number' },

        isFeatured: { control: 'boolean' },
        ctaLabel: { control: 'text' },
        ctaHref: { control: 'text' },
    },
} satisfies Meta<typeof SubscriptionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultFeatures = [
    { label: 'Onbeperkt ND artikelen', included: true, modalBody: 'Lees onbeperkt ND-artikelen op nd.nl en de ND-app.', modalMediaUrl: 'https://placehold.co/600x300', modalMediaType: 'image' as const },
    { label: 'Elke dag nieuwe puzzels', included: true, modalBody: 'Start je dag met een van onze dagelijkse puzzels.' },
    { label: 'Persoonlijke leeslijst', included: true },
    { label: 'Geef 2 artikelen per maand cadeau', included: true },
    { label: 'Toegang tot digitale krant', included: false },
    { label: 'Toegang tot De Nieuwe Koers', included: false },
    { label: 'Papieren krant', included: false },
    { label: '10 keer per jaar De Nieuwe Koers op papier', included: false },
];

export const DigitaalBasis: Story = {
    args: {
        title: 'Digitaal Basis',
        pricePerWeek: 2.75,
        originalPricePerWeek: 3.17,
        features: defaultFeatures,
        isFeatured: false,
        ctaLabel: 'Kies abonnement',
        ctaHref: '#',
    },
};

export const DigitaalPlus: Story = {
    args: {
        title: 'Digitaal Plus',
        pricePerWeek: 4.95,
        originalPricePerWeek: 6.87,
        features: [
            { label: 'Onbeperkt ND artikelen', included: true, modalBody: 'Lees alle artikelen op nd.nl' },
            { label: 'Elke dag nieuwe puzzels', included: true },
            { label: 'Persoonlijke leeslijst', included: true },
            { label: 'Geef 10 artikelen per maand cadeau', included: true },
            { label: 'Toegang tot digitale krant', included: true },
            { label: 'Toegang tot De Nieuwe Koers', included: true },
            { label: 'Papieren krant', included: false },
            { label: '10 keer per jaar De Nieuwe Koers op papier', included: false },
        ],
        isFeatured: true,
        ctaLabel: 'Kies abonnement',
        ctaHref: '#',
    },
};

export const DigitaalPlusPapier: Story = {
    args: {
        title: 'Digitaal + Papier',
        pricePerWeek: 5.95,
        originalPricePerWeek: 8.50,
        features: [
            { label: 'Onbeperkt ND artikelen', included: true, modalBody: 'Lees alle artikelen op nd.nl' },
            { label: 'Elke dag nieuwe puzzels', included: true },
            { label: 'Persoonlijke leeslijst', included: true },
            { label: 'Geef 10 artikelen per maand cadeau', included: true },
            { label: 'Toegang tot digitale krant', included: true },
            { label: 'Toegang tot De Nieuwe Koers', included: true },
            { label: 'Papieren krant', included: true, modalBody: 'In het weekend of 6 dagen per week' },
            { label: '10 keer per jaar De Nieuwe Koers op papier', included: true },
        ],
        isFeatured: false,
        ctaLabel: 'Kies abonnement',
        ctaHref: '#',
    },
};
