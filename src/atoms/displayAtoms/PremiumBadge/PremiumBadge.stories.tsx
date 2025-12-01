import type { Meta, StoryObj } from '@storybook/react-vite';
import PremiumBadge from './PremiumBadge';

const meta = {
    title: 'Atoms/Display Atoms/PremiumBadge',
    component: PremiumBadge,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['small', 'large'],
            description: 'Size variant of the badge',
        },
        className: {
            control: 'text',
            description: 'Additional CSS classes',
        },
    },
} satisfies Meta<typeof PremiumBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default large premium badge
 */
export const Default: Story = {
    args: {
        size: 'large',
    },
};

/**
 * Small variant of the premium badge
 */
export const Small: Story = {
    args: {
        size: 'small',
    },
};

/**
 * Example showing the badge in context with article content
 */
export const InContext: Story = {
    render: () => (
        <div className="max-w-md p-m border border-border-default">
            <h2 className="text-heading-2 mb-xs">Article Title</h2>
            <div className="flex items-center gap-xs mb-s">
                <span className="text-meta-regular text-text-subtle">March 29, 2025</span>
                <PremiumBadge />
            </div>
            <p className="text-body-regular text-text-default">
                This premium article provides in-depth analysis of the latest developments...
            </p>
        </div>
    ),
};

/**
 * Comparison of both sizes side by side
 */
export const SizeComparison: Story = {
    render: () => (
        <div className="flex items-center gap-m">
            <div className="flex flex-col items-center gap-xs">
                <PremiumBadge size="small" />
                <span className="text-meta-regular text-text-subtle">Small</span>
            </div>
            <div className="flex flex-col items-center gap-xs">
                <PremiumBadge size="large" />
                <span className="text-meta-regular text-text-subtle">Large</span>
            </div>
        </div>
    ),
};