import React from 'react';
import { SectionHeading } from '@atoms/displayAtoms/SectionHeading/SectionHeading';
import { Button } from '@atoms/actionAtoms/Button/Button';

export interface PodcastSeriesLastEpisodeProps {
    sectionTitle?: string;
    videoId?: string;
    videoTitle?: string;
    articleTitle: string;
    intro?: string;
    articleUrl: string;
    buttonLabel?: string;
}

export const PodcastSeriesLastEpisode: React.FC<PodcastSeriesLastEpisodeProps> = ({
    sectionTitle = 'Laatste aflevering',
    videoId,
    videoTitle = 'YouTube video',
    articleTitle,
    intro,
    articleUrl,
    buttonLabel = 'Lees het artikel over deze aflevering',
}) => {
    return (
        <div className="flex flex-col gap-m md:gap-l">
            <SectionHeading variant="lined">{sectionTitle}</SectionHeading>

            {/* Mobile: video on top, text below — desktop: text left, video right */}
            <div className="flex flex-col-reverse sm:flex-row gap-m">
                <div className="flex flex-col gap-m justify-center sm:flex-1 sm:min-w-0">
                    <SectionHeading intro={intro}>{articleTitle}</SectionHeading>
                    <Button
                        variant="pill"
                        iconRight="caret-right"
                        label={buttonLabel}
                        href={articleUrl}
                        className="w-fit"
                    />
                </div>

                <div
                    className="w-full sm:w-1/2 sm:shrink-0 self-start overflow-hidden bg-background-gray"
                    style={{ aspectRatio: '16 / 9' }}
                >
                    {videoId ? (
                        <iframe
                            src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                            title={videoTitle}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        />
                    ) : (
                        <div className="w-full h-full bg-background-gray" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default PodcastSeriesLastEpisode;
