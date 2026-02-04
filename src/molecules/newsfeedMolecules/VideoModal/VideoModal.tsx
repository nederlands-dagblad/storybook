import React, { useEffect, useRef, useState } from "react";
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
    const touchStartX = useRef<number | null>(null);
    const touchStartY = useRef<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

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

    // Touch/swipe handlers
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null || touchStartY.current === null) return;

        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;

        const deltaX = touchStartX.current - touchEndX;
        const deltaY = touchStartY.current - touchEndY;

        // Only trigger swipe if horizontal movement is greater than vertical
        // This prevents accidental swipes while scrolling
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            const minSwipeDistance = 50; // Minimum distance for a swipe

            if (deltaX > minSwipeDistance && hasNext && onNext) {
                // Swiped left - go to next video
                onNext();
            } else if (deltaX < -minSwipeDistance && hasPrevious && onPrevious) {
                // Swiped right - go to previous video
                onPrevious();
            }
        }

        touchStartX.current = null;
        touchStartY.current = null;
    };

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
                className={`${navigationButtonClass} top-m right-m`}
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
                    className={`${navigationButtonClass} left-m`}
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
                    className={`${navigationButtonClass} right-m`}
                    aria-label="Volgende video"
                    style={{ top: '50%', transform: 'translateY(-50%)' }}
                >
                    <Icon name="caret-right" variant="outline" size="m" color="inverse" />
                </button>
            )}

            <div
                ref={containerRef}
                className="relative w-full max-w-[400px] mx-m"
                onClick={(e) => e.stopPropagation()}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
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