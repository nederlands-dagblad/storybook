import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import ArtikelCadeauModal from "./ArtikelCadeauModal";

const meta: Meta<typeof ArtikelCadeauModal> = {
    title: 'Molecules/Form Molecules/ArtikelCadeauModal',
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
    },
};

export default meta;
type Story = StoryObj<typeof ArtikelCadeauModal>;

export const Default: Story = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false);
        
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
                <button
                    onClick={() => setIsOpen(true)}
                    className="px-6 py-3 bg-background-brand text-text-inverse font-bold rounded hover:opacity-90 transition-opacity"
                >
                    Open Deel Modal
                </button>

                <ArtikelCadeauModal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    remainingGifts={5}
                    onShareAsGift={handleShareAsGift}
                    onShareAsStandard={handleShareAsStandard}
                />
            </div>
        );
    },
};

export const OpenByDefault: Story = {
    render: () => {
        const [isOpen, setIsOpen] = useState(true);
        
        const handleShareAsGift = (platform: string) => {
            console.log(`Sharing as GIFT on ${platform}`);
        };

        const handleShareAsStandard = (platform: string) => {
            console.log(`Sharing as STANDARD on ${platform}`);
        };
        
        return (
            <div className="min-h-screen bg-background-gray p-4">
                <ArtikelCadeauModal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    remainingGifts={5}
                    onShareAsGift={handleShareAsGift}
                    onShareAsStandard={handleShareAsStandard}
                />
            </div>
        );
    },
};

export const LowGiftsRemaining: Story = {
    render: () => {
        const [isOpen, setIsOpen] = useState(true);
        
        const handleShareAsGift = (platform: string) => {
            console.log(`Sharing as GIFT on ${platform} (only 1 gift left!)`);
        };

        const handleShareAsStandard = (platform: string) => {
            console.log(`Sharing as STANDARD on ${platform}`);
        };
        
        return (
            <div className="min-h-screen bg-background-gray p-4">
                <ArtikelCadeauModal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    remainingGifts={1}
                    onShareAsGift={handleShareAsGift}
                    onShareAsStandard={handleShareAsStandard}
                />
            </div>
        );
    },
};

export const NoGiftsRemaining: Story = {
    render: () => {
        const [isOpen, setIsOpen] = useState(true);
        
        const handleShareAsGift = (platform: string) => {
            console.log(`Cannot share as gift - no gifts remaining - ${platform}`);
            alert('No gifts remaining!');
        };

        const handleShareAsStandard = (platform: string) => {
            console.log(`Sharing as STANDARD on ${platform}`);
        };
        return (
            <div className="min-h-screen bg-background-gray p-4">
                <ArtikelCadeauModal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    remainingGifts={0}
                    onShareAsGift={handleShareAsGift}
                    onShareAsStandard={handleShareAsStandard}
                />
            </div>
        );
    },
};