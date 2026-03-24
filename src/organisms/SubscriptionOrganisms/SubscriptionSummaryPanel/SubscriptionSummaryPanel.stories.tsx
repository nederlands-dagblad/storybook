import type { Meta, StoryObj } from '@storybook/react';
import SubscriptionSummaryPanel from './SubscriptionSummaryPanel';

const meta: Meta<typeof SubscriptionSummaryPanel> = {
    title: 'Organisms/Subscription Organisms/SubscriptionForm/SubscriptionSummaryPanel',
    component: SubscriptionSummaryPanel,
    parameters: {
        layout: 'padded',
    },
};

export default meta;
type Story = StoryObj<typeof SubscriptionSummaryPanel>;

const defaultFeatures = [
    { label: 'Onbeperkt ND artikelen', included: true, modalBody: 'Lees onbeperkt ND-artikelen op nd.nl en de ND-app.' },
    { label: 'Elke dag nieuwe puzzels', included: true },
    { label: 'Persoonlijke leeslijst', included: true },
    { label: 'Geef 2 artikelen per maand cadeau', included: true },
    { label: 'Digitale krant (PDF)', included: false },
    { label: 'Papieren krant', included: false },
];

const defaultRows = [
    { label: 'Actieperiode', value: '24 maanden' },
    { label: 'Ingangsdatum', value: 'Vandaag' },
    { label: 'Totaal', value: '€ 2,75 per week', originalValue: '€ 3,17 per week', isDivider: true },
];

export const Default: Story = {
    args: {
        heading: 'Overzicht bestelling',
        subscriptionTitle: 'Digitaal Basis',
        subscriptionSubtitle: 'Actieabonnement',
        features: defaultFeatures,
        changeSubscriptionLabel: 'Kies een ander abonnement',
        rows: defaultRows,
        footerText: 'We incasseren per maand. Na afloop van de actieperiode gelden de reguliere abonnementsprijzen.',
        showOnMobile: true,
    },
};

export const WithPersonalData: Story = {
    args: {
        ...Default.args,
        personalData: {
            firstName: 'Jan',
            middleName: 'van',
            lastName: 'Dijk',
            email: 'jan.vandijk@example.com',
            phone: '0612345678',
            postcode: '1234 AB',
            houseNumber: '42',
            addition: '',
            street: 'Voorbeeldstraat',
            city: 'Amsterdam',
        },
        changePersonalLabel: 'Wijzig gegevens',
        showOnMobile: true,
    },
};

export const Inline: Story = {
    args: {
        ...Default.args,
        inline: true,
    },
};
