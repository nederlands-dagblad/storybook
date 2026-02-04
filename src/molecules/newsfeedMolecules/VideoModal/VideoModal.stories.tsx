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
        onNext: {
            action: 'next',
            description: 'Callback function when next button is clicked',
        },
        onPrevious: {
            action: 'previous',
            description: 'Callback function when previous button is clicked',
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
 * Interactive example with multiple videos and navigation
 * Use arrow keys or on-screen buttons to navigate
 */
export const MultipleVideos: Story = {
    render: () => {
        const [currentIndex, setCurrentIndex] = useState<number | null>(null);

        const videos = [
            { id: 'dQw4w9WgXcQ', title: 'Video 1' },
            { id: 'jNQXAC9IVRw', title: 'Video 2' },
            { id: '9bZkp7q19f0', title: 'Video 3' },
        ];

        const handleNext = () => {
            if (currentIndex !== null && currentIndex < videos.length - 1) {
                setCurrentIndex(currentIndex + 1);
            }
        };

        const handlePrevious = () => {
            if (currentIndex !== null && currentIndex > 0) {
                setCurrentIndex(currentIndex - 1);
            }
        };

        return (
            <div className="p-m">
                <div className="flex gap-s flex-wrap">
                    {videos.map((video, index) => (
                        <button
                            key={video.id}
                            onClick={() => setCurrentIndex(index)}
                            className="px-s py-xs bg-background-accent-gray hover:bg-background-accent-gray-subtle border border-border-accent-gray-subtle transition-colors"
                        >
                            {video.title}
                        </button>
                    ))}
                </div>
                <p className="mt-s text-body-light text-text-subtle">
                    Click a video, then navigate using:
                    <br />• Arrow keys (← →)
                    <br />• On-screen navigation buttons
                    <br />• ESC to close
                </p>
                <VideoModal
                    videoId={currentIndex !== null ? videos[currentIndex].id : null}
                    onClose={() => setCurrentIndex(null)}
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                    hasNext={currentIndex !== null && currentIndex < videos.length - 1}
                    hasPrevious={currentIndex !== null && currentIndex > 0}
                />
            </div>
        );
    },
};

/**
 * Test keyboard interaction (Escape key to close, arrow keys to navigate)
 */
export const KeyboardInteraction: Story = {
    render: () => {
        const [currentIndex, setCurrentIndex] = useState<number | null>(null);

        const videos = [
            { id: 'dQw4w9WgXcQ', title: 'Video 1' },
            { id: 'jNQXAC9IVRw', title: 'Video 2' },
        ];

        const handleNext = () => {
            if (currentIndex !== null && currentIndex < videos.length - 1) {
                setCurrentIndex(currentIndex + 1);
            }
        };

        const handlePrevious = () => {
            if (currentIndex !== null && currentIndex > 0) {
                setCurrentIndex(currentIndex - 1);
            }
        };

        return (
            <div className="p-m">
                <button
                    onClick={() => setCurrentIndex(0)}
                    className="px-m py-s bg-background-brand text-text-inverse rounded"
                >
                    Open Modal
                </button>
                <p className="mt-s text-body-light text-text-subtle">
                    Keyboard shortcuts:
                    <br />• ESC to close
                    <br />• ← → arrow keys to navigate between videos
                </p>
                <VideoModal
                    videoId={currentIndex !== null ? videos[currentIndex].id : null}
                    onClose={() => setCurrentIndex(null)}
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                    hasNext={currentIndex !== null && currentIndex < videos.length - 1}
                    hasPrevious={currentIndex !== null && currentIndex > 0}
                />
            </div>
        );
    },
};

/**
 * Video playlist example with multiple videos
 */
export const VideoPlaylist: Story = {
    render: () => {
        const [currentIndex, setCurrentIndex] = useState<number | null>(null);

        const videos = [
            { id: 'dQw4w9WgXcQ', title: 'Video 1' },
            { id: 'jNQXAC9IVRw', title: 'Video 2' },
            { id: '9bZkp7q19f0', title: 'Video 3' },
            { id: 'L_jWHffIx5E', title: 'Video 4' },
        ];

        const handleNext = () => {
            if (currentIndex !== null && currentIndex < videos.length - 1) {
                setCurrentIndex(currentIndex + 1);
            }
        };

        const handlePrevious = () => {
            if (currentIndex !== null && currentIndex > 0) {
                setCurrentIndex(currentIndex - 1);
            }
        };

        return (
            <div className="p-m">
                <button
                    onClick={() => setCurrentIndex(0)}
                    className="px-m py-s bg-background-brand text-text-inverse rounded"
                >
                    Start Video Playlist
                </button>
                <p className="mt-s text-body-light text-text-subtle">
                    Navigate using arrow keys or on-screen buttons
                    {currentIndex !== null && <><br />Current: {videos[currentIndex].title}</>}
                </p>
                <VideoModal
                    videoId={currentIndex !== null ? videos[currentIndex].id : null}
                    onClose={() => setCurrentIndex(null)}
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                    hasNext={currentIndex !== null && currentIndex < videos.length - 1}
                    hasPrevious={currentIndex !== null && currentIndex > 0}
                />
            </div>
        );
    },
};