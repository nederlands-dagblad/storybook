import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import Tabs from './Tabs';


const meta = {
    title: 'Molecules/Portal Molecules/Tabs',
    component: Tabs,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultTabs = [
    { label: 'Overview', id: 'overview' },
    { label: 'Features', id: 'features' },
    { label: 'Pricing', id: 'pricing' },
    { label: 'Support', id: 'support' },
    { label: 'Resources', id: 'resources' },
];

const tabsWithLinks = [
    { label: 'Overview', id: 'overview', href: '/overview' },
    { label: 'Features', id: 'features', href: '/features' },
    { label: 'Pricing', id: 'pricing', href: '/pricing' },
    { label: 'Support', id: 'support', href: '/support' },
    { label: 'Resources', id: 'resources', href: '/resources' },
];

export const DesktopTabs: Story = {
    args: {
        tabs: defaultTabs,
        defaultActiveIndex: 0,
    },
};

export const DesktopTabsSecondActive: Story = {
    args: {
        tabs: defaultTabs,
        defaultActiveIndex: 1,
    },
};

export const ControlledTabs: Story = {
    args: {
        tabs: defaultTabs,
    },
    render: (args) => {
        const [activeTab, setActiveTab] = useState(0);

        return (
            <div className="flex flex-col gap-l">
                <Tabs
                    {...args}
                    activeIndex={activeTab}
                    onTabChange={setActiveTab}
                />
                <div className="mt-m">
                    <p className="text-body-regular">
                        You selected tab {activeTab}: {defaultTabs[activeTab].label}
                    </p>
                </div>
            </div>
        );
    },
};

export const TabsWithNavigation: Story = {
    args: {
        tabs: tabsWithLinks,
        activeTabId: 'pricing', // Set pricing as active
    },
};

export const TabsWithContent: Story = {
    args: {
        tabs: defaultTabs,
    },
    render: (args) => {
        const [activeTab, setActiveTab] = useState(0);

        const tabContent = {
            overview: 'This is the overview section content. Here you would show general information.',
            features: 'Features section: List all your amazing features here.',
            pricing: 'Pricing section: Display your pricing plans and options.',
            support: 'Support section: Provide help documentation and contact information.',
            resources: 'Resources section: Share helpful links, downloads, and documentation.',
        };

        return (
            <div>
                <Tabs
                    {...args}
                    activeIndex={activeTab}
                    onTabChange={setActiveTab}
                />
                <div className="mt-l">
                    <h2 className="text-heading-2 mb-m">
                        {defaultTabs[activeTab].label}
                    </h2>
                    <p className="text-body-regular">
                        {tabContent[defaultTabs[activeTab].id]}
                    </p>
                </div>
            </div>
        );
    },
};