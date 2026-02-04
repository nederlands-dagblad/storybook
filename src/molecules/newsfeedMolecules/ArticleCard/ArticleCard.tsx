import React from "react";
import Badge from "@atoms/displayAtoms/Badge/Badge";
import Icon from "@atoms/basicAtoms/Icon/Icon";

export interface ArticleCardProps {
    imageUrl?: string;
    articleType: string;
    heading: string;
    variant?: 'default' | 'de-nieuwe-koers' | 'video' | 'dnk-publications';
    isPremium?: boolean;
    href?: string;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
    className?: string;
    videoDuration?: string; // For video variant, e.g. "1:55"
    publicationMonth?: string; // For dnk-publications variant
    placeholderText?: string; // Text to display when no image (e.g., "Volgende editie: 1 februari")
    videoId?: string;
}

export const ArticleCard = ({
                                imageUrl,
                                articleType,
                                heading,
                                variant = 'default',
                                isPremium = false,
                                href,
                                onClick,
                                className = "",
                                videoDuration,
                                publicationMonth,
                                placeholderText,
                            }: ArticleCardProps): JSX.Element => {
    // Determine article type color based on variant
    const articleTypeColor = variant === 'de-nieuwe-koers'
        ? 'text-text-dnk'
        : variant === 'video'
            ? 'text-text-inverse'
            : 'text-text-brand';

    // Determine hover border color for non-video variants
    const hoverBorderColor = variant === 'de-nieuwe-koers'
        ? 'hover:border-border-dnk'
        : 'hover:border-border-brand';

    // Shared article type and badge component
    const ArticleTypeAndBadge = () => (
        <div className="flex items-center gap-xxs">
            <div className={`text-meta-uppercase ${articleTypeColor}`}>
                {articleType}
            </div>
            {/* Only show premium badge if isPremium is true AND variant is NOT de-nieuwe-koers */}
            {isPremium && variant !== 'de-nieuwe-koers' && (
                <Badge variant="premium" size="small"/>
            )}
        </div>
    );

    // Shared heading component
    const Heading = ({inverse = false, lines = 5}: { inverse?: boolean; lines?: number }) => (
        <h3 className={`text-body-gulliver-semibold ${inverse ? 'text-text-inverse' : 'text-text-default'} line-clamp-${lines}`}>
            {heading}
        </h3>
    );

    // Video variant has different layout
    if (variant === 'video') {
        const videoContent = (
            <div className="w-full h-[19.125rem] overflow-hidden relative">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={heading}
                        className="w-full h-[19.125rem] object-cover"
                    />
                ) : (
                    <div className="w-full h-[19.125rem] bg-background-gray"/>
                )}

                {/* Dark gradient overlay for better text readability */}
                <div
                    className="absolute inset-0 bg-gradient-to-t from-neutral-black via-neutral-black-30 to-transparent"/>

                {/* Play icon and duration centered */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="group-hover:scale-110 transition-transform duration-300">
                        <Icon name="play-circle" variant="fill" size="xl" color="inverse"/>
                    </div>
                    {videoDuration && (
                        <span className="text-meta-bold text-text-inverse">{videoDuration}</span>
                    )}
                </div>

                {/* Content overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-s flex flex-col gap-xs">
                    <ArticleTypeAndBadge/>
                    <Heading inverse lines={3}/>
                </div>
            </div>
        );

        const videoBaseClasses = `inline-flex flex-col w-[13.25rem] group ${className}`.trim();

        return href ? (
            <a href={href} onClick={onClick} draggable={false} className={videoBaseClasses}>
                {videoContent}
            </a>
        ) : (
            <div className={videoBaseClasses}>
                {videoContent}
            </div>
        );
    }

    // DNK Publications variant has full-height image with publication month below
    if (variant === 'dnk-publications') {
        const dnkPublicationsContent = (
            <>
                <div className="w-[13.25rem] border border-width-s border-border-gray-subtle hover:border-border-dnk active:border-dnk-brand transition-colors overflow-hidden">
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={heading}
                            className="w-full h-[19.125rem] object-cover"
                        />
                    ) : (
                        <div className="w-full h-[19.125rem] bg-background-gray flex items-center justify-center">
                            {placeholderText && (
                                <span className="text-body-light text-text-default text-center px-s">{placeholderText}</span>
                            )}
                        </div>
                    )}
                </div>
                {publicationMonth && (
                    <div className="w-full text-center pt-xs">
                        <span className="text-meta-regular text-text-default">{publicationMonth}</span>
                    </div>
                )}
            </>
        );

        const dnkPublicationsBaseClasses = `inline-flex flex-col items-center ${className}`.trim();

        return href ? (
            <a href={href} onClick={onClick} draggable={false} className={dnkPublicationsBaseClasses}>
                {dnkPublicationsContent}
            </a>
        ) : (
            <div className={dnkPublicationsBaseClasses}>
                {dnkPublicationsContent}
            </div>
        );
    }

    // Default and de-nieuwe-koers variants
    const cardContent = (
        <>
            <div className="w-full h-[7.5rem] overflow-hidden relative">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={heading}
                        className="w-full h-[7.5rem] object-cover"
                    />
                ) : (
                    <div className="w-full h-[7.5rem] bg-background-gray"/>
                )}

                {/* DNK Badge overlay */}
                {variant === 'de-nieuwe-koers' && (
                    <div className="absolute bottom-xs left-xs">
                        <Badge variant="dnk" size="small"/>
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-xs w-full h-[8.5rem]">
                <ArticleTypeAndBadge/>
                <Heading/>
            </div>
        </>
    );

    const baseClasses = `inline-flex flex-col items-center w-[13.25rem] p-s gap-s bg-background-default border border-width-s border-border-gray-subtle ${className}`.trim();

    return href ? (
        <a
            href={href}
            onClick={onClick}
            draggable={false}
            className={`${baseClasses} transition-colors ${hoverBorderColor}`}
        >
            {cardContent}
        </a>
    ) : (
        <div className={baseClasses}>
            {cardContent}
        </div>
    );
};

export default ArticleCard;