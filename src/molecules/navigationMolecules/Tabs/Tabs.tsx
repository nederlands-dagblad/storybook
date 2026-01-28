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
    currentLocation?: string; // Full URL or pathname+search for matching
    mobileLayout?: 'vertical' | 'horizontal';
}

export const Tabs: React.FC<TabsProps> = (props) => {
    const { items, active, backHref, mobileLayout = 'vertical' } = props;

    // Use full pathname + search for matching (supports query strings)
    const currentLocation = props.currentLocation ||
        (typeof window !== 'undefined' ? window.location.pathname + window.location.search : '');

    const [isDesktop, setIsDesktop] = React.useState(
        typeof window !== 'undefined' ? window.innerWidth >= 768 : true
    );
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
        setShowLeftFade(scrollLeft > 0);
        setShowRightFade(scrollLeft < scrollWidth - clientWidth - 1);
    };

    React.useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        checkScroll();
        container.addEventListener('scroll', checkScroll);
        window.addEventListener('resize', checkScroll);

        return () => {
            container.removeEventListener('scroll', checkScroll);
            window.removeEventListener('resize', checkScroll);
        };
    }, [items, isDesktop, mobileLayout]);

    // Determine if we should use vertical mobile layout
    const useVerticalMobile = !isDesktop && mobileLayout === 'vertical';
    const useHorizontalMobile = !isDesktop && mobileLayout === 'horizontal';

    // Helper function to check if a tab is active
    const isTabActive = (itemHref: string): boolean => {
        // Exact match first
        if (itemHref === currentLocation) return true;

        // Check if both have the same pathname and matching query params
        try {
            const itemUrl = new URL(itemHref, window.location.origin);
            const currentUrl = new URL(currentLocation, window.location.origin);

            // If pathnames match, check the 'tab' query param
            if (itemUrl.pathname === currentUrl.pathname) {
                const itemTab = itemUrl.searchParams.get('tab');
                const currentTab = currentUrl.searchParams.get('tab');

                // Both have tab param - compare them
                if (itemTab && currentTab) {
                    return itemTab === currentTab;
                }

                // Neither has tab param - they match
                if (!itemTab && !currentTab) {
                    return true;
                }
            }
        } catch {
            // Fallback to simple comparison
            return itemHref === currentLocation;
        }

        return false;
    };

    const itemRenderer = (item: TabItem, index: number) => {
        const isActive = isTabActive(item.href);

        return (
            <li
                key={item.href}
                className={`
                    ${useVerticalMobile ? "w-full flex border-b border-border-default" : "flex-shrink-0"}
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
        const activeItem = items.find(item => isTabActive(item.href));

        if (!activeItem) return null;

        return (
            <div>
                <a className="flex flex-row items-center gap-xs" href={backHref}>
                    <div className="flex">
                        <Icon name="caret-left" variant="outline" size="s" color="default" />
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
        ? items.filter(item => !isTabActive(item.href))
        : items;

    return (
        <div className={`${useVerticalMobile ? "" : "relative"}`.trim()}>
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
                    ${useVerticalMobile ? "flex-col gap-0" : "flex-row gap-m overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"}
                `.trim()}>
                {displayItems.map((item, index) => itemRenderer(item, index))}
            </ul>
        </div>
    );
};

export default Tabs;