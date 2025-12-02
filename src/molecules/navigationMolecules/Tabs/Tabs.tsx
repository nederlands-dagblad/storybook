import React from "react";
import Icon from "@atoms/basicAtoms/Icon/Icon";

export interface TabItem {
    href: string;
    label: string;
}

export interface TabsProps {
    items: TabItem[];
    active?: boolean;
    backHref?: string;
    currentLocation?: string; // Add this prop for Storybook testing
    mobileLayout?: 'vertical' | 'horizontal'; // Control mobile layout behavior
}

export const Tabs: React.FC<TabsProps> = (props) => {
    const { items, active, backHref, mobileLayout = 'vertical' } = props;

    const currentLocation = props.currentLocation || window.location.pathname;

    const [isDesktop, setIsDesktop] = React.useState(window.innerWidth >= 768);
    const [showLeftFade, setShowLeftFade] = React.useState(false);
    const [showRightFade, setShowRightFade] = React.useState(false);
    const scrollContainerRef = React.useRef<HTMLUListElement>(null);

    React.useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Check scroll position and update fade visibility
    const checkScroll = () => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const { scrollLeft, scrollWidth, clientWidth } = container;

        // Show left fade if scrolled right from start
        setShowLeftFade(scrollLeft > 0);

        // Show right fade if not scrolled to end
        setShowRightFade(scrollLeft < scrollWidth - clientWidth - 1);
    };

    React.useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        // Check on mount and when items change
        checkScroll();

        // Add scroll listener
        container.addEventListener('scroll', checkScroll);

        // Add resize listener to recheck when window resizes
        window.addEventListener('resize', checkScroll);

        return () => {
            container.removeEventListener('scroll', checkScroll);
            window.removeEventListener('resize', checkScroll);
        };
    }, [items, isDesktop, mobileLayout]);

    // Determine if we should use vertical mobile layout
    const useVerticalMobile = !isDesktop && mobileLayout === 'vertical';
    const useHorizontalMobile = !isDesktop && mobileLayout === 'horizontal';

    const itemRenderer = (item: TabItem, index: number) => {
        const isActive = item.href === currentLocation;

        return (
            <li
                key={item.href}
                className={`
          ${useVerticalMobile ? "w-full flex border-b border-s border-border-default" : "flex-shrink-0"}
          ${isDesktop || useHorizontalMobile ? "w-auto" : ""}
        `.trim()}
            >
                <a
                    href={item.href}
                    className={`
            ${useVerticalMobile ? "flex flex-row justify-between items-center w-full py-s" : ""}
            ${isDesktop || useHorizontalMobile ? "w-auto py-0" : ""}
            ${index === 0 && useVerticalMobile ? "pt-0" : ""}
            ${
                        isActive
                            ? "text-menu-menu-tab-item-active text-text-default underline underline-offset-[0.3rem] decoration-[0.1rem] !decoration-text-brand"
                            : "text-menu-menu-tab-item text-text-default no-underline hover:underline hover:underline-offset-[0.3rem] hover:decoration-[0.1rem]"
                    }
          `.trim()}
                >
                    {item.label}
                    <span className={useVerticalMobile ? "flex" : "hidden"}>
            <Icon name="caret-right" variant="outline" size="s" color={isActive ? "brand" : "default"} />
          </span>
                </a>
            </li>
        );
    };

    // Mobile active view (only for vertical layout when a tab is selected on mobile)
    if (useVerticalMobile && active) {
        const activeItem = items.find(item => item.href === currentLocation);

        if (!activeItem) return null;

        return (
            <div>
                <a className="flex flex-row items-center gap-xs" href={backHref}>
                    <div className="flex">
                        <Icon name="caret-left" variant="outline" size="m" color="default" />
                    </div>
                    <span className="text-menu-menu-tab-item-active text-text-default underline underline-offset-[0.3rem] decoration-[0.1rem] !decoration-text-brand">
            {activeItem.label}
          </span>
                </a>
            </div>
        );
    }

    // Filter out active item on mobile vertical layout (not on horizontal or desktop)
    const displayItems = useVerticalMobile
        ? items.filter(item => item.href !== currentLocation)
        : items;

    return (
        <div className={`
      ${useVerticalMobile ? "" : "relative"}
    `.trim()}>
            {/* Left fade overlay */}
            {!useVerticalMobile && showLeftFade && (
                <div className="absolute left-0 top-0 bottom-0 w-l bg-gradient-to-r from-background-default to-transparent pointer-events-none z-10" />
            )}

            {/* Right fade overlay */}
            {!useVerticalMobile && showRightFade && (
                <div className="absolute right-0 top-0 bottom-0 w-l bg-gradient-to-l from-background-default to-transparent pointer-events-none z-10" />
            )}

            <ul
                ref={scrollContainerRef}
                className={`
        flex
        ${useVerticalMobile ? "flex-col gap-0" : "flex-row gap-l overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"}
      `.trim()}>
                {displayItems.map((item, index) => itemRenderer(item, index))}
            </ul>
        </div>
    );
};

export default Tabs;