import type { Meta, StoryObj } from '@storybook/react-vite';
import { Faq } from "./Faq.tsx";

const meta = {
    title: 'Molecules/Portal Molecules/Faq',
    component: Faq,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Faq>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title: 'Veelgestelde vragen',
        items: [
            {
                question: 'Wat zijn de bezorgtijden van het ND?',
                answer: 'Het Nederlands Dagblad wordt doordeweeks voor 7.00 uur bezorgd en op zaterdag voor 9.00 uur.',
            },
            {
                question: 'Hoe kan ik mijn abonnement opzeggen?',
                answer: 'Jammer dat u uw abonnement wilt opzeggen. Wij horen graag van u wat de reden hiervoor is. Wilt u bij voorkeur telefonisch contact met ons opnemen via 088 1 999 999 (optie 1)? Wij zijn bereikbaar op werkdagen van 08.30 tot 12.00 uur. Er geldt een opzegtermijn van één maand voor de nieuwe betalingstermijn.',
            },
            {
                question: 'Hoe kan ik mijn abonnementsvorm wijzigen?',
                answer: 'Als u uw abonnement wilt omzetten naar een andere abonnementsvorm kunt u een mail sturen naar service@nd.nl.',
            },
            {
                question: 'Hoe gaat het ND om met mijn gegevens?',
                answer: 'Natuurlijk gaan we voorzichtig om met de gegevens van onze abonnees en geregistreerden. Lees hier het privacy-statement.',
            }
        ],
    },
};

export const SingleItem: Story = {
    args: {
        items: [
            {
                question: 'Wat zijn de bezorgtijden van het ND?',
                answer: 'Het Nederlands Dagblad wordt doordeweeks voor 7.00 uur bezorgd en op zaterdag voor 9.00 uur.',
            }
        ],
    },
};

export const WithoutTitle: Story = {
    args: {
        items: [
            {
                question: 'Hoe kan ik mijn abonnement opzeggen?',
                answer: 'Jammer dat u uw abonnement wilt opzeggen. Wij horen graag van u wat de reden hiervoor is.',
            },
            {
                question: 'Hoe kan ik mijn abonnementsvorm wijzigen?',
                answer: 'Als u uw abonnement wilt omzetten naar een andere abonnementsvorm kunt u een mail sturen naar service@nd.nl.',
            }
        ],
    },
};