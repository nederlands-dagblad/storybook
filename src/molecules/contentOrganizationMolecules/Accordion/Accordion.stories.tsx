import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionItemProps } from './accordion';

const meta: Meta<typeof Accordion & AccordionItemProps> = {
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
        },
        label: {
            control: { type: 'text' }
        },
        content: {
            control: { type: 'text' }
        },
    }
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems = [
    {
        id: 'item-1',
        label: 'Een regel tekst om uit te klappen.',
        content: 'Hier komt meer informatie over de tekst die is uitgeklapt.',
    },
    {
        id: 'item-2',
        label: 'Wat zijn de bezorgtijden van het ND?',
        content: 'Het Nederlands Dagblad wordt doordeweeks voor 7.00 uur bezorgd en op zaterdag voor 9.00 uur.',
    },
    {
        id: 'item-3',
        label: 'Hoe kan ik mijn abonnement opzeggen?',
        content: 'Jammer dat u uw abonnement wilt opzeggen. Wij horen graag van u wat de reden hiervoor is. Wilt u bij voorkeur telefonisch contact met ons opnemen via 088 1 999 999 (optie 1)? Wij zijn bereikbaar op werkdagen van 08.30 tot 12.00 uur. Er geldt een opzegtermijn van één maand voor de nieuwe betalingstermijn.',
    },
    {
        id: 'item-4',
        label: 'Hoe kan ik mijn abonnementsvorm wijzigen?',
        content: 'Als u uw abonnement wilt omzetten naar een andere abonnementsvorm kunt u een mail sturen naar service@nd.nl.',
    }
];

export const SingleItem: Story = {
    args: {
        title: 'Single Default Accordion',
        label: sampleItems[0].label,
        content: sampleItems[0].content,
        allowMultiple: false,
        variant: 'default'
    },
    render: ({ label, content, ...args }) => (
        <Accordion {...args} items={[{ label, content }]} />
    ),
};

export const DoubleItem: Story = {
    args: {
        title: 'Double Item Large Accordion',
        items: sampleItems.slice(0, 2), // Just show first 2 items for cleaner example
        allowMultiple: false,
        variant: 'large'
    },
};