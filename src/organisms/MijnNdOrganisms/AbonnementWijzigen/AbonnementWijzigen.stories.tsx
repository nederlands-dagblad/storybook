import type { Meta, StoryObj } from '@storybook/react';
import { AbonnementWijzigen } from './AbonnementWijzigen';
import { SubscriptionFeature } from '@molecules/subscriptionMolecules/SubscriptionCard/SubscriptionCard';

const basisFeatures: SubscriptionFeature[] = [
    { label: 'Digitale krant', included: true },
    { label: 'Toegang tot archief', included: false },
    { label: 'Papieren krant', included: false },
];

const plusFeatures: SubscriptionFeature[] = [
    { label: 'Digitale krant', included: true },
    { label: 'Toegang tot archief', included: true },
    { label: 'Papieren krant', included: false },
];

const papierFeatures: SubscriptionFeature[] = [
    { label: 'Digitale krant', included: true },
    { label: 'Toegang tot archief', included: true },
    { label: 'Papieren krant', included: true },
];

const bezorgDagen = [
    { label: 'Zaterdag', description: 'Inclusief de Zeven bijlage', price: '€ 5,95/week', value: 'zat' },
    { label: 'Vrijdag en zaterdag', description: 'Inclusief de bijlagen Gulliver en Zeven', price: '€ 6,95/week', value: 'vrij-zat' },
    { label: 'Maandag t/m zaterdag', description: 'Inclusief de bijlagen Gulliver en Zeven', price: '€ 11,50/week', value: 'ma-zat' },
];

const meta: Meta<typeof AbonnementWijzigen> = {
    title: 'Organisms/Mijn ND Organisms/AbonnementWijzigen',
    component: AbonnementWijzigen,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        currentSubscription: {
            control: { type: 'select' },
            options: [undefined, 'digitaal-basis', 'digitaal-plus', 'digitaal-papier'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ActieAbonnement: Story = {
    args: {
        currentSubscription: 'digitaal-basis',
        actieAbonnement: true,
        prijsDigitaalBasis: '€ 9,99',
        prijsDigitaalPlus: '€ 12,99',
        prijsDigitaalPapier: '€ 19,99',
        bezorgDagen,
        features: {
            'digitaal-basis': basisFeatures,
            'digitaal-plus': plusFeatures,
            'digitaal-papier': papierFeatures,
        },
    },
};

export const PapierAbonnement: Story = {
    args: {
        currentSubscription: 'digitaal-basis',
        prijsDigitaalBasis: '€ 9,99',
        prijsDigitaalPlus: '€ 12,99',
        prijsDigitaalPapier: '€ 19,99',
        bezorgDagen,
        features: {
            'digitaal-basis': basisFeatures,
            'digitaal-plus': plusFeatures,
            'digitaal-papier': papierFeatures,
        },
    },
};

export const Default: Story = {
    args: {
        currentSubscription: 'digitaal-basis',
        prijsDigitaalBasis: '€ 9,99',
        prijsDigitaalPlus: '€ 12,99',
        prijsDigitaalPapier: '€ 19,99',
        bezorgDagen,
        features: {
            'digitaal-basis': basisFeatures,
            'digitaal-plus': plusFeatures,
            'digitaal-papier': papierFeatures,
        },
    },
};
