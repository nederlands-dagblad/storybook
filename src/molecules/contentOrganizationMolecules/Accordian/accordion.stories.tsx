import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './accordion';

const meta: Meta<typeof Accordion> = {
    title: 'Molecules/Content Organization Molecules/Accordion',
    component: Accordion,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        allowMultiple: {
            control: { type: 'boolean' }
        },
        variant: {
            control: { type: 'radio' },
            options: ['default', 'large']
        },
        title: {
            control: { type: 'text' }
        }
    }
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems = [
    {
        id: 'item-1',
        question: 'Een regel tekst om uit te klappen.',
        answer: 'Hier komt meer informatie over de tekst die is uitgeklapt.',
    },
    {
        id: 'item-2',
        question: 'Wat zijn de bezorgtijden van het ND?',
        answer: 'Het Nederlands Dagblad wordt doordeweeks voor 7.00 uur bezorgd en op zaterdag voor 9.00 uur.',
    },
    {
        id: 'item-3',
        question: 'Hoe kan ik mijn abonnement opzeggen?',
        answer: 'Jammer dat u uw abonnement wilt opzeggen. Wij horen graag van u wat de reden hiervoor is. Wilt u bij voorkeur telefonisch contact met ons opnemen via 088 1 999 999 (optie 1)? Wij zijn bereikbaar op werkdagen van 08.30 tot 12.00 uur. Er geldt een opzegtermijn van één maand voor de nieuwe betalingstermijn.',
    },
    {
        id: 'item-4',
        question: 'Hoe kan ik mijn abonnementsvorm wijzigen?',
        answer: 'Als u uw abonnement wilt omzetten naar een andere abonnementsvorm kunt u een mail sturen naar service@nd.nl.',
    }
];

export const SingleItem: Story = {
    args: {
        title: 'Single Default Accordion',
        items: [{
            ...sampleItems[0],
            isOpen: false  // Explicitly set to closed
        }],
        allowMultiple: false,
        variant: 'default'
    },
};

export const DoubleItem: Story = {
    args: {
        title: 'Double Item Large Accordion',
        items: sampleItems.slice(0, 2), // Just show first 2 items for cleaner example
        allowMultiple: false,
        variant: 'large'
    },
};