import type { Meta, StoryObj } from '@storybook/react';
import SubscriptionLandingPage from './SubscriptionLandingPage';

const meta: Meta<typeof SubscriptionLandingPage> = {
    title: 'Pages/Subscription Landing',
    component: SubscriptionLandingPage,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SubscriptionLandingPage>;

export const Default: Story = {
    args: {
        helpImage: 'https://picsum.photos/200/200?random=99',
    },
};

export const WithCustomContent: Story = {
    args: {
        selectionFrame: {
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
                        { label: 'Papieren krant', included: true },
                        { label: '10 keer per jaar De Nieuwe Koers op papier', included: true },
                    ],
                },
            ],
            footerText: 'De introductietarieven zijn alleen geldig voor nieuwe abonnees die de afgelopen 12 maanden geen abonnement hebben gehad.',
            footerLinkLabel: 'Vraag hier een regulier abonnement aan.',
            footerLinkHref: '#',
        },
        sliderTitle: 'Voordelen van een ND abonnement',
        sliderImages: [
            { variant: 'card', imageUrl: 'https://picsum.photos/212/212?random=80', alt: 'Foto 1', description: 'Nieuws dat raakt', metaText: '14 januari 2024' },
            { variant: 'card', imageUrl: 'https://picsum.photos/212/212?random=81', alt: 'Foto 2', description: 'Diepgaande reportages', metaText: '21 februari 2024' },
            { variant: 'card', imageUrl: 'https://picsum.photos/212/212?random=82', alt: 'Foto 3', description: 'Opinie en achtergrond', metaText: '3 maart 2024' },
            { variant: 'card', imageUrl: 'https://picsum.photos/212/212?random=83', alt: 'Foto 4', description: 'Christelijk perspectief', metaText: '18 april 2024' },
            { variant: 'card', imageUrl: 'https://picsum.photos/212/212?random=84', alt: 'Foto 5', description: 'Cultuur en samenleving', metaText: '5 mei 2024' },
        ],
        faqHeading: 'Veelgestelde vragen',
        faqItems: [
            { label: 'Kan ik mijn abonnement op elk moment opzeggen?', content: 'Ja, je kunt je abonnement op elk moment opzeggen. Na de minimale looptijd kun je per maand opzeggen.' },
            { label: 'Geldt de korting ook voor een bestaand abonnement?', content: 'Nee, de introductiekorting geldt alleen voor nieuwe abonnees die de afgelopen 12 maanden geen abonnement hebben gehad.' },
            { label: 'Hoe kan ik de digitale krant lezen?', content: 'De digitale krant is beschikbaar via de ND-app en de website. Je kunt hem lezen op je telefoon, tablet of computer.' },
        ],
        helpImage: 'https://picsum.photos/200/200?random=99',
        helpImageAlt: 'Hulp illustratie',
        helpHeading: 'Hulp nodig?',
        helpIntro: 'Heb je een vraag over het afsluiten van een abonnement of over je huidige abonnement? We helpen je graag.',
        helpCtaLabel: 'Neem contact op',
        helpCtaHref: '#',
    },
};
