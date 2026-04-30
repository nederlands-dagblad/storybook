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
        <div className="flex flex-row sm:flex-col sm:pt-s sm:px-s h-full">
            <div className="shrink-0 w-1/3 aspect-square self-start sm:w-full sm:self-auto overflow-hidden">
                {imageUrl ? (
                    <img src={imageUrl} alt={alt} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-background-gray" />
                )}
            </div>
            <div className="flex flex-col p-xxs pl-s sm:pl-0 sm:py-s flex-1 min-w-0 justify-center sm:justify-between">
                <div className="flex flex-col gap-xxs">
                    <span className="text-heading-m text-text-default">{title}</span>
                    {description && (
                        <span className="text-meta-light text-text-default line-clamp-3">{description}</span>
                    )}
                </div>
                {metaText && (
                    <a href={href} className="text-meta-light text-text-gray mt-xxs sm:mt-0 sm:pt-s">
                        {metaText} &gt;
                    </a>
                )}
            </div>
        </div>
    );

    if (href) {
        return (
            <a href={href} className="flex flex-col group border border-width-default border-border-gray-subtle hover:border-border-brand">
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
