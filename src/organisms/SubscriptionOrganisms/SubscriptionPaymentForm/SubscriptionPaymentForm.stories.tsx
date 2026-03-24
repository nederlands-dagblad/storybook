import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import SubscriptionPaymentForm from './SubscriptionPaymentForm';

const meta: Meta<typeof SubscriptionPaymentForm> = {
    title: 'Organisms/Subscription Organisms/SubscriptionForm/SubscriptionPaymentForm',
    component: SubscriptionPaymentForm,
    parameters: {
        layout: 'padded',
    },
};

export default meta;
type Story = StoryObj<typeof SubscriptionPaymentForm>;

const termsLabel = (
    <>
        Ik ga akkoord met de{' '}
        <a href="#" style={{ textDecoration: 'underline' }}>privacyverklaring</a>,{' '}
        <a href="#" style={{ textDecoration: 'underline' }}>de actievoorwaarden</a>{' '}
        en{' '}
        <a href="#" style={{ textDecoration: 'underline' }}>algemene voorwaarden</a>.
    </>
);

export const Default: Story = {
    render: (args) => <SubscriptionPaymentForm {...args} termsLabel={termsLabel} />,
    args: {
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
        submitLabel: 'Bevestigen',
        footerText: 'Je ontvangt een bevestiging per e-mail. Je hebt een bedenktijd van 14 dagen.',
    },
};
