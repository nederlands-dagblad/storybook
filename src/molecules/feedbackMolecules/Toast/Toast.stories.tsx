import type { Meta, StoryObj } from '@storybook/react';
import Toast, { useToast } from './Toast';

const meta: Meta<typeof Toast> = {
    title: 'Molecules/Feedback Molecules/Toast',
    component: Toast,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {
        message: {
            control: 'text',
            description: 'The toast message (supports HTML)',
        },
        visible: {
            control: 'boolean',
            description: 'Whether the toast is visible',
        },
    },
    decorators: [
        (Story) => (
            <div className="min-h-[200px] relative">
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = {
    args: {
        message: 'Link kopieerd.',
        visible: true,
        onClose: () => console.log('Toast closed'),
    },
};

export const WithHtml: Story = {
    args: {
        message: 'Je hebt nog <strong>3 artikelen</strong> over om cadeau te geven.',
        visible: true,
        onClose: () => console.log('Toast closed'),
    },
};

const WithHookRenderer = () => {
    const { toast, showToast, hideToast } = useToast();

    return (
        <div className="min-h-[200px] relative">
            <button
                onClick={() => showToast('Je hebt geen artikelen meer over om cadeau te geven deze maand.')}
                className="px-6 py-3 bg-background-brand text-text-inverse font-bold rounded hover:opacity-90 transition-opacity"
            >
                Toon Toast
            </button>

            <Toast
                message={toast.message}
                visible={toast.visible}
                onClose={hideToast}
            />
        </div>
    );
};

export const WithHook: Story = {
    render: () => <WithHookRenderer />,
};