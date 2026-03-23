import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import SubscriptionForm from './SubscriptionForm';

const meta: Meta<typeof SubscriptionForm> = {
    title: 'Organisms/Subscription Organisms/SubscriptionForm',
    component: SubscriptionForm,
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;
type Story = StoryObj<typeof SubscriptionForm>;

const defaultSteps = [
    { label: 'Kies je abonnement' },
    { label: 'Looptijd' },
    { label: 'Gegevens' },
    { label: 'Bestelling afronden' },
];

const personalAlertText = (
    <>
        Woon je in het buitenland? Stuur dan een mail met uw gegevens naar{' '}
        <a href="mailto:aboservice@nd.nl" style={{ textDecoration: 'underline' }}>
            aboservice@nd.nl
        </a>
        .
    </>
);

const termsLabel = (
    <>
        Ik ga akkoord met de{' '}
        <a href="#" style={{ textDecoration: 'underline' }}>privacyverklaring</a>,{' '}
        <a href="#" style={{ textDecoration: 'underline' }}>de actievoorwaarden</a>{' '}
        en{' '}
        <a href="#" style={{ textDecoration: 'underline' }}>algemene voorwaarden</a>.
    </>
);

const defaultArgs = {
    phoneNumber: '088 1 999 999',
    steps: defaultSteps,
    sectionHeading: 'Actieabonnement',
    changeSubscriptionLabel: 'Kies een ander abonnement',
    alertText: 'Na de actieperiode betaal je het dan geldende reguliere tarief en is het abonnement maandelijks opzegbaar.',
    startDateLabel: 'Gewenste startdatum',
    startDate: '24/02/2026',
    paymentHeading: 'Betaalmethode',
    paymentMethods: [
        {
            label: 'iDEAL',
            value: 'ideal',
            description: 'Via een controlebetaling van €0,01 via iDEAL wordt uw rekeningnummer voor de maandelijkse incasso geverifieerd.',
            logoUrl: '/src/assets/images/ideal-logo.png',
        },
        {
            label: 'Standaard machtiging',
            value: 'machtiging',
            description: 'Door hieronder mijn rekeningnummer in te vullen geef ik toestemming voor de maandelijkse incasso van ND.',
            requiresIban: true,
        },
    ],
    initialPaymentMethod: 'ideal',
    paymentFooterText: 'Je ontvangt een bevestiging per e-mail. Je hebt een bedenktijd van 14 dagen.',
    summaryHeading: 'Overzicht bestelling',
    summaryFooterText: 'We incasseren per maand. Na afloop van de actieperiode gelden de reguliere abonnementsprijzen en is het abonnement maandelijks opzegbaar.',
};

export const Default: Story = {
    render: (args) => (
        <SubscriptionForm
            {...args}
            personalAlertText={personalAlertText}
            termsLabel={termsLabel}
        />
    ),
    args: {
        ...defaultArgs,
        subscriptionTitle: 'Digitaal Basis',
        subscriptionSubtitle: 'Actieabonnement',
        subscriptionPricePerWeek: 2.75,
        subscriptionOriginalPricePerWeek: 3.17,
        features: [
            { label: 'Onbeperkt ND artikelen', included: true },
            { label: 'Elke dag nieuwe puzzels', included: true },
            { label: 'Persoonlijke leeslijst', included: true },
            { label: 'Geef 2 artikelen per maand cadeau', included: true },
            { label: 'Digitale krant (PDF)', included: false },
            { label: 'Papieren krant', included: false },
        ],
        durationHeading: 'Kies je looptijd',
        durations: [
            { label: '2 jaar korting (meest gekozen)', value: '2jaar', period: '24 maanden' },
            { label: '1 jaar korting', value: '1jaar', period: '12 maanden' },
        ],
        initialDuration: '2jaar',
    },
};

export const PaperSubscription: Story = {
    render: (args) => (
        <SubscriptionForm
            {...args}
            personalAlertText={personalAlertText}
            termsLabel={termsLabel}
        />
    ),
    args: {
        ...defaultArgs,
        subscriptionTitle: 'Digitaal + Papier',
        subscriptionSubtitle: 'Actieabonnement',
        subscriptionPricePerWeek: 5.95,
        features: [
            { label: 'Onbeperkt ND artikelen', included: true },
            { label: 'Elke dag nieuwe puzzels', included: true },
            { label: 'Persoonlijke leeslijst', included: true },
            { label: 'Geef 2 artikelen per maand cadeau', included: true },
            { label: 'Digitale krant (PDF)', included: true },
            { label: 'Papieren krant', included: true },
        ],
        deliveryDayHeading: 'Op welke dag wil je de papieren krant ontvangen?',
        deliveryDays: [
            { label: 'Zaterdag', description: 'Inclusief de Zeven bijlage', price: '€ 5,95/week', value: 'zat' },
            { label: 'Vrijdag en zaterdag', description: 'Inclusief de bijlagen Gulliver en Zeven', price: '€ 6,95/week', value: 'vrij-zat' },
            { label: 'Maandag t/m zaterdag', description: 'Inclusief de bijlagen Gulliver en Zeven', price: '€ 11,50/week', value: 'ma-zat' },
        ],
        initialDeliveryDay: 'zat',
        durationHeading: 'Kies je looptijd',
        durations: [
            { label: '3 jaar korting', value: '3jaar', period: '36 maanden' },
            { label: '2 jaar korting', value: '2jaar', period: '24 maanden' },
            { label: '1 jaar korting', value: '1jaar', period: '12 maanden' },
        ],
        initialDuration: '3jaar',
    },
};
