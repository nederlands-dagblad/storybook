import React from "react";
import Badge from "@atoms/displayAtoms/Badge/Badge";

export interface ArticleCardProps {
    imageUrl?: string;
    articleType: string;
    heading: string;
    variant?: 'default' | 'de-nieuwe-koers';
    isPremium?: boolean;
    className?: string;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
                                                            imageUrl,
                                                            articleType,
                                                            heading,
                                                            variant = 'default',
                                                            isPremium = false,
                                                            className = "",
                                                        }) => {
    // Determine article type color based on variant
    const articleTypeColor = variant === 'de-nieuwe-koers'
        ? 'text-dnk-brand'
        : 'text-text-brand';

    return (
        <div
            className={`
                inline-flex flex-col
                items-center
                w-[13.25rem]
                p-s
                gap-s
                bg-background-default
                border border-width-s border-border-accent-gray-subtle
                ${className}
            `.trim()}
        >
            {/* Image placeholder */}
            <div className="w-full h-[7.5rem] overflow-hidden relative">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={heading}
                        className="w-full h-[7.5rem] object-cover"
                    />
                ) : (
                    <div className="w-full h-[7.5rem] bg-background-accent-gray" />
                )}

                {/* DNK Badge overlay for de-nieuwe-koers variant */}
                {variant === 'de-nieuwe-koers' && (
                    <div className="absolute bottom-xs left-xs">
                        <Badge variant="dnk" size="small" />
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
                        <Badge variant="premium" size="small" />
                    )}
                </div>

                {/* Heading */}
                <h3 className="text-body-gulliver-semibold text-text-default line-clamp-5">
                    {heading}
                </h3>
            </div>
        </div>
    );
};

export default ArticleCard;