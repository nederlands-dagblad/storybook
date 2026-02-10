import type { Meta, StoryObj } from '@storybook/react';
import { PageHeading } from './PageHeading';

const meta: Meta<typeof PageHeading> = {
    title: 'Atoms/Display Atoms/PageHeading',
    component: PageHeading,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        title: {
            control: 'text',
            description: 'The heading text',
        },
        showBody: {
            control: 'boolean',
            description: 'Toggle to show/hide body text',
        },
        bodyText: {
            control: 'text',
            description: 'Optional body text below the heading',
        },
    },
};

export default meta;
type Story = StoryObj<typeof PageHeading>;

export const Default: Story = {
    args: {
        title: 'Welkom bij het portaal',
    },
};

export const WithBody: Story = {
    args: {
        title: 'Welkom bij het portaal',
        showBody: true,
        bodyText: 'Hier vindt u alle informatie over uw abonnement en account instellingen.',
    },
};

export const LongTitle: Story = {
    args: {
        title: 'Dit is een langere titel voor de pagina heading',
    },
};

export const LongTitleWithBody: Story = {
    args: {
        title: 'Dit is een langere titel voor de pagina heading',
        showBody: true,
        bodyText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
};
