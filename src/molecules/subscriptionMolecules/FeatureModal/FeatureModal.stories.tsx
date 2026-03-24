import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import FeatureModal from './FeatureModal';
import { Button } from '@atoms/actionAtoms/Button/Button';

const meta = {
    title: 'Molecules/Subscription Molecules/FeatureModal',
    component: FeatureModal,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof FeatureModal>;

export default meta;

export const WithImage: StoryObj<typeof FeatureModal> = {
    render: (args) => (
        <div style={{ minHeight: '50vh' }}>
            <FeatureModal {...args} />
        </div>
    ),
    args: {
        isOpen: true,
        onClose: () => {},
        heading: 'Lees artikelen digitaal',
        body: 'Lees onbeperkt ND-artikelen op nd.nl en de ND-app. We informeren, we duiden, we bieden inzicht en we laten je nadenken. Opbouwend en scherp waar het moet, hoopvol waar het kan.',
        mediaUrl: 'https://placehold.co/600x300',
        mediaType: 'image',
        metaText: 'Met een Digitaal Basis abonnement heb je geen toegang tot artikelen van De Nieuwe Koers.',
    },
};

export const WithVideo: StoryObj<typeof FeatureModal> = {
    render: (args) => (
        <div style={{ minHeight: '50vh' }}>
            <FeatureModal {...args} />
        </div>
    ),
    args: {
        isOpen: true,
        onClose: () => {},
        heading: 'Elke dag nieuwe puzzels',
        body: 'Start je dag met een van onze dagelijkse puzzels. Van cryptogram tot sudoku.',
        mediaUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        mediaType: 'video',
    },
};

export const WithoutMedia: StoryObj<typeof FeatureModal> = {
    render: (args) => (
        <div style={{ minHeight: '50vh' }}>
            <FeatureModal {...args} />
        </div>
    ),
    args: {
        isOpen: true,
        onClose: () => {},
        heading: 'Persoonlijke leeslijst',
        body: 'Sla artikelen op in je persoonlijke leeslijst en lees ze wanneer het jou uitkomt.',
    },
};

export const WithTrigger: StoryObj<typeof FeatureModal> = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false);
        return (
            <>
                <Button variant="secondary" label="Open modal" onClick={() => setIsOpen(true)} />
                <FeatureModal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    heading="Lees artikelen digitaal"
                    body="Lees onbeperkt ND-artikelen op nd.nl en de ND-app. We informeren, we duiden, we bieden inzicht en we laten je nadenken."
                    mediaUrl="https://placehold.co/600x300"
                    mediaType="image"
                    metaText="Met een Digitaal Basis abonnement heb je geen toegang tot artikelen van De Nieuwe Koers."
                />
            </>
        );
    },
};
