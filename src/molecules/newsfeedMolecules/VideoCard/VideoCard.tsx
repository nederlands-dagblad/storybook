import React from "react";
import Badge from "@atoms/displayAtoms/Badge/Badge";
import Icon from "@atoms/basicAtoms/Icon/Icon";

export interface VideoCardProps {
    imageUrl?: string;
    heading?: string;
    articleType?: string;
    isPremium?: boolean;
    videoDuration?: string;
    videoId?: string;
    href?: string;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
    className?: string;
}

export const VideoCard = ({
                              imageUrl,
                              heading,
                              articleType,
                              isPremium = false,
                              videoDuration,
                              href,
                              onClick,
                              className = "",
                          }: VideoCardProps): JSX.Element => {
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
                <div className="flex items-center gap-xxs">
                    {articleType && (
                        <div className="text-meta-uppercase text-text-inverse">
                            {articleType}
                        </div>
                    )}
                    {isPremium && (
                        <Badge variant="premium" size="small"/>
                    )}
                </div>
                {heading && (
                    <h3 className="text-body-gulliver-semibold text-text-inverse line-clamp-3">
                        {heading}
                    </h3>
                )}
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
};

export default VideoCard;
