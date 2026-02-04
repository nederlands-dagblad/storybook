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

    const navigationButtonClass = "text-text-inverse hover:bg-neutral-800 transition-colors p-xxs rounded-xl";
    const mobileNavigationButtonClass = "text-text-inverse transition-colors px-s py-xxs";

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-black-80"
            onClick={onClose}
        >
            {/* Close button - fixed on mobile (above video), absolute on desktop (on video) */}
            <button
                onClick={onClose}
                className={`fixed top-m sm:top-xs right-m sm:right-xs z-20 ${navigationButtonClass}`}
                aria-label="Sluiten"
            >
                <Icon name="x-mark" variant="outline" size="m" color="inverse" />
            </button>

            {/* Desktop: Previous button (left side, fixed position) - hidden on mobile */}
            {hasPrevious && onPrevious && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onPrevious();
                    }}
                    className={`fixed left-m hidden sm:block ${navigationButtonClass}`}
                    aria-label="Vorige video"
                    style={{ top: '50%', transform: 'translateY(-50%)' }}
                >
                    <Icon name="caret-left" variant="outline" size="m" color="inverse" />
                </button>
            )}

            {/* Desktop: Next button (right side, fixed position) - hidden on mobile */}
            {hasNext && onNext && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onNext();
                    }}
                    className={`fixed right-m hidden sm:block ${navigationButtonClass}`}
                    aria-label="Volgende video"
                    style={{ top: '50%', transform: 'translateY(-50%)' }}
                >
                    <Icon name="caret-right" variant="outline" size="m" color="inverse" />
                </button>
            )}

            <div
                className="relative w-full max-w-[400px] mx-m flex flex-col items-center"
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

                {/* Mobile: Navigation buttons below video - always show both slots */}
                <div className="flex sm:hidden gap-s mt-xs w-full justify-between">
                    {/* Left slot - always present */}
                    <div className="flex-1">
                        {hasPrevious && onPrevious && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onPrevious();
                                }}
                                className={`${mobileNavigationButtonClass} flex items-center gap-xxs w-full justify-center`}
                                aria-label="Vorige video"
                            >
                                <Icon name="caret-left" variant="outline" size="s" color="inverse" />
                                <span className="text-meta-regular text-text-inverse">Vorige</span>
                            </button>
                        )}
                    </div>

                    {/* Right slot - always present */}
                    <div className="flex-1">
                        {hasNext && onNext && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onNext();
                                }}
                                className={`${mobileNavigationButtonClass} flex items-center gap-xxs w-full justify-center`}
                                aria-label="Volgende video"
                            >
                                <span className="text-meta-regular text-text-inverse">Volgende</span>
                                <Icon name="caret-right" variant="outline" size="s" color="inverse" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoModal;