import { useState } from 'react';
import TabItem, { TabItemProps } from './tabItem';

export interface TabsProps {
    tabs: Array<{
        label: string;
        href?: string;
        id?: string;
    }>;
    activeIndex?: number;
    defaultActiveIndex?: number;
    onTabChange?: (index: number) => void;
    activeTabId?: string;
    device?: 'desktop' | 'mobile';
}

export function Tabs(props: TabsProps) {
    const {
        tabs,
        activeIndex: controlledActiveIndex,
        defaultActiveIndex = 0,
        onTabChange,
        activeTabId,
        device = 'desktop'
    } = props;

    const [internalActiveIndex, setInternalActiveIndex] = useState(defaultActiveIndex);

    // Determine active index based on activeTabId if provided
    const getActiveIndex = () => {
        if (activeTabId) {
            const index = tabs.findIndex(tab => tab.id === activeTabId);
            return index >= 0 ? index : 0;
        }
        return controlledActiveIndex !== undefined
            ? controlledActiveIndex
            : internalActiveIndex;
    };

    const activeIndex = getActiveIndex();

    const handleTabClick = (index: number) => {
        // Only handle click if no href (for client-side navigation)
        if (!tabs[index].href) {
            if (controlledActiveIndex === undefined) {
                setInternalActiveIndex(index);
            }
            onTabChange?.(index);
        }
    };

    return (
        <div className={`tabs tabs--${device || 'desktop'}`} role="tablist">
            {tabs.map((tab, index) => (
                <TabItem
                    key={tab.id || index}
                    label={tab.label}
                    href={tab.href}
                    isActive={activeIndex === index}
                    onClick={() => handleTabClick(index)}
                    device={device}
                />
            ))}
        </div>
    );
}

export default Tabs;