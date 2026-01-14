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
    const isDraggingRef = useRef(false);
    const startXRef = useRef(0);
    const scrollLeftRef = useRef(0);
    const hasMovedRef = useRef(false);
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

        // Native event listeners
        const handleMouseDown = (e: MouseEvent) => {
            isDraggingRef.current = true;
            hasMovedRef.current = false;
            slider.classList.remove('scroll-smooth');
            startXRef.current = e.pageX;
            scrollLeftRef.current = slider.scrollLeft;
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!isDraggingRef.current) return;

            const x = e.pageX;
            const distance = startXRef.current - x;

            // Only preventDefault and scroll if actually moving
            if (Math.abs(distance) > 3) {
                e.preventDefault();
                slider.scrollLeft = scrollLeftRef.current + distance;
                hasMovedRef.current = true;
            }
        };

        const handleMouseUp = () => {
            slider.classList.add('scroll-smooth');
            isDraggingRef.current = false;
        };

        const handleClick = (e: MouseEvent) => {
            if (hasMovedRef.current) {
                e.preventDefault();
                e.stopPropagation();
            }
            hasMovedRef.current = false;
        };

        slider.addEventListener('mousedown', handleMouseDown);
        slider.addEventListener('mousemove', handleMouseMove);
        slider.addEventListener('mouseup', handleMouseUp);
        slider.addEventListener('mouseleave', handleMouseUp);
        slider.addEventListener('click', handleClick, true); // Use capture phase

        return () => {
            slider.removeEventListener('scroll', updateFadeVisibility);
            window.removeEventListener('resize', updateFadeVisibility);
            slider.removeEventListener('mousedown', handleMouseDown);
            slider.removeEventListener('mousemove', handleMouseMove);
            slider.removeEventListener('mouseup', handleMouseUp);
            slider.removeEventListener('mouseleave', handleMouseUp);
            slider.removeEventListener('click', handleClick, true);
        };
    }, []);

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
                    className="flex gap-m overflow-x-auto scroll-smooth py-s cursor-grab active:cursor-grabbing [&_img]:pointer-events-none"
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