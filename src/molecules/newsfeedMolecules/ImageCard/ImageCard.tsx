import React from "react";

export interface ImageCardProps {
    variant?: 'image' | 'card';
    imageUrl?: string;
    alt?: string;
    description?: string;
    metaText?: string;
    href?: string;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
    className?: string;
}

export const ImageCard = ({
    variant = 'image',
    imageUrl,
    alt,
    description,
    metaText,
    href,
    onClick,
    className = "",
}: ImageCardProps): React.ReactElement => {
    if (variant === 'card') {
        const cardInner = (
            <>
                <div className="w-full aspect-square overflow-hidden">
                    {imageUrl ? (
                        <img src={imageUrl} alt={alt} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-background-gray" />
                    )}
                </div>
                <div className="flex flex-col gap-xs flex-1">
                    {description && <span className="text-body-light text-text-default">{description}</span>}
                    {metaText && <span className="text-meta-light text-text-default italic">{metaText}</span>}
                </div>
            </>
        );

        return (
            <div className={`flex flex-col flex-1 w-[13.25rem] p-s gap-s bg-background-default border border-width-s border-border-gray-subtle ${className}`.trim()}>
                {cardInner}
            </div>
        );
    }

    const imageContent = (
        <div className="w-[13.25rem] h-[13.25rem] overflow-hidden">
            {imageUrl ? (
                <img src={imageUrl} alt={alt} className="w-full h-full object-cover" />
            ) : (
                <div className="w-full h-full bg-background-gray" />
            )}
        </div>
    );

    const imageBaseClasses = `inline-flex group ${className}`.trim();

    return href ? (
        <a href={href} onClick={onClick} draggable={false} className={imageBaseClasses}>
            {imageContent}
        </a>
    ) : (
        <div className={imageBaseClasses}>
            {imageContent}
        </div>
    );
};

export default ImageCard;
