import React from "react";

export interface ArticleCardProps {
    imageUrl?: string;
    articleType: string;
    heading: string;
    className?: string;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
                                                            imageUrl,
                                                            articleType,
                                                            heading,
                                                            className = "",
                                                        }) => {
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
            <div className="w-full h-[7.5rem] overflow-hidden">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={heading}
                        className="w-full h-[7.5rem] object-cover"
                    />
                ) : (
                    <div className="w-full h-[7.5rem] bg-background-accent-gray" />
                )}
            </div>
            
            <div className="flex flex-col gap-xxs w-full h-[7.5rem]">
                {/* Article type */}
                <div className="text-meta-uppercase text-text-brand">
                    {articleType}
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