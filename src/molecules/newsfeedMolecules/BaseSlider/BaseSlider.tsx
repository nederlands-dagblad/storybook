import React, {useRef, useState, useEffect} from "react";
import {SectionHeading} from "@atoms/displayAtoms/SectionHeading/SectionHeading";
import {Button} from "@atoms/actionAtoms/Button/Button";

export interface BaseSliderProps {
    title?: string;
    showButton?: boolean;
    buttonLabel?: string;
    buttonUrl?: string;
    onButtonClick?: () => void;
    className?: string;
    children: React.ReactNode;
    /** Called when a slide item is clicked (not dragged). Receives the click event and the data-index value. */
    onItemClick?: (index: number, event: MouseEvent) => void;
}

export const BaseSlider: React.FC<BaseSliderProps> = ({
    title,
    showButton = false,
    buttonLabel = "",
    buttonUrl,
    onButtonClick,
    className = "",
    children,
    onItemClick,
}) => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const isDraggingRef = useRef(false);
    const startXRef = useRef(0);
    const scrollLeftRef = useRef(0);
    const hasMovedRef = useRef(false);
    const [showLeftFade, setShowLeftFade] = useState(false);
    const [showRightFade, setShowRightFade] = useState(true);

    const updateFadeVisibility = () => {
        if (!sliderRef.current) return;
        const {scrollLeft, scrollWidth, clientWidth} = sliderRef.current;
        setShowLeftFade(scrollLeft > 0);
        setShowRightFade(scrollLeft < scrollWidth - clientWidth - 1);
    };

    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        updateFadeVisibility();
        slider.addEventListener('scroll', updateFadeVisibility);
        window.addEventListener('resize', updateFadeVisibility);

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
                hasMovedRef.current = false;
                return;
            }

            if (onItemClick) {
                const target = e.target as HTMLElement;
                const cardWrapper = target.closest('[data-index]') as HTMLElement;
                if (cardWrapper) {
                    const indexStr = cardWrapper.getAttribute('data-index');
                    if (indexStr !== null) {
                        onItemClick(parseInt(indexStr, 10), e);
                    }
                }
            }

            hasMovedRef.current = false;
        };

        slider.addEventListener('mousedown', handleMouseDown);
        slider.addEventListener('mousemove', handleMouseMove);
        slider.addEventListener('mouseup', handleMouseUp);
        slider.addEventListener('mouseleave', handleMouseUp);
        slider.addEventListener('click', handleClick, true);

        return () => {
            slider.removeEventListener('scroll', updateFadeVisibility);
            window.removeEventListener('resize', updateFadeVisibility);
            slider.removeEventListener('mousedown', handleMouseDown);
            slider.removeEventListener('mousemove', handleMouseMove);
            slider.removeEventListener('mouseup', handleMouseUp);
            slider.removeEventListener('mouseleave', handleMouseUp);
            slider.removeEventListener('click', handleClick, true);
        };
    }, [onItemClick]);

    return (
        <div className={`w-full flex flex-col gap-s ${className}`}>
            {title && <SectionHeading>{title}</SectionHeading>}

            <div className="relative">
                {showLeftFade && (
                    <div
                        className="absolute left-0 top-0 bottom-0 w-m bg-gradient-to-r from-background-default to-transparent pointer-events-none z-10"/>
                )}

                {showRightFade && (
                    <div
                        className="absolute right-0 top-0 bottom-0 w-m bg-gradient-to-l from-background-default to-transparent pointer-events-none z-10"/>
                )}

                <div
                    ref={sliderRef}
                    className="flex gap-m overflow-x-auto scroll-smooth py-s cursor-grab active:cursor-grabbing select-none [&_img]:pointer-events-none"
                    style={{
                        scrollbarWidth: "thin",
                        scrollbarColor: "var(--color-border-gray) transparent"
                    }}
                >
                    {children}
                </div>
            </div>

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

export default BaseSlider;
