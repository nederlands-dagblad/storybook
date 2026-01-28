import React, { useRef, useState, useEffect } from "react";
import { ArticleCard, ArticleCardProps } from "@molecules/newsfeedMolecules/ArticleCard/ArticleCard";
import { SectionHeading } from "@atoms/displayAtoms/SectionHeading/SectionHeading";
import { Button } from "@atoms/actionAtoms/Button/Button";

// Backend API configuration
export interface VideoConfig {
    apiEndpoint: string;     // e.g., "/api/youtube/channel"
    channelId?: string;      // For channel endpoint
    playlistId?: string;     // For playlist endpoint
    maxResults?: number;     // Default: 10
}

export interface ArticleSliderProps {
    // Manual article data
    articles?: ArticleCardProps[];

    // Backend video fetching
    videoConfig?: VideoConfig;

    // Common props
    title?: string;
    showButton?: boolean;
    buttonLabel?: string;
    buttonUrl?: string;
    onButtonClick?: () => void;
    className?: string;

    // Track selected publication (for dnk-publications variant)
    enableSelection?: boolean;
    onArticleSelect?: (index: number) => void;
}

// Backend response type (matches C# YouTubeVideoItem)
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
                                                                onArticleSelect,
                                                            }) => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const isDraggingRef = useRef(false);
    const startXRef = useRef(0);
    const scrollLeftRef = useRef(0);
    const hasMovedRef = useRef(false);
    const [showLeftFade, setShowLeftFade] = useState(false);
    const [showRightFade, setShowRightFade] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    // Video state
    const [videoArticles, setVideoArticles] = useState<ArticleCardProps[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch videos from backend if videoConfig is provided
    useEffect(() => {
        if (!videoConfig) return;

        const fetchVideos = async () => {
            setLoading(true);
            setError(null);

            try {
                const { apiEndpoint, channelId, playlistId, maxResults = 10 } = videoConfig;

                // Build query params
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

                // Transform backend response to ArticleCardProps
                const transformedArticles: ArticleCardProps[] = videos.map((video) => ({
                    imageUrl: video.thumbnailUrl || `https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`,
                    articleType: 'Video',
                    heading: video.title,
                    variant: 'video' as const,
                    videoDuration: video.duration,
                    href: `https://www.youtube.com/watch?v=${video.videoId}`,
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

    // Use video articles if videoConfig provided, otherwise use manual articles
    const articles = videoConfig ? videoArticles : (manualArticles || []);

    // Update fade visibility based on scroll position
    const updateFadeVisibility = () => {
        if (!sliderRef.current) return;

        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;

        setShowLeftFade(scrollLeft > 0);
        setShowRightFade(scrollLeft < scrollWidth - clientWidth - 1);
    };

    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        updateFadeVisibility();
        slider.addEventListener('scroll', updateFadeVisibility);
        window.addEventListener('resize', updateFadeVisibility);

        // Native event listeners
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

            // Only preventDefault and scroll if actually moving
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
    }, [articles]); // Re-run when articles change (videos loaded)

    // Loading state
    if (loading) {
        return (
            <div className={`w-full flex flex-col gap-s ${className}`}>
                {title && <SectionHeading>{title}</SectionHeading>}
                <p className="text-body-regular text-text-gray">Video's laden...</p>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className={`w-full flex flex-col gap-s ${className}`}>
                {title && <SectionHeading>{title}</SectionHeading>}
                <p className="text-body-regular text-text-warning">Fout bij laden: {error}</p>
            </div>
        );
    }

    // No articles
    if (!articles || articles.length === 0) {
        return null;
    }

    return (
        <div className={`w-full flex flex-col gap-s ${className}`}>
            {/* Title section */}
            {title && <SectionHeading>{title}</SectionHeading>}

            {/* Scrollable article list with conditional fade effects */}
            <div className="relative">
                {/* Left fade */}
                {showLeftFade && (
                    <div className="absolute left-0 top-0 bottom-0 w-m bg-gradient-to-r from-background-default to-transparent pointer-events-none z-10" />
                )}

                {/* Right fade */}
                {showRightFade && (
                    <div className="absolute right-0 top-0 bottom-0 w-m bg-gradient-to-l from-background-default to-transparent pointer-events-none z-10" />
                )}

                <div
                    ref={sliderRef}
                    className="flex gap-m overflow-x-auto scroll-smooth py-s cursor-grab active:cursor-grabbing [&_img]:pointer-events-none"
                    style={{
                        scrollbarWidth: "thin",
                        scrollbarColor: "var(--color-border-gray) transparent"
                    }}
                >
                    {articles.map((article, index) => {
                        const isSelected = enableSelection && selectedIndex === index;
                        const handleArticleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                            if (enableSelection && !hasMovedRef.current) {
                                e.preventDefault();
                                setSelectedIndex(index);
                                onArticleSelect?.(index);
                            }
                            article.onClick?.(e);
                        };

                        return (
                            <div key={index} className="flex-shrink-0">
                                <ArticleCard
                                    {...article}
                                    onClick={enableSelection ? handleArticleClick : article.onClick}
                                    className={`${article.className || ''} ${isSelected ? '[&>div]:!border-border-dnk' : ''}`.trim()}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Optional button */}
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
    );
};

export default ArticleSlider;