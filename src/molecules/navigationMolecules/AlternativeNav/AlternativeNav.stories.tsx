import type { Meta, StoryObj } from '@storybook/react-vite';
import { AlternativeNav } from './AlternativeNav';

const meta = {
    title: 'Molecules/Navigation Molecules/AlternativeNav',
    component: AlternativeNav,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'An alternative navigation bar for pages that require a simpler header (e.g. landing pages, service pages). Transparent over a hero image, transitions to a white background (`bg-background-default`) on scroll.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        contactLabel: { control: 'text' },
        contactHref: { control: 'text' },
        ctaLabel: { control: 'text' },
        ctaHref: { control: 'text' },
        forceScrolled: { control: 'boolean' },
    },
} satisfies Meta<typeof AlternativeNav>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Transparent state — as seen over a hero image.
 */
export const OnHero: Story = {
    render: (args) => (
        <div style={{ background: 'linear-gradient(135deg, #1a2a3a 0%, #2d4a5a 100%)', height: '200px' }}>
            <AlternativeNav {...args} />
        </div>
    ),
    args: {
        contactLabel: 'Contact',
        ctaLabel: 'Abonnementen',
        forceScrolled: false,
    },
};

/**
 * Scrolled state — white background after scrolling past the hero.
 */
export const Scrolled: Story = {
    render: (args) => (
        <div style={{ background: '#f5f5f5', height: '200px' }}>
            <AlternativeNav {...args} />
        </div>
    ),
    args: {
        contactLabel: 'Contact',
        ctaLabel: 'Abonnementen',
        forceScrolled: true,
    },
};
