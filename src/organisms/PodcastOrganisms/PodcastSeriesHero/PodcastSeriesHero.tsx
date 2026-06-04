import React from 'react';
import { AudioPlayer } from '@molecules/mediaMolecules/AudioPlayer/AudioPlayer';

export interface PodcastSeriesHeroProps {
    imageUrl?: string;
    alt?: string;
    title: string;
    description?: string;
    trailerUrl?: string;
    trailerLabel?: string;
}

export const PodcastSeriesHero: React.FC<PodcastSeriesHeroProps> = ({
    imageUrl,
    alt,
    title,
    description,
    trailerUrl,
    trailerLabel = 'Luister de trailer',
}) => {
    return (
        <div className="flex flex-col sm:flex-row gap-l">
            <div className="w-full p-m sm:p-0 sm:shrink-0 sm:w-1/3 aspect-square self-center sm:self-start overflow-hidden">
                {imageUrl ? (
                    <img src={imageUrl} alt={alt} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-background-gray" />
                )}
            </div>

            <div className="flex flex-col gap-xl justify-center sm:flex-1 sm:min-w-0">
                <div className="flex flex-col gap-s">
                    <h1 className="text-heading-xl text-text-default">{title}</h1>
                    {description && (
                        <p className="text-body-light text-text-default">{description}</p>
                    )}
                </div>

                {trailerUrl && (
                    <AudioPlayer src={trailerUrl} label={trailerLabel} />
                )}
            </div>
        </div>
    );
};

export default PodcastSeriesHero;
