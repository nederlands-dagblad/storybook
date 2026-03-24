import React, {useState, useEffect} from "react";
import {VideoCard} from "@molecules/newsfeedMolecules/VideoCard/VideoCard";
import {BaseSlider} from "@molecules/newsfeedMolecules/BaseSlider/BaseSlider";
import {VideoModal} from "@molecules/newsfeedMolecules/VideoModal/VideoModal";

export interface VideoConfig {
    apiEndpoint: string;
    channelId?: string;
    playlistId?: string;
    maxResults?: number;
}

interface YouTubeVideoItem {
    videoId: string;
    title: string;
    thumbnailUrl?: string;
    duration?: string;
}

interface VideoArticle {
    imageUrl: string;
    articleType: string;
    heading: string;
    videoDuration?: string;
    videoId: string;
}

export interface VideoSliderProps {
    videoConfig: VideoConfig;
    title?: string;
    showButton?: boolean;
    buttonLabel?: string;
    buttonUrl?: string;
    onButtonClick?: () => void;
    className?: string;
}

export const VideoSlider: React.FC<VideoSliderProps> = ({
    videoConfig,
    title,
    showButton = false,
    buttonLabel = "",
    buttonUrl,
    onButtonClick,
    className = "",
}) => {
    const [videoArticles, setVideoArticles] = useState<VideoArticle[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Active video for popup
    const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
    const [currentVideoIndex, setCurrentVideoIndex] = useState<number | null>(null);

    // Fetch videos from backend
    useEffect(() => {
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

                const transformed: VideoArticle[] = videos.map((video) => ({
                    imageUrl: video.thumbnailUrl || `https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`,
                    articleType: 'Video',
                    heading: video.title,
                    videoDuration: video.duration,
                    videoId: video.videoId,
                }));

                setVideoArticles(transformed);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error loading videos');
                console.error('Video fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, [videoConfig]);

    // Navigation handlers
    const handleNextVideo = () => {
        if (currentVideoIndex !== null && currentVideoIndex < videoArticles.length - 1) {
            const nextIndex = currentVideoIndex + 1;
            setCurrentVideoIndex(nextIndex);
            setActiveVideoId(videoArticles[nextIndex].videoId);
        }
    };

    const handlePreviousVideo = () => {
        if (currentVideoIndex !== null && currentVideoIndex > 0) {
            const prevIndex = currentVideoIndex - 1;
            setCurrentVideoIndex(prevIndex);
            setActiveVideoId(videoArticles[prevIndex].videoId);
        }
    };

    const handleClosePopup = () => {
        setActiveVideoId(null);
        setCurrentVideoIndex(null);
    };

    const handleItemClick = (index: number, event: MouseEvent) => {
        const article = videoArticles[index];
        if (article?.videoId) {
            event.preventDefault();
            event.stopPropagation();
            setCurrentVideoIndex(index);
            setActiveVideoId(article.videoId);
        }
    };

    if (loading) {
        return (
            <div className={`w-full flex flex-col gap-s ${className}`}>
                <p className="text-body-regular text-text-subtle">Video's laden...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`w-full flex flex-col gap-s ${className}`}>
                <p className="text-body-regular text-text-warning">Fout bij laden: {error}</p>
            </div>
        );
    }

    if (videoArticles.length === 0) {
        return null;
    }

    return (
        <>
            <BaseSlider
                title={title}
                showButton={showButton}
                buttonLabel={buttonLabel}
                buttonUrl={buttonUrl}
                onButtonClick={onButtonClick}
                className={className}
                onItemClick={handleItemClick}
            >
                {videoArticles.map((article, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0"
                        data-index={index}
                    >
                        <VideoCard
                            imageUrl={article.imageUrl}
                            heading={article.heading}
                            articleType={article.articleType}
                            videoDuration={article.videoDuration}
                            videoId={article.videoId}
                        />
                    </div>
                ))}
            </BaseSlider>

            <VideoModal
                videoId={activeVideoId}
                onClose={handleClosePopup}
                onNext={handleNextVideo}
                onPrevious={handlePreviousVideo}
                hasNext={currentVideoIndex !== null && currentVideoIndex < videoArticles.length - 1}
                hasPrevious={currentVideoIndex !== null && currentVideoIndex > 0}
            />
        </>
    );
};

export default VideoSlider;
