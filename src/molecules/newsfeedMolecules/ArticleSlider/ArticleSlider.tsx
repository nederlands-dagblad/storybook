import React, { useRef, useState, useEffect } from "react";
import { ArticleCard, ArticleCardProps } from "@molecules/newsfeedMolecules/ArticleCard/ArticleCard";
import { SectionHeading } from "@atoms/displayAtoms/SectionHeading/SectionHeading";
import { Button } from "@atoms/actionAtoms/Button/Button";

export interface ArticleSliderProps {
    articles: ArticleCardProps[];
    title?: string;
    showButton?: boolean;
    buttonLabel?: string;
    buttonUrl?: string;
    onButtonClick?: () => void;
    className?: string;
}

export const ArticleSlider: React.FC<ArticleSliderProps> = ({
                                                                articles,
                                                                title,
                                                                showButton = false,
                                                                buttonLabel = "",
                                                                buttonUrl,
                                                                onButtonClick,
                                                                className = "",
                                                            }) => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [hasMoved, setHasMoved] = useState(false);
    const [showLeftFade, setShowLeftFade] = useState(false);
    const [showRightFade, setShowRightFade] = useState(true);

    // Update fade visibility based on scroll position
    const updateFadeVisibility = () => {
        if (!sliderRef.current) return;

        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;

        setShowLeftFade(scrollLeft > 0);
        setShowRightFade(scrollLeft < scrollWidth - clientWidth - 1);
    };

    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        updateFadeVisibility();
        slider.addEventListener('scroll', updateFadeVisibility);
        window.addEventListener('resize', updateFadeVisibility);

        return () => {
            slider.removeEventListener('scroll', updateFadeVisibility);
            window.removeEventListener('resize', updateFadeVisibility);
        };
    }, []);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!sliderRef.current) return;
        e.preventDefault();
        setIsDragging(true);
        setHasMoved(false);
        sliderRef.current.classList.remove('scroll-smooth');
        setStartX(e.pageX);
        setScrollLeft(sliderRef.current.scrollLeft);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !sliderRef.current) return;
        e.preventDefault();
        const x = e.pageX;
        const distance = startX - x;
        sliderRef.current.scrollLeft = scrollLeft + distance;
        if (Math.abs(distance) > 5) {
            setHasMoved(true);
        }
    };

    const handleMouseUpOrLeave = () => {
        if (sliderRef.current) {
            sliderRef.current.classList.add('scroll-smooth');
        }
        setIsDragging(false);
    };

    // Prevent clicks on links when dragging
    const handleClick = (e: React.MouseEvent) => {
        if (hasMoved) {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    return (
        <div className={`w-full flex flex-col gap-s ${className}`}>
            {/* Title section */}
            {title && <SectionHeading>{title}</SectionHeading>}

            {/* Scrollable article list with conditional fade effects */}
            <div className="relative">
                {/* Left fade */}
                {showLeftFade && (
                    <div className="absolute left-0 top-0 bottom-0 w-m bg-gradient-to-r from-background-default to-transparent pointer-events-none z-10" />
                )}

                {/* Right fade */}
                {showRightFade && (
                    <div className="absolute right-0 top-0 bottom-0 w-m bg-gradient-to-l from-background-default to-transparent pointer-events-none z-10" />
                )}

                <div
                    ref={sliderRef}
                    className="flex gap-m overflow-x-auto scroll-smooth py-s cursor-grab active:cursor-grabbing select-none [&_img]:pointer-events-none [&_a]:pointer-events-auto"
                    style={{
                        scrollbarWidth: "thin",
                        scrollbarColor: "var(--color-border-accent-gray) transparent"
                    }}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUpOrLeave}
                    onMouseLeave={handleMouseUpOrLeave}
                    onClick={handleClick}
                >
                    {articles.map((article, index) => (
                        <div key={index} className="flex-shrink-0">
                            <ArticleCard {...article} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Optional button */}
            {showButton && (
                <Button
                    variant="pill"
                    iconRight="caret-right"
                    href={buttonUrl}
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