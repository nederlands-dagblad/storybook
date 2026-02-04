import React, { useEffect } from "react";
import Icon from "@atoms/basicAtoms/Icon/Icon";

export interface VideoModalProps {
    videoId: string | null;
    onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ videoId, onClose }) => {
    // Close on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (videoId) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [videoId, onClose]);

    if (!videoId) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-black-80"
            onClick={onClose}
        >
            {/* Close button - positioned at top right of screen */}
            <button
                onClick={onClose}
                className="fixed top-m right-m text-text-inverse hover:bg-neutral-800 transition-colors p-xs rounded-xl"
                aria-label="Sluiten"
            >
                <Icon name="x-mark" variant="outline" size="m" color="inverse"/>
            </button>

            <div
                className="relative w-full max-w-[400px] mx-m"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Shorts-style vertical video container */}
                <div
                    className="relative w-full bg-background-dark shadow-l"
                    style={{aspectRatio: '9/16'}}
                >
                    <iframe
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                        title="YouTube Short"
                        className="absolute inset-0 w-full h-full"
                        allow="autoplay; encrypted-media; fullscreen"
                        allowFullScreen
                    />
                </div>
            </div>
        </div>
    );
};

export default VideoModal;