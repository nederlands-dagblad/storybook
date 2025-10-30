import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Molecules/Feedback Molecules/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'info-dark', 'warning'],
      description: 'Visual variant of the alert',
    },
    children: {
      control: 'text',
      description: 'Content of the alert message',
    },
    className: {
      control: 'text',
      description: 'Additional tailwind classes',
    },
  },
  decorators: [
    (Story) => (
        <div style={{ width: '480px' }}>
          <Story />
        </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'Dit is standaard informatie.',
  },
};

export const InfoDark: Story = {
  args: {
    variant: 'info-dark',
    children: 'Hier staat informatie met grijze achtergrond.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Dit is een foutmelding.',
  },
};

export const RichContent: Story = {
  render: () => (
      <Alert variant="info-dark">
            <span>
                Voor meer informatie, bezoek onze{' '}
              <a href="#" className="text-text-brand underline">
                    help pagina
                </a>
                .
            </span>
      </Alert>
  ),
};

export const StackedWarnings: Story = {
  render: () => (
      <div className="flex flex-col gap-xs">
        <Alert variant="warning">
          Veld "Naam" is verplicht.
        </Alert>
        <Alert variant="warning">
          Veld "Email" is ongeldig.
        </Alert>
        <Alert variant="warning">
          Veld "Telefoonnummer" is te kort.
        </Alert>
      </div>
  ),
};