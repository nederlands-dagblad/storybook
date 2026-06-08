import React from 'react';
import { SectionHeading } from '@atoms/displayAtoms/SectionHeading/SectionHeading';

export interface PodcastSeriesHost {
    imageUrl?: string;
    alt?: string;
    name: string;
    description?: string;
}

export interface PodcastSeriesHostsProps {
    sectionTitle?: string;
    hosts: PodcastSeriesHost[];
}

export const PodcastSeriesHosts: React.FC<PodcastSeriesHostsProps> = ({
    sectionTitle = 'De makers',
    hosts,
}) => {
    return (
        <div className="flex flex-col gap-m md:gap-l">
            <SectionHeading variant="lined">{sectionTitle}</SectionHeading>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-m md:gap-l">
                {hosts.map((host, index) => (
                    <div key={index} className="flex flex-col gap-s">
                        <div className="w-full aspect-square overflow-hidden bg-background-gray">
                            {host.imageUrl ? (
                                <img
                                    src={host.imageUrl}
                                    alt={host.alt}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-background-gray" />
                            )}
                        </div>
                        <div className="flex flex-col gap-xxs lg:gap-xs">
                            <h3 className="text-heading-m text-text-default">{host.name}</h3>
                            {host.description && (
                                <p className="text-body-light text-text-default">{host.description}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PodcastSeriesHosts;
