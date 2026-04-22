import type { Meta, StoryObj } from '@storybook/react';
import { CampaignContainer } from './CampaignContainer';

const meta: Meta<typeof CampaignContainer> = {
    title: 'Molecules/Feedback Molecules/CampaignContainer',
    component: CampaignContainer,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        title: {
            control: 'text',
            description: 'Title of the campaign container',
        },
        text: {
            control: 'text',
            description: 'Body text of the campaign container',
        },
        buttonLabel: {
            control: 'text',
            description: 'Label for the button',
        },
        href: {
            control: 'text',
            description: 'URL the button links to',
        },
        className: {
            control: 'text',
            description: 'Additional Tailwind classes',
        },
    },
    decorators: [
        (Story) => (
            <div>
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof CampaignContainer>;

export const Default: Story = {
    args: {
        title: 'Campagne titel',
        text: 'Dit is een korte omschrijving van de campagne.',
        buttonLabel: 'Meer informatie',
        href: '#',
    },
};
