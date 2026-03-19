import type { Meta, StoryObj } from '@storybook/react';
import SubscriptionCards from './SubscriptionCards';

const meta: Meta<typeof SubscriptionCards> = {
    title: 'Organisms/SubscriptionOrganisms/SubscriptionCards',
    component: SubscriptionCards,
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;
type Story = StoryObj<typeof SubscriptionCards>;

export const Default: Story = {
    args: {
        heading: 'Word lid van het Nederlands Dagblad',
        benefits: [
            { label: 'Steun christelijke kwaliteitsjournalistiek' },
            { label: 'Korting voor nieuwe abonnees', hasInfo: true },
            { label: '14 dagen bedenktijd' },
        ],
        steps: [
            { label: 'Kies je abonnement' },
            { label: 'Looptijd' },
            { label: 'Gegevens' },
            { label: 'Bestelling afronden' },
        ],
        currentStep: 1,
        cards: [
            {
                title: 'Digitaal Basis',
                pricePerWeek: 2.75,
                originalPricePerWeek: 3.17,
                ctaHref: '#',
                features: [
                    { label: 'Onbeperkt ND artikelen', included: true },
                    { label: 'Elke dag nieuwe puzzels', included: true },
                    { label: 'Persoonlijke leeslijst', included: true },
                    { label: 'Geef 2 artikelen per maand cadeau', included: true },
                    { label: 'Toegang tot digitale krant', included: false },
                    { label: 'Toegang tot De Nieuwe Koers', included: false },
                    { label: 'Papieren krant', included: false },
                    { label: '10 keer per jaar De Nieuwe Koers op papier', included: false },
                ],
            },
            {
                title: 'Digitaal Plus',
                pricePerWeek: 4.95,
                originalPricePerWeek: 6.99,
                isFeatured: true,
                ctaHref: '#',
                features: [
                    { label: 'Onbeperkt ND artikelen', included: true },
                    { label: 'Elke dag nieuwe puzzels', included: true },
                    { label: 'Persoonlijke leeslijst', included: true },
                    { label: 'Geef 10 artikelen per maand cadeau', included: true },
                    { label: 'Toegang tot digitale krant', included: true },
                    { label: 'Toegang tot De Nieuwe Koers', included: true },
                    { label: 'Papieren krant', included: false },
                    { label: '10 keer per jaar De Nieuwe Koers op papier', included: false },
                ],
            },
            {
                title: 'Digitaal + Papier',
                pricePerWeek: 5.95,
                originalPricePerWeek: 8.47,
                ctaHref: '#',
                features: [
                    { label: 'Onbeperkt ND artikelen', included: true },
                    { label: 'Elke dag nieuwe puzzels', included: true },
                    { label: 'Persoonlijke leeslijst', included: true },
                    { label: 'Geef 10 artikelen per maand cadeau', included: true },
                    { label: 'Toegang tot digitale krant', included: true },
                    { label: 'Toegang tot De Nieuwe Koers', included: true },
                    {
                        label: 'Papieren krant',
                        included: true,
                        modalBody: 'in het weekend of 6 dagen per week',
                    },
                    { label: '10 keer per jaar De Nieuwe Koers op papier', included: true },
                ],
            },
        ],
        footerText: 'De introductietarieven op deze pagina zijn alleen geldig voor nieuwe abonnees die de afgelopen 12 maanden geen abonnement hebben gehad.',
        footerLinkLabel: 'Vraag hier een regulier abonnement aan.',
        footerLinkHref: '#',
    },
};
