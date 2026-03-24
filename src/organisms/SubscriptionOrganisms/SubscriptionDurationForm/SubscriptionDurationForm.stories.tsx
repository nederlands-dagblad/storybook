import type { Meta, StoryObj } from '@storybook/react';
import SubscriptionDurationForm from './SubscriptionDurationForm';

const meta: Meta<typeof SubscriptionDurationForm> = {
    title: 'Organisms/Subscription Organisms/SubscriptionForm/SubscriptionDurationForm',
    component: SubscriptionDurationForm,
    parameters: {
        layout: 'padded',
    },
};

export default meta;
type Story = StoryObj<typeof SubscriptionDurationForm>;

export const Default: Story = {
    args: {
        sectionHeading: 'Actieabonnement',
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
        changeSubscriptionLabel: 'Kies een ander abonnement',
        durationHeading: 'Kies je looptijd',
        durations: [
            { label: '2 jaar korting (meest gekozen)', value: '2jaar', period: '24 maanden' },
            { label: '1 jaar korting', value: '1jaar', period: '12 maanden' },
        ],
        selectedDuration: '2jaar',
        alertText: 'Na de actieperiode betaal je het dan geldende reguliere tarief en is het abonnement maandelijks opzegbaar.',
        startDateLabel: 'Gewenste startdatum',
        startDate: '24/02/2026',
        submitLabel: 'Vul je gegevens in',
    },
};

export const PaperSubscription: Story = {
    args: {
        ...Default.args,
        subscriptionTitle: 'Digitaal + Papier',
        subscriptionPricePerWeek: 5.95,
        subscriptionOriginalPricePerWeek: undefined,
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
        selectedDeliveryDay: 'zat',
        durations: [
            { label: '3 jaar korting', value: '3jaar', period: '36 maanden' },
            { label: '2 jaar korting', value: '2jaar', period: '24 maanden' },
            { label: '1 jaar korting', value: '1jaar', period: '12 maanden' },
        ],
        selectedDuration: '3jaar',
    },
};
