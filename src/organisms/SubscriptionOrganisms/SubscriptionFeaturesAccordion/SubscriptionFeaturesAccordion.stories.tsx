import type { Meta, StoryObj } from '@storybook/react';
import SubscriptionFeaturesAccordion from './SubscriptionFeaturesAccordion';

const meta: Meta<typeof SubscriptionFeaturesAccordion> = {
    title: 'Organisms/Subscription Organisms/SubscriptionForm/SubscriptionFeaturesAccordion',
    component: SubscriptionFeaturesAccordion,
    parameters: {
        layout: 'padded',
    },
};

export default meta;
type Story = StoryObj<typeof SubscriptionFeaturesAccordion>;

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
        label: 'Digitaal Basis',
        subLabel: 'Actieabonnement',
        features: defaultFeatures,
        changeSubscriptionLabel: 'Kies een ander abonnement',
    },
};

export const WithPrice: Story = {
    args: {
        label: 'Digitaal + Papier',
        subLabel: (
            <span className="flex gap-xs">
                <span className="line-through text-text-subtle">€ 8,50</span>
                <span>€ 5,95 per week</span>
            </span>
        ),
        features: [
            { label: 'Onbeperkt ND artikelen', included: true },
            { label: 'Elke dag nieuwe puzzels', included: true },
            { label: 'Persoonlijke leeslijst', included: true },
            { label: 'Geef 10 artikelen per maand cadeau', included: true },
            { label: 'Digitale krant (PDF)', included: true },
            { label: 'Papieren krant', included: true },
        ],
        changeSubscriptionLabel: 'Kies een ander abonnement',
    },
};
