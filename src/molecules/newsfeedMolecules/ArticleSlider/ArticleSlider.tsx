import React from "react";
import { ArticleCard, ArticleCardProps } from "@molecules/newsfeedMolecules/ArticleCard/ArticleCard";
import { SectionHeading } from "@atoms/displayAtoms/SectionHeading/SectionHeading";
import { Button } from "@atoms/actionAtoms/Button/Button";

export interface ArticleSliderProps {
    articles: ArticleCardProps[];
    title?: string;
    showButton?: boolean;
    buttonLabel?: string;
    onButtonClick?: () => void;
    className?: string;
}

export const ArticleSlider: React.FC<ArticleSliderProps> = ({
                                                                articles,
                                                                title,
                                                                showButton = false,
                                                                buttonLabel = "",
                                                                onButtonClick,
                                                                className = "",
                                                            }) => {
    return (
        <div className={`w-full flex flex-col gap-s ${className}`}>
            {/* Title section */}
            {title && <SectionHeading>{title}</SectionHeading>}

            {/* Scrollable article list */}
            <div
                className="flex gap-m overflow-x-auto scroll-smooth py-s"
                style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "var(--color-border-accent-gray) transparent"
                }}
            >
                {articles.map((article, index) => (
                    <div key={index} className="flex-shrink-0">
                        <ArticleCard {...article} />
                    </div>
                ))}
            </div>

            {/* Optional button */}
            {showButton && (
                <Button
                    variant="pill"
                    iconRight="caret-right"
                    onClick={onButtonClick}
                    className="w-fit"
                >
                    {buttonLabel}
                </Button>
            )}
        </div>
    );
};

export default ArticleSlider;