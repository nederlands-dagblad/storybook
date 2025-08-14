export interface TabItemProps {
    label: string;
    isActive?: boolean;
    onClick?: () => void;
    href?: string;
    device?: 'desktop' | 'mobile';
}

export function TabItem(props: TabItemProps) {
    const { label, isActive = false, onClick, href, device = 'desktop' } = props;

    // Use anchor tag if href is provided, otherwise button
    const Component = href ? 'a' : 'button';

    // Mobile layout
    if (device === 'mobile') {
        return (
            <Component
                type={href ? undefined : 'button'}
                className={`tab-item tab-item--mobile ${isActive ? 'active' : ''}`}
                onClick={onClick}
                href={href}
                data-active={isActive}
                role="tab"
                aria-selected={isActive}
            >
                <div className="tab-item__content gap-xs">
                    {isActive && (
                        <span className="tab-item__icon tab-item__icon--left">
                            <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 11L1 6.00002L6 1" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </span>
                    )}
                    <span className="tab-item__text text-menu-menu-tab-item">
                        {label}
                    </span>
                </div>
                {!isActive && (
                    <span className="tab-item__icon tab-item__icon--right">
                        <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L6 5.99998L1 11" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </span>
                )}
            </Component>
        );
    }

    // Desktop layout
    return (
        <Component
            type={href ? undefined : 'button'}
            className={`tab-item tab-item--desktop ${isActive ? 'active' : ''}`}
            onClick={onClick}
            href={href}
            data-active={isActive}
            role="tab"
            aria-selected={isActive}
        >
            <span className={`tab-item__text ${isActive ? 'text-menu-menu-tab-item-active' : 'text-menu-menu-tab-item'}`}>
                {label}
            </span>
        </Component>
    );
}

export default TabItem;