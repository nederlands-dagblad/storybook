import React from 'react';
import { BaseSlider } from '@molecules/newsfeedMolecules/BaseSlider/BaseSlider';
import { ImageCard, ImageCardProps } from '@molecules/newsfeedMolecules/ImageCard/ImageCard';

export interface ImageSliderProps {
    images?: ImageCardProps[];
    title?: string;
    titleVariant?: 'default' | 'lined';
    showButton?: boolean;
    buttonLabel?: string;
    buttonUrl?: string;
    onButtonClick?: () => void;
    onImageSelect?: (index: number) => void;
    className?: string;
}

export const ImageSlider: React.FC<ImageSliderProps> = ({
    images,
    title,
    titleVariant,
    showButton = false,
    buttonLabel = '',
    buttonUrl,
    onButtonClick,
    onImageSelect,
    className = '',
}) => {
    if (!images || images.length === 0) {
        return null;
    }

    const handleItemClick = (index: number) => {
        onImageSelect?.(index);
    };

    return (
        <BaseSlider
            title={title}
            titleVariant={titleVariant}
            showButton={showButton}
            buttonLabel={buttonLabel}
            buttonUrl={buttonUrl}
            onButtonClick={onButtonClick}
            className={className}
            onItemClick={handleItemClick}
        >
            {images.map((image, index) => (
                <div key={index} className="flex-shrink-0 flex" data-index={index}>
                    <ImageCard {...image} />
                </div>
            ))}
        </BaseSlider>
    );
};

export default ImageSlider;
