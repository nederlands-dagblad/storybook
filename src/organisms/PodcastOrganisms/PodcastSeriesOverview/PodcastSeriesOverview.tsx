import React from 'react';

export interface PodcastSeries {
    imageUrl?: string;
    alt?: string;
    title: string;
    description?: string;
    metaText?: string;
    href?: string;
}

export interface PodcastSeriesOverviewProps {
    series: PodcastSeries[];
}

export const PodcastSeriesCard: React.FC<PodcastSeries> = ({ imageUrl, alt, title, description, metaText, href }) => {
    const inner = (
        <div className="flex flex-col h-full">
            <div className="w-full overflow-hidden">
                {imageUrl ? (
                    <img src={imageUrl} alt={alt} className="w-full h-auto object-cover" />
                ) : (
                    <div className="w-full aspect-square bg-background-gray" />
                )}
            </div>
            <div className="flex flex-col p-s flex-1 min-w-0">
                <span className="text-heading-m text-text-default">{title}</span>
                {description && (
                    <span className="text-meta-light text-text-default line-clamp-3 mt-xxs">{description}</span>
                )}
                {metaText && (
                    <span className="text-meta-light text-text-gray mt-s">
                        {metaText} &gt;
                    </span>
                )}
            </div>
        </div>
    );

    if (href) {
        return (
            <a href={href} className="flex flex-col border border-width-default border-border-gray-subtle hover:border-border-brand">
                {inner}
            </a>
        );
    }

    return <div className="flex flex-col border border-width-default border-border-gray-subtle hover:border-border-brand">{inner}</div>;
};

export const PodcastSeriesOverview: React.FC<PodcastSeriesOverviewProps> = ({ series }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-s sm:gap-m lg:gap-l">
            {series.map((item, index) => (
                <PodcastSeriesCard key={index} {...item} />
            ))}
        </div>
    );
};

export default PodcastSeriesOverview;
