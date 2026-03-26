import React from "react";

export interface ImageCardProps {
    imageUrl?: string;
    alt?: string;
    href?: string;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
    className?: string;
}

export const ImageCard = ({
                              imageUrl,
                              alt,
                              href,
                              onClick,
                              className = "",
                          }: ImageCardProps): JSX.Element => {
    const imageContent = (
        <div className="w-[13.25rem] h-[13.25rem] overflow-hidden">
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt={alt}
                    className="w-full h-full object-cover"
                />
            ) : (
                <div className="w-full h-full bg-background-gray"/>
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
