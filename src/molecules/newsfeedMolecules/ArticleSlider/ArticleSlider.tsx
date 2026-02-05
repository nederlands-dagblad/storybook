import React, {useRef, useState, useEffect} from "react";
import {ArticleCard, ArticleCardProps} from "@molecules/newsfeedMolecules/ArticleCard/ArticleCard";
import {SectionHeading} from "@atoms/displayAtoms/SectionHeading/SectionHeading";
import {Button} from "@atoms/actionAtoms/Button/Button";
import {VideoModal} from "@molecules/newsfeedMolecules/VideoModal/VideoModal";

// Backend API configuration
export interface VideoConfig {
    apiEndpoint: string;
    channelId?: string;
    playlistId?: string;
    maxResults?: number;
}

export interface ArticleSliderProps {
    articles?: ArticleCardProps[];
    videoConfig?: VideoConfig;
    title?: string;
    showButton?: boolean;
    buttonLabel?: string;
    buttonUrl?: string;
    onButtonClick?: () => void;
    onArticleSelect?: (index: number) => void;
    className?: string;
    enableSelection?: boolean;
    defaultSelectedIndex?: number;
}

interface YouTubeVideoItem {
    videoId: string;
    title: string;
    thumbnailUrl?: string;
    duration?: string;
}

export const ArticleSlider: React.FC<ArticleSliderProps> = ({
                                                                articles: manualArticles,
                                                                videoConfig,
                                                                title,
                                                                showButton = false,
                                                                buttonLabel = "",
                                                                buttonUrl,
                                                                onButtonClick,
                                                                className = "",
                                                                enableSelection = false,
                                                                defaultSelectedIndex,
                                                                onArticleSelect,
                                                            }) => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const isDraggingRef = useRef(false);
    const startXRef = useRef(0);
    const scrollLeftRef = useRef(0);
    const hasMovedRef = useRef(false);
    const [showLeftFade, setShowLeftFade] = useState(false);
    const [showRightFade, setShowRightFade] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(
        defaultSelectedIndex !== undefined ? defaultSelectedIndex : null
    );

    // Video state
    const [videoArticles, setVideoArticles] = useState<ArticleCardProps[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Active video for popup
    const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
    const [currentVideoIndex, setCurrentVideoIndex] = useState<number | null>(null);

    // Fetch videos from backend if videoConfig is provided
    useEffect(() => {
        if (!videoConfig) return;

        const fetchVideos = async () => {
            setLoading(true);
            setError(null);

            try {
                const {apiEndpoint, channelId, playlistId, maxResults = 10} = videoConfig;

                const params = new URLSearchParams();
                if (channelId) params.append('channelId', channelId);
                if (playlistId) params.append('playlistId', playlistId);
                params.append('maxResults', maxResults.toString());

                const url = `${apiEndpoint}?${params.toString()}`;
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`Failed to fetch videos: ${response.statusText}`);
                }

                const videos: YouTubeVideoItem[] = await response.json();

                const transformedArticles: ArticleCardProps[] = videos.map((video) => ({
                    imageUrl: video.thumbnailUrl || `https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`,
                    articleType: 'Video',
                    heading: video.title,
                    variant: 'video' as const,
                    videoDuration: video.duration,
                    videoId: video.videoId,
                }));

                setVideoArticles(transformedArticles);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error loading videos');
                console.error('Video fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, [videoConfig]);

    const articles = videoConfig ? videoArticles : (manualArticles || []);

    const updateFadeVisibility = () => {
        if (!sliderRef.current) return;
        const {scrollLeft, scrollWidth, clientWidth} = sliderRef.current;
        setShowLeftFade(scrollLeft > 0);
        setShowRightFade(scrollLeft < scrollWidth - clientWidth - 1);
    };

    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        updateFadeVisibility();
        slider.addEventListener('scroll', updateFadeVisibility);
        window.addEventListener('resize', updateFadeVisibility);

        const handleMouseDown = (e: MouseEvent) => {
            isDraggingRef.current = true;
            hasMovedRef.current = false;
            slider.classList.remove('scroll-smooth');
            startXRef.current = e.pageX;
            scrollLeftRef.current = slider.scrollLeft;
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!isDraggingRef.current) return;
            const x = e.pageX;
            const distance = startXRef.current - x;
            if (Math.abs(distance) > 3) {
                e.preventDefault();
                slider.scrollLeft = scrollLeftRef.current + distance;
                hasMovedRef.current = true;
            }
        };

        const handleMouseUp = () => {
            slider.classList.add('scroll-smooth');
            isDraggingRef.current = false;
        };

        const handleClick = (e: MouseEvent) => {
            if (hasMovedRef.current) {
                e.preventDefault();
                e.stopPropagation();
                hasMovedRef.current = false;
                return;
            }

            const target = e.target as HTMLElement;
            const cardWrapper = target.closest('[data-index]') as HTMLElement;

            if (cardWrapper) {
                const indexStr = cardWrapper.getAttribute('data-index');
                if (indexStr !== null) {
                    const index = parseInt(indexStr, 10);
                    const article = articles[index];

                    // Handle video mode
                    if (videoConfig) {
                        setCurrentVideoIndex(index);
                        if (article.videoId) {
                            e.preventDefault();
                            e.stopPropagation();
                            setActiveVideoId(article.videoId);
                        }
                    }
                    // Handle selection mode
                    else if (enableSelection) {
                        setSelectedIndex(index);
                        onArticleSelect?.(index);

                        // Allow navigation if href exists, prevent only for pure selection
                        if (!article.href) {
                            e.preventDefault();
                        }
                    }
                }
            }

            hasMovedRef.current = false;
        };

        slider.addEventListener('mousedown', handleMouseDown);
        slider.addEventListener('mousemove', handleMouseMove);
        slider.addEventListener('mouseup', handleMouseUp);
        slider.addEventListener('mouseleave', handleMouseUp);
        slider.addEventListener('click', handleClick, true);

        return () => {
            slider.removeEventListener('scroll', updateFadeVisibility);
            window.removeEventListener('resize', updateFadeVisibility);
            slider.removeEventListener('mousedown', handleMouseDown);
            slider.removeEventListener('mousemove', handleMouseMove);
            slider.removeEventListener('mouseup', handleMouseUp);
            slider.removeEventListener('mouseleave', handleMouseUp);
            slider.removeEventListener('click', handleClick, true);
        };
    }, [articles, videoConfig, enableSelection, onArticleSelect]);

    // Navigation handlers
    const handleNextVideo = () => {
        if (currentVideoIndex !== null && currentVideoIndex < articles.length - 1) {
            const nextIndex = currentVideoIndex + 1;
            setCurrentVideoIndex(nextIndex);
            const nextArticle = articles[nextIndex];
            if (nextArticle.videoId) {
                setActiveVideoId(nextArticle.videoId);
            }
        }
    };

    const handlePreviousVideo = () => {
        if (currentVideoIndex !== null && currentVideoIndex > 0) {
            const prevIndex = currentVideoIndex - 1;
            setCurrentVideoIndex(prevIndex);
            const prevArticle = articles[prevIndex];
            if (prevArticle.videoId) {
                setActiveVideoId(prevArticle.videoId);
            }
        }
    };

    const handleClosePopup = () => {
        setActiveVideoId(null);
        setCurrentVideoIndex(null);
    };

    if (loading) {
        return (
            <div className={`w-full flex flex-col gap-s ${className}`}>
                {title && <SectionHeading>{title}</SectionHeading>}
                <p className="text-body-regular text-text-subtle">Video's laden...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`w-full flex flex-col gap-s ${className}`}>
                {title && <SectionHeading>{title}</SectionHeading>}
                <p className="text-body-regular text-text-warning">Fout bij laden: {error}</p>
            </div>
        );
    }

    if (!articles || articles.length === 0) {
        return null;
    }

    return (
        <>
            <div className={`w-full flex flex-col gap-s ${className}`}>
                {title && <SectionHeading>{title}</SectionHeading>}

                <div className="relative">
                    {showLeftFade && (
                        <div
                            className="absolute left-0 top-0 bottom-0 w-m bg-gradient-to-r from-background-default to-transparent pointer-events-none z-10"/>
                    )}

                    {showRightFade && (
                        <div
                            className="absolute right-0 top-0 bottom-0 w-m bg-gradient-to-l from-background-default to-transparent pointer-events-none z-10"/>
                    )}

                    <div
                        ref={sliderRef}
                        className="flex gap-m overflow-x-auto scroll-smooth py-s cursor-grab active:cursor-grabbing select-none [&_img]:pointer-events-none"
                        style={{
                            scrollbarWidth: "thin",
                            scrollbarColor: "var(--color-border-gray) transparent"
                        }}
                    >
                        {articles.map((article, index) => {
                            const isSelected = enableSelection && selectedIndex === index;
                            const isVideoMode = !!videoConfig;

                            return (
                                <div
                                    key={index}
                                    className="flex-shrink-0"
                                    data-index={index}
                                >
                                    <ArticleCard
                                        {...article}
                                        href={isVideoMode ? undefined : article.href}
                                        className={`${article.className || ''} ${isSelected ? '[&>div]:!border-border-dnk' : ''}`.trim()}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>

                {showButton && (
                    <Button
                        variant="pill"
                        iconRight="caret-right"
                        href={buttonUrl}
                        onClick={onButtonClick}
                        className="w-fit"
                    >
                        {buttonLabel}
                    </Button>
                )}
            </div>

            {/* Video Popup Modal */}
            {videoConfig && (
                <VideoModal
                    videoId={activeVideoId}
                    onClose={handleClosePopup}
                    onNext={handleNextVideo}
                    onPrevious={handlePreviousVideo}
                    hasNext={currentVideoIndex !== null && currentVideoIndex < articles.length - 1}
                    hasPrevious={currentVideoIndex !== null && currentVideoIndex > 0}
                />
            )}
        </>
    );
};

export default ArticleSlider;