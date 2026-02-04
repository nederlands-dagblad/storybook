import type { Meta, StoryObj } from '@storybook/react';
import { VideoModal } from './VideoModal';
import { useState } from 'react';

const meta: Meta<typeof VideoModal> = {
    title: 'Molecules/Newsfeed Molecules/VideoModal',
    component: VideoModal,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {
        videoId: {
            control: 'text',
            description: 'YouTube video ID to display',
        },
        onClose: {
            action: 'closed',
            description: 'Callback function when modal is closed',
        },
    },
};

export default meta;
type Story = StoryObj<typeof VideoModal>;

// Helper component to show the modal with a trigger button
const VideoModalWithTrigger = ({ videoId }: { videoId: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="p-m">
            <button
                onClick={() => setIsOpen(true)}
                className="px-m py-s bg-background-brand text-text-inverse rounded"
            >
                Open Video Modal
            </button>
            <VideoModal
                videoId={isOpen ? videoId : null}
                onClose={() => setIsOpen(false)}
            />
        </div>
    );
};

/**
 * Default video modal with a YouTube Shorts video
 */
export const Default: Story = {
    render: () => <VideoModalWithTrigger videoId="dQw4w9WgXcQ" />,
};

/**
 * Different video example
 */
export const AnotherVideo: Story = {
    render: () => <VideoModalWithTrigger videoId="jNQXAC9IVRw" />,
};

/**
 * Closed state (null videoId)
 */
export const Closed: Story = {
    args: {
        videoId: null,
        onClose: () => console.log('Close clicked'),
    },
};

/**
 * Interactive example with multiple videos
 */
export const MultipleVideos: Story = {
    render: () => {
        const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

        const videos = [
            { id: 'dQw4w9WgXcQ', title: 'Video 1' },
            { id: 'jNQXAC9IVRw', title: 'Video 2' },
            { id: '9bZkp7q19f0', title: 'Video 3' },
        ];

        return (
            <div className="p-m">
                <div className="flex gap-s">
                    {videos.map((video) => (
                        <button
                            key={video.id}
                            onClick={() => setActiveVideoId(video.id)}
                            className="px-s py-xs bg-background-accent-gray hover:bg-background-accent-gray-subtle border border-border-gray-subtle transition-colors"
                        >
                            {video.title}
                        </button>
                    ))}
                </div>
                <VideoModal
                    videoId={activeVideoId}
                    onClose={() => setActiveVideoId(null)}
                />
            </div>
        );
    },
};

/**
 * Test keyboard interaction (Escape key to close)
 */
export const KeyboardInteraction: Story = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false);

        return (
            <div className="p-m">
                <button
                    onClick={() => setIsOpen(true)}
                    className="px-m py-s bg-background-brand text-text-inverse rounded"
                >
                    Open Modal (Press ESC to close)
                </button>
                <p className="mt-s text-body-light text-text-subtle">
                    Try pressing the Escape key when the modal is open
                </p>
                <VideoModal
                    videoId={isOpen ? 'dQw4w9WgXcQ' : null}
                    onClose={() => setIsOpen(false)}
                />
            </div>
        );
    },
};