import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BaseSlider } from './BaseSlider';

const meta: Meta<typeof BaseSlider> = {
    title: 'Molecules/Newsfeed Molecules/BaseSlider',
    component: BaseSlider,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BaseSlider>;

// Simple colored cards to demonstrate the base slider
const ColorCard = ({ color, label }: { color: string; label: string }) => (
    <div
        className="flex-shrink-0 w-[13.25rem] h-[10rem] rounded-lg flex items-center justify-center text-text-inverse text-body-gulliver-semibold"
        style={{ backgroundColor: color }}
    >
        {label}
    </div>
);

// 1. Basic usage with simple children
export const Default: Story = {
    args: {
        title: 'Base Slider',
        showButton: true,
        buttonLabel: 'Bekijk meer',
        buttonUrl: '#',
    },
    render: (args) => (
        <BaseSlider {...args}>
            {['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c', '#e67e22', '#34495e'].map((color, i) => (
                <div key={i} className="flex-shrink-0" data-index={i}>
                    <ColorCard color={color} label={`Slide ${i + 1}`} />
                </div>
            ))}
        </BaseSlider>
    ),
};

// 2. Image gallery example
export const ImageGallery: Story = {
    args: {
        title: 'Foto Galerij',
    },
    render: (args) => (
        <BaseSlider {...args}>
            {Array.from({ length: 8 }, (_, i) => (
                <div key={i} className="flex-shrink-0" data-index={i}>
                    <img
                        src={`https://picsum.photos/212/212?random=${i + 50}`}
                        alt={`Foto ${i + 1}`}
                        className="w-[13.25rem] h-[13.25rem] object-cover rounded-lg"
                    />
                </div>
            ))}
        </BaseSlider>
    ),
};

// 3. No title, no button — bare slider
export const Minimal: Story = {
    render: () => (
        <BaseSlider>
            {Array.from({ length: 10 }, (_, i) => (
                <div key={i} className="flex-shrink-0" data-index={i}>
                    <div className="w-[10rem] h-[6rem] bg-background-gray rounded border border-border-gray-subtle flex items-center justify-center text-meta-regular text-text-subtle">
                        Item {i + 1}
                    </div>
                </div>
            ))}
        </BaseSlider>
    ),
};
