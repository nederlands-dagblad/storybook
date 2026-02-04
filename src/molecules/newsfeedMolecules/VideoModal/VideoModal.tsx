import React, { useEffect } from "react";
import Icon from "@atoms/basicAtoms/Icon/Icon";

export interface VideoModalProps {
    videoId: string | null;
    onClose: () => void;
    onNext?: () => void;
    onPrevious?: () => void;
    hasNext?: boolean;
    hasPrevious?: boolean;
}

export const VideoModal: React.FC<VideoModalProps> = ({
                                                          videoId,
                                                          onClose,
                                                          onNext,
                                                          onPrevious,
                                                          hasNext = false,
                                                          hasPrevious = false,
                                                      }) => {
    // Close on escape key, navigate with arrow keys
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            } else if (e.key === 'ArrowRight' && hasNext && onNext) {
                onNext();
            } else if (e.key === 'ArrowLeft' && hasPrevious && onPrevious) {
                onPrevious();
            }
        };

        if (videoId) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [videoId, onClose, onNext, onPrevious, hasNext, hasPrevious]);

    if (!videoId) return null;

    const navigationButtonClass = "fixed text-text-inverse hover:bg-neutral-800 transition-colors p-xs rounded-xl";

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-black-80"
            onClick={onClose}
        >
            {/* Close button */}
            <button
                onClick={onClose}
                className="${navigationButtonClass} top-m right-m "
                aria-label="Sluiten"
            >
                <Icon name="x-mark" variant="outline" size="m" color="inverse" />
            </button>

            {/* Previous button */}
            {hasPrevious && onPrevious && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onPrevious();
                    }}
                    className="left-m ${navigationButtonClass}"
                    aria-label="Vorige video"
                    style={{ top: '50%', transform: 'translateY(-50%)' }}
                >
                    <Icon name="caret-left" variant="outline" size="m" color="inverse" />
                </button>
            )}

            {/* Next button */}
            {hasNext && onNext && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onNext();
                    }}
                    className="right-m ${navigationButtonClass}"
                    aria-label="Volgende video"
                    style={{ top: '50%', transform: 'translateY(-50%)' }}
                >
                    <Icon name="caret-right" variant="outline" size="m" color="inverse" />
                </button>
            )}

            <div
                className="relative w-full max-w-[400px] mx-m"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Shorts-style vertical video container */}
                <div
                    className="relative w-full bg-background-dark shadow-l"
                    style={{ aspectRatio: '9/16' }}
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