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
            >
                <div className="tab-item__content">
                    {isActive && (
                        <span className="tab-item__icon tab-item__icon--left">‹</span>
                    )}
                    <span className="tab-item__text">
                        {label}
                    </span>
                </div>
                {!isActive && (
                    <span className="tab-item__icon tab-item__icon--right">›</span>
                )}
                <div className="tab-item__border-mobile" />
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
        >
            <span className="tab-item__text">
                {label}
            </span>
        </Component>
    );
}

export default TabItem;