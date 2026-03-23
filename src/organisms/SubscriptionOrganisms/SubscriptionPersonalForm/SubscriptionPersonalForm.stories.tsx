import type { Meta, StoryObj } from '@storybook/react';
import SubscriptionPersonalForm from './SubscriptionPersonalForm';

const meta: Meta<typeof SubscriptionPersonalForm> = {
    title: 'Organisms/Subscription Organisms/SubscriptionForm/SubscriptionPersonalForm',
    component: SubscriptionPersonalForm,
    parameters: {
        layout: 'padded',
    },
};

export default meta;
type Story = StoryObj<typeof SubscriptionPersonalForm>;

export const Default: Story = {
    args: {
        submitLabel: 'Naar betaaloverzicht',
    },
    render: (args) => (
        <SubscriptionPersonalForm
            {...args}
            alertText={
                <>
                    Woon je in het buitenland? Stuur dan een mail met uw gegevens naar{' '}
                    <a href="mailto:aboservice@nd.nl" style={{ textDecoration: 'underline' }}>
                        aboservice@nd.nl
                    </a>
                    .
                </>
            }
        />
    ),
};
