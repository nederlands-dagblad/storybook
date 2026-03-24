import type { Meta, StoryObj } from '@storybook/react-vite';
import SubscriptionFeaturesList from './SubscriptionFeaturesList';

const meta = {
    title: 'Molecules/Subscription Molecules/SubscriptionFeaturesList',
    component: SubscriptionFeaturesList,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof SubscriptionFeaturesList>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultFeatures = [
    { label: 'Onbeperkt ND artikelen', included: true, modalBody: 'Lees onbeperkt ND-artikelen op nd.nl en de ND-app.', modalMediaUrl: 'https://placehold.co/600x300', modalMediaType: 'image' as const },
    { label: 'Elke dag nieuwe puzzels', included: true, modalBody: 'Start je dag met een van onze dagelijkse puzzels.' },
    { label: 'Persoonlijke leeslijst', included: true },
    { label: 'Geef 2 artikelen per maand cadeau', included: true },
    { label: 'Digitale krant (PDF)', included: false },
    { label: 'Papieren krant', included: false },
];

export const Default: Story = {
    args: {
        features: defaultFeatures,
    },
};

export const WithPaper: Story = {
    args: {
        features: [
            { label: 'Onbeperkt ND artikelen', included: true, modalBody: 'Lees onbeperkt ND-artikelen op nd.nl en de ND-app.' },
            { label: 'Elke dag nieuwe puzzels', included: true },
            { label: 'Persoonlijke leeslijst', included: true },
            { label: 'Geef 10 artikelen per maand cadeau', included: true },
            { label: 'Digitale krant (PDF)', included: true },
            { label: 'Papieren krant', included: true, modalBody: 'In het weekend of 6 dagen per week.' },
        ],
    },
};
