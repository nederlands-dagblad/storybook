import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Atoms/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
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
      description: 'Additional CSS classes',
    },
  },
  decorators: [
    (Story) => (
        <div style={{ maxWidth: '600px' }}>
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

export const AllVariants: Story = {
  render: () => (
      <div className="flex flex-col gap-m">
        <Alert variant="info">
          Dit is standaard informatie met een border.
        </Alert>
        <Alert variant="info-dark">
          Dit is informatie met een grijze achtergrond.
        </Alert>
        <Alert variant="warning">
          Dit is een waarschuwing met rode border.
        </Alert>
      </div>
  ),
};

export const LongMessage: Story = {
  args: {
    variant: 'warning',
    children: 'Dit is een langere waarschuwing die meerdere regels kan beslaan. De alert past zich automatisch aan de lengte van de content aan en blijft netjes vormgegeven met het icoon uitgelijnd aan de bovenkant.',
  },
};

export const ShortMessage: Story = {
  args: {
    variant: 'info',
    children: 'Kort bericht.',
  },
};

export const WithCustomClassName: Story = {
  args: {
    variant: 'info-dark',
    children: 'Alert met extra margin.',
    className: 'my-l',
  },
};

export const MultipleAlerts: Story = {
  render: () => (
      <div className="flex flex-col gap-s">
        <Alert variant="info">Eerste informatie melding</Alert>
        <Alert variant="info">Tweede informatie melding</Alert>
        <Alert variant="warning">Een waarschuwing tussendoor</Alert>
        <Alert variant="info-dark">Informatie met achtergrond</Alert>
        <Alert variant="warning">Nog een waarschuwing</Alert>
      </div>
  ),
};

export const InFormContext: Story = {
  render: () => (
      <div className="flex flex-col gap-m">
        <div>
          <label className="block mb-xs text-body-bold">Email adres</label>
          <input
              type="email"
              className="w-full border border-border-default p-s"
              placeholder="naam@voorbeeld.nl"
          />
        </div>
        <Alert variant="info">
          We sturen nooit spam naar jouw email adres.
        </Alert>
        <div>
          <label className="block mb-xs text-body-bold">Wachtwoord</label>
          <input
              type="password"
              className="w-full border border-border-warning p-s"
              placeholder="••••••••"
          />
        </div>
        <Alert variant="warning">
          Wachtwoord moet minimaal 8 karakters bevatten.
        </Alert>
      </div>
  ),
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