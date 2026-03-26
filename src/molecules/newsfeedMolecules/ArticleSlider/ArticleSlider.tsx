import React, {useState} from "react";
import {ArticleCard, ArticleCardProps} from "@molecules/newsfeedMolecules/ArticleCard/ArticleCard";
import {BaseSlider} from "@molecules/newsfeedMolecules/BaseSlider/BaseSlider";
import {VideoSlider} from "@molecules/newsfeedMolecules/VideoSlider/VideoSlider";
import type {VideoConfig} from "@molecules/newsfeedMolecules/VideoSlider/VideoSlider";

export type {VideoConfig};

export interface ArticleSliderProps {
    articles?: ArticleCardProps[];
    videoConfig?: VideoConfig;
    title?: string;
    showButton?: boolean;
    buttonLabel?: string;
    buttonUrl?: string;
    onButtonClick?: () => void;
    onArticleSelect?: (index: number) => void;
    className?: string;
    enableSelection?: boolean;
    defaultSelectedIndex?: number;
}

export const ArticleSlider: React.FC<ArticleSliderProps> = ({
    articles,
    videoConfig,
    title,
    showButton = false,
    buttonLabel = "",
    buttonUrl,
    onButtonClick,
    className = "",
    enableSelection = false,
    defaultSelectedIndex,
    onArticleSelect,
}) => {
    // Delegate to VideoSlider when videoConfig is provided (backwards compat)
    if (videoConfig) {
        return (
            <VideoSlider
                videoConfig={videoConfig}
                title={title}
                showButton={showButton}
                buttonLabel={buttonLabel}
                buttonUrl={buttonUrl}
                onButtonClick={onButtonClick}
                className={className}
            />
        );
    }

    return (
        <ArticleSliderContent
            articles={articles || []}
            title={title}
            showButton={showButton}
            buttonLabel={buttonLabel}
            buttonUrl={buttonUrl}
            onButtonClick={onButtonClick}
            className={className}
            enableSelection={enableSelection}
            defaultSelectedIndex={defaultSelectedIndex}
            onArticleSelect={onArticleSelect}
        />
    );
};

// Extracted to its own component so hooks are not called conditionally
const ArticleSliderContent: React.FC<{
    articles: ArticleCardProps[];
    title?: string;
    showButton: boolean;
    buttonLabel: string;
    buttonUrl?: string;
    onButtonClick?: () => void;
    className: string;
    enableSelection: boolean;
    defaultSelectedIndex?: number;
    onArticleSelect?: (index: number) => void;
}> = ({
    articles,
    title,
    showButton,
    buttonLabel,
    buttonUrl,
    onButtonClick,
    className,
    enableSelection,
    defaultSelectedIndex,
    onArticleSelect,
}) => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(
        defaultSelectedIndex !== undefined ? defaultSelectedIndex : null
    );

    const handleItemClick = (index: number, event: MouseEvent) => {
        if (enableSelection) {
            setSelectedIndex(index);
            onArticleSelect?.(index);

            const article = articles[index];
            if (!article.href) {
                event.preventDefault();
            }
        }
    };

    if (!articles || articles.length === 0) {
        return null;
    }

    return (
        <BaseSlider
            title={title}
            showButton={showButton}
            buttonLabel={buttonLabel}
            buttonUrl={buttonUrl}
            onButtonClick={onButtonClick}
            className={className}
            onItemClick={handleItemClick}
        >
            {articles.map((article, index) => {
                const isSelected = enableSelection && selectedIndex === index;

                return (
                    <div
                        key={index}
                        className="flex-shrink-0"
                        data-index={index}
                    >
                        <ArticleCard
                            {...article}
                            className={`${article.className || ''} ${isSelected ? '[&>div]:!border-border-dnk' : ''}`.trim()}
                        />
                    </div>
                );
            })}
        </BaseSlider>
    );
};

export default ArticleSlider;
