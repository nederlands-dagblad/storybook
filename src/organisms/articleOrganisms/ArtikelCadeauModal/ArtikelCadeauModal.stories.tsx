import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import ArtikelCadeauModal from "./ArtikelCadeauModal";

const meta: Meta<typeof ArtikelCadeauModal> = {
    title: 'Organisms/Article Organisms/ArtikelCadeauModal',
    component: ArtikelCadeauModal,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {
        isOpen: {
            control: 'boolean',
            description: 'Whether the modal is open',
        },
        remainingGifts: {
            control: 'number',
            description: 'Number of remaining gift articles',
        },
        defaultMode: {
            control: 'radio',
            options: ['gift', 'standard'],
            description: 'Which sharing mode is pre-selected when the modal opens',
        },
    },
};

export default meta;
type Story = StoryObj<typeof ArtikelCadeauModal>;

export const Default: Story = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false);
        const [defaultMode, setDefaultMode] = useState<'gift' | 'standard'>('gift');

        const handleShareAsGift = (platform: string) => {
            console.log(`Sharing as GIFT on ${platform}`);
            alert(`Gift link shared via ${platform}`);
        };

        const handleShareAsStandard = (platform: string) => {
            console.log(`Sharing as STANDARD on ${platform}`);
            alert(`Standard link shared via ${platform}`);
        };

        return (
            <div className="min-h-screen bg-background-gray p-4">
                <div className="flex items-center gap-0">
                    <button
                        onClick={() => { setDefaultMode('gift'); setIsOpen(true); }}
                        className="flex items-center gap-2 px-4 py-2 border border-border-gray-subtle rounded-l-full bg-background-default hover:bg-background-gray transition-colors"
                    >
                        <span>Geef cadeau</span>
                    </button>
                    <button
                        onClick={() => { setDefaultMode('standard'); setIsOpen(true); }}
                        className="flex items-center px-3 py-2 border border-l-0 border-border-gray-subtle rounded-r-full bg-background-default hover:bg-background-gray transition-colors"
                    >
                        ↗
                    </button>
                </div>

                <ArtikelCadeauModal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    remainingGifts={10}
                    defaultMode={defaultMode}
                    onShareAsGift={handleShareAsGift}
                    onShareAsStandard={handleShareAsStandard}
                />
            </div>
        );
    },
};

export const OpenAsGift: Story = {
    render: () => {
        const [isOpen, setIsOpen] = useState(true);

        return (
            <div className="min-h-screen bg-background-gray p-4">
                <ArtikelCadeauModal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    remainingGifts={5}
                    defaultMode="gift"
                    onShareAsGift={(p) => console.log(`Gift: ${p}`)}
                    onShareAsStandard={(p) => console.log(`Standard: ${p}`)}
                />
            </div>
        );
    },
};

export const OpenAsStandard: Story = {
    render: () => {
        const [isOpen, setIsOpen] = useState(true);

        return (
            <div className="min-h-screen bg-background-gray p-4">
                <ArtikelCadeauModal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    remainingGifts={5}
                    defaultMode="standard"
                    onShareAsGift={(p) => console.log(`Gift: ${p}`)}
                    onShareAsStandard={(p) => console.log(`Standard: ${p}`)}
                />
            </div>
        );
    },
};

export const LowGiftsRemaining: Story = {
    render: () => {
        const [isOpen, setIsOpen] = useState(true);

        return (
            <div className="min-h-screen bg-background-gray p-4">
                <ArtikelCadeauModal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    remainingGifts={1}
                    defaultMode="gift"
                    onShareAsGift={(p) => console.log(`Gift: ${p}`)}
                    onShareAsStandard={(p) => console.log(`Standard: ${p}`)}
                />
            </div>
        );
    },
};

export const NoGiftsRemaining: Story = {
    render: () => {
        const [isOpen, setIsOpen] = useState(true);

        return (
            <div className="min-h-screen bg-background-gray p-4">
                <p className="mb-4 text-body-light">Gift mode is selected but 0 gifts remain — buttons are disabled and badge is gray.</p>
                <ArtikelCadeauModal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    remainingGifts={0}
                    defaultMode="gift"
                    onShareAsGift={(p) => alert('No gifts remaining!')}
                    onShareAsStandard={(p) => console.log(`Standard: ${p}`)}
                />
            </div>
        );
    },
};