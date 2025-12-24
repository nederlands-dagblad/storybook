import React from "react";
import Badge from "@atoms/displayAtoms/Badge/Badge";

export interface ArticleCardProps {
    imageUrl?: string;
    articleType: string;
    heading: string;
    variant?: 'default' | 'de-nieuwe-koers';
    isPremium?: boolean;
    href?: string;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
    className?: string;
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
                            }: ArticleCardProps): JSX.Element => {
    // Determine article type color based on variant
    const articleTypeColor = variant === 'de-nieuwe-koers'
        ? 'text-dnk-brand'
        : 'text-text-brand';

    // Determine hover border color based on variant
    const hoverBorderColor = variant === 'de-nieuwe-koers'
        ? 'hover:border-dnk-brand'
        : 'hover:border-border-brand';

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
                    {/* Only show premium badge if isPremium is true AND variant is NOT de-nieuwe-koers */}
                    {isPremium && variant !== 'de-nieuwe-koers' && (
                        <Badge variant="premium" size="small"/>
                    )}
                </div>

                {/* Heading */}
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