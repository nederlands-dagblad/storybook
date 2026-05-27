import React from 'react';
import { BaseSlider } from '@molecules/newsfeedMolecules/BaseSlider/BaseSlider';
import Icon from '@atoms/basicAtoms/Icon/Icon';

export interface PodcastEpisode {
    title: string;
    seriesTitle?: string;
    duration?: string;
    publishedAt?: string;
    href?: string;
}

interface PodcastEpisodeCardProps {
    episode: PodcastEpisode;
}

const PodcastEpisodeCard: React.FC<PodcastEpisodeCardProps> = ({ episode }) => {
    const { title, seriesTitle, duration, publishedAt, href } = episode;

    const inner = (
        <div className="flex flex-col gap-xxs w-[15.5rem] h-full border border-width-s border-border-gray hover:border-border-brand transition-[border-color] duration-200 ease-in-out bg-background-default p-s">
                {seriesTitle && (
                    <span className="text-meta-uppercase text-text-brand">{seriesTitle}</span>
                )}
                <span className="text-heading-s text-text-default line-clamp-4">{title}</span>
                <div className="flex flex-col gap-xxs mt-auto pt-xs">
                    {publishedAt && (
                        <span className="text-meta-light text-text-default">{publishedAt}</span>
                    )}
                    {duration && (
                        <div className="flex items-center gap-xxs">
                            <Icon name="play-circle" variant="fill" size="s" color="brand" />
                            <span className="text-meta-light text-text-default">{duration}</span>
                        </div>
                    )}
                </div>
        </div>
    );

    if (href) {
        return (
            <a href={href} draggable={false} className="h-full">
                {inner}
            </a>
        );
    }

    return <div>{inner}</div>;
};

export interface PodcastSliderProps {
    episodes: PodcastEpisode[];
    title?: string;
    showButton?: boolean;
    buttonLabel?: string;
    buttonUrl?: string;
    onButtonClick?: () => void;
    className?: string;
}

export const PodcastSlider: React.FC<PodcastSliderProps> = ({
    episodes,
    title,
    showButton = false,
    buttonLabel = '',
    buttonUrl,
    onButtonClick,
    className = '',
}) => {
    if (episodes.length === 0) return null;

    return (
        <BaseSlider
            title={title}
            showButton={showButton}
            buttonLabel={buttonLabel}
            buttonUrl={buttonUrl}
            onButtonClick={onButtonClick}
            className={className}
        >
            {episodes.map((episode, index) => (
                <div key={index} className="flex-shrink-0" data-index={index}>
                    <PodcastEpisodeCard episode={episode} />
                </div>
            ))}
        </BaseSlider>
    );
};

export default PodcastSlider;
