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
}

export const Tabs: React.FC<TabsProps> = (props) => {
    const { items, active, backHref } = props;

    const currentLocation = props.currentLocation || window.location.pathname;

    const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

    React.useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const itemRenderer = (item: TabItem) => {
        const isActive = item.href === currentLocation;

        return (
            <li key={item.href} className={isMobile ? "w-full flex border-b border-s border-border-default" : ""}>
                <a
                    href={item.href}
                    className={`no-underline hover:underline ${
                        isMobile
                            ? "flex flex-row justify-between items-center w-full py-s"
                            : ""
                    } ${
                        isActive
                            ? "text-menu-menu-tab-item-active underline underline-offset-[0.3rem] decoration-[0.05rem]"
                            : "text-menu-menu-tab-item text-text-default"
                    }`}
                >
                    {item.label}
                    <span className={isMobile ? "flex" : "hidden"}>
            <Icon name="caret-right" variant="outline" size="s" color={isActive ? "brand" : "default"} />
          </span>
                </a>
            </li>
        );
    };

    // Mobile view with active item
    if (isMobile && active) {
        const activeItem = items.find(item => item.href === currentLocation);

        if (!activeItem) return null;

        return (
            <div>
                <a className="flex flex-row items-center gap-xs" href={backHref}>
                    <div className="flex">
                        <Icon name="caret-left" variant="outline" size="m" color="default" />
                    </div>
                    <span className="text-menu-menu-tab-item-active text-text-brand underline underline-offset-[0.3rem] decoration-[0.05rem]">
            {activeItem.label}
          </span>
                </a>
            </div>
        );
    }

    // Remove active item from `items` on mobile
    if (isMobile) {
        const filteredItems = items.filter(item => item.href !== currentLocation);

        return (
            <ul className="flex flex-col gap-0">
                {filteredItems.map((item, index) => (
                    <li key={item.href} className="w-full flex border-b border-s border-border-default">
                        <a
                            href={item.href}
                            className={`no-underline hover:underline text-menu-menu-tab-item text-text-default flex flex-row justify-between items-center w-full py-s ${
                                index === 0 ? "pt-0" : ""
                            }`}
                        >
                            {item.label}
                            <span className="flex">
                <Icon name="caret-right" variant="outline" size="s" color="default" />
              </span>
                        </a>
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <ul className="flex flex-row gap-l">
            {items.map(itemRenderer)}
        </ul>
    );
};

export default Tabs;