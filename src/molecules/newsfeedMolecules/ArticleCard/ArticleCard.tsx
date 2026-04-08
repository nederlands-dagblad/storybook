import React from "react";
import Badge from "@atoms/displayAtoms/Badge/Badge";
import {ButtonProps} from "@atoms/actionAtoms/Button/Button";
import {VideoCard} from "@molecules/newsfeedMolecules/VideoCard/VideoCard";
import {ImageCard} from "@molecules/newsfeedMolecules/ImageCard/ImageCard";
import {PublicationCard} from "@molecules/newsfeedMolecules/PublicationCard/PublicationCard";

export interface ArticleCardProps {
    imageUrl?: string;
    articleType?: string;
    heading?: string;
    variant?: 'default' | 'de-nieuwe-koers' | 'video' | 'dnk-publications' | 'image';
    isPremium?: boolean;
    href?: string;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
    className?: string;
    videoDuration?: string; // For video variant, e.g. "1:55"
    publicationMonth?: string; // For dnk-publications variant
    placeholderText?: string; // Text to display when no image (e.g., "Volgende editie: 1 februari")
    videoId?: string;
    buttonProps?: ButtonProps;
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
                                buttonProps,
                            }: ArticleCardProps): React.ReactElement => {
    // Delegate to VideoCard
    if (variant === 'video') {
        return (
            <VideoCard
                imageUrl={imageUrl}
                heading={heading}
                articleType={articleType}
                isPremium={isPremium}
                videoDuration={videoDuration}
                href={href}
                onClick={onClick}
                className={className}
            />
        );
    }

    // Delegate to ImageCard
    if (variant === 'image') {
        return (
            <ImageCard
                imageUrl={imageUrl}
                alt={articleType}
                href={href}
                onClick={onClick}
                className={className}
            />
        );
    }

    // Delegate to PublicationCard
    if (variant === 'dnk-publications') {
        return (
            <PublicationCard
                imageUrl={imageUrl}
                heading={heading}
                publicationMonth={publicationMonth}
                placeholderText={placeholderText}
                buttonProps={buttonProps}
                href={href}
                onClick={onClick}
                className={className}
            />
        );
    }

    // Default and de-nieuwe-koers variants (shared layout)
    const articleTypeColor = variant === 'de-nieuwe-koers'
        ? 'text-text-dnk'
        : 'text-text-brand';

    const hoverBorderColor = variant === 'de-nieuwe-koers'
        ? 'hover:border-border-dnk'
        : 'hover:border-border-brand';

    const ArticleTypeAndBadge = () => (
        <div className="flex items-center gap-xxs">
            {articleType && (
                <div className={`text-meta-uppercase ${articleTypeColor}`}>
                    {articleType}
                </div>
            )}
            {isPremium && variant !== 'de-nieuwe-koers' && (
                <Badge variant="premium" size="small"/>
            )}
        </div>
    );

    const Heading = () => heading ? (
        <h3 className="text-body-gulliver-semibold text-text-default line-clamp-5">
            {heading}
        </h3>
    ) : null;

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
