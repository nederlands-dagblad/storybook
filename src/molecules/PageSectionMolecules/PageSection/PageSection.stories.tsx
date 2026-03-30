import type { Meta, StoryObj } from '@storybook/react';
import PageSection from './PageSection';

const meta: Meta<typeof PageSection> = {
    title: 'Molecules/Page Section Molecules/PageSection',
    component: PageSection,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;
type Story = StoryObj<typeof PageSection>;

const placeholder = (
    <div className="flex flex-col gap-xs">
        <h2 className="text-heading-m text-text-default">Section heading</h2>
        <p className="text-body-regular text-text-default">This is an example of content inside a PageSection. It will always be centered with consistent padding and a max width.</p>
    </div>
);

export const Default: Story = {
    args: {
        background: 'default',
        children: placeholder,
    },
};

export const GraySubtle: Story = {
    args: {
        background: 'gray-subtle',
        children: placeholder,
    },
};

export const BrandSubtle: Story = {
    args: {
        background: 'brand-subtle',
        children: placeholder,
    },
};
