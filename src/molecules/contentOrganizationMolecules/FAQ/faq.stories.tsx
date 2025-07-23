import type { Meta, StoryObj } from '@storybook/react';
import { FAQ } from './faq';

const meta: Meta<typeof FAQ> = {
    title: 'Molecules/Content Organization Molecules/FAQ',
    component: FAQ,
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

const faqItems = [
    {
        id: 'faq-1',
        question: 'Wat zijn de bezorgtijden van het ND?',
        answer: 'Het Nederlands Dagblad wordt doordeweeks voor 7.00 uur bezorgd en op zaterdag voor 9.00 uur.'
    },
    {
        id: 'faq-2',
        question: 'Hoe kan ik mijn abonnement opzeggen?',
        answer: 'Jammer dat u uw abonnement wilt opzeggen. Wij horen graag van u wat de reden hiervoor is. Wilt u bij voorkeur telefonisch contact met ons opnemen via 088 1 999 999 (optie 1)? Wij zijn bereikbaar op werkdagen van 08.30 tot 12.00 uur. Er geldt een opzegtermijn van één maand voor de nieuwe betalingstermijn.'
    },
    {
        id: 'faq-3',
        question: 'Hoe kan ik mijn abonnementsvorm wijzigen?',
        answer: 'Als u uw abonnement wilt omzetten naar een andere abonnementsvorm kunt u een mail sturen naar service@nd.nl.'
    },
    {
        id: 'faq-4',
        question: 'Kan ik mijn krant tijdelijk stopzetten?',
        answer: 'Ja, u kunt uw krant tijdelijk stopzetten tijdens vakanties. Neem hiervoor contact op met onze klantenservice.'
    }
];

export const Default: Story = {
    args: {
        items: faqItems,
        allowMultiple: false,
        variant: 'default'
    },
};

export const MultipleOpen: Story = {
    args: {
        title: 'FAQ - Meerdere vragen open',
        items: faqItems,
        allowMultiple: true,
        variant: 'default'
    },
};

export const LargeText: Story = {
    args: {
        title: 'FAQ - Grote tekst',
        items: faqItems.slice(0, 3),
        allowMultiple: false,
        variant: 'large'
    },
};