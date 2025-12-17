import React from "react";
import Badge from "@atoms/displayAtoms/Badge/Badge";
import Icon from "@atoms/basicAtoms/Icon/Icon";

export interface ArticleCardProps {
    imageUrl?: string;
    articleType: string;
    heading: string;
    variant?: 'default' | 'de-nieuwe-koers' | 'video';
    isPremium?: boolean;
    href?: string;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
    className?: string;
    videoDuration?: string; // For video variant, e.g. "1:55"
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
                            }: ArticleCardProps): JSX.Element => {
    // Determine article type color based on variant
    const articleTypeColor = variant === 'de-nieuwe-koers'
        ? 'text-dnk-brand'
        : 'text-text-brand';

    // Determine hover border color based on variant
    const hoverBorderColor = variant === 'de-nieuwe-koers'
        ? 'hover:border-dnk-brand'
        : 'hover:border-border-brand';

    // Video variant has different layout
    if (variant === 'video') {
        const videoContent = (
            <>
                {/* Full-size thumbnail - 19.125rem = 306px */}
                <div className="w-full h-[19.125rem] overflow-hidden relative">
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={heading}
                            className="w-full h-[19.125rem] object-cover"
                        />
                    ) : (
                        <div className="w-full h-[19.125rem] bg-background-accent-gray"/>
                    )}

                    {/* Play icon and duration centered */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="group-hover:scale-105 transition-transform duration-300">
                            <Icon name="play-circle" variant="fill" size="xl" color="inverse"/>
                        </div>

                        {/* Duration below play button */}
                        {videoDuration && (
                            <span className="text-meta-bold text-text-inverse">{videoDuration}</span>
                        )}
                    </div>
                </div>

                {/* Content below thumbnail */}
                <div className="flex flex-col gap-xs w-full">
                    {/* Article type with optional premium badge */}
                    <div className="flex items-center gap-xxs">
                        <div className={`text-meta-uppercase ${articleTypeColor}`}>
                            {articleType}
                        </div>
                        {isPremium && (
                            <Badge variant="premium" size="small"/>
                        )}
                    </div>

                    {/* Heading */}
                    <h3 className="text-body-gulliver-semibold text-text-default line-clamp-3 group-hover:underline">
                        {heading}
                    </h3>
                </div>
            </>
        );

        const videoBaseClasses = `
            inline-flex flex-col
            w-[13.25rem]
            gap-xs
            group
            ${className}
        `.trim();

        if (href) {
            return (
                <a
                    href={href}
                    onClick={onClick}
                    className={videoBaseClasses}
                >
                    {videoContent}
                </a>
            )
                ;
        }

        return (
            <div className={videoBaseClasses}>
                {videoContent}
            </div>
        );
    }

    // Default and de-nieuwe-koers variants
    const cardContent = (
        <>
            {/* Image placeholder */}
            <div className="w-full h-[7.5rem] overflow-hidden relative">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={heading}
                        className="w-full h-[7.5rem] object-cover"
                    />
                ) : (
                    <div className="w-full h-[7.5rem] bg-background-accent-gray"/>
                )}

                {/* DNK Badge overlay for de-nieuwe-koers variant */}
                {variant === 'de-nieuwe-koers' && (
                    <div className="absolute bottom-xs left-xs">
                        <Badge variant="dnk" size="small"/>
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-xs w-full h-[8.5rem]">
                {/* Article type with optional premium badge */}
                <div className="flex items-center gap-xxs">
                    <div className={`text-meta-uppercase ${articleTypeColor}`}>
                        {articleType}
                    </div>
                    {isPremium && (
                        <Badge variant="premium" size="small"/>
                    )}
                </div>

                {/* Heading - no underline for default and dnk variants */}
                <h3 className="text-body-gulliver-semibold text-text-default line-clamp-5">
                    {heading}
                </h3>
            </div>
        </>
    );

    const baseClasses = `
        inline-flex flex-col
        items-center
        w-[13.25rem]
        p-s
        gap-s
        bg-background-default
        border border-width-s border-border-accent-gray-subtle
        ${className}
    `.trim();

    // If href is provided, render as a link
    if (href) {
        return (
            <a
                href={href}
                onClick={onClick}
                className={`${baseClasses} transition-colors ${hoverBorderColor}`}
            >
                {cardContent}
            </a>
        );
    }

    // Otherwise, render as a div
    return (
        <div className={baseClasses}>
            {cardContent}
        </div>
    );
};

export default ArticleCard;