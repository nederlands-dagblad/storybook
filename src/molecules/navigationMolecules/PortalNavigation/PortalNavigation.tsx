import React from "react";
import Icon from "@atoms/basicAtoms/Icon/Icon";

export interface PortalNavigationItem {
  href: string
  label: string
}

export interface PortalNavigationProps {
  items: PortalNavigationItem[];
  active?: boolean;
  backHref?: string;
  currentLocation?: string; // Add this prop for Storybook testing
}

export const PortalNavigation: React.FC<PortalNavigationProps> = (props) => {

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

  const itemRenderer = (item: PortalNavigationItem) => {
    const isActive = item.href === currentLocation;

    return (
      <li key={item.href}>
        <a href={item.href} className={ isActive ? 'is-active' : ''}>
          {item.label}
          <Icon name="caret-right-outline" />
        </a>
      </li>
    );
  };

  // Mobile view with active item
  if (isMobile && active) {
    const activeItem = items.find(item => item.href === currentLocation);

    if (!activeItem) return null;

    return (
      <div className="portal-nav-mobile">
        <a className="portal-nav-mobile-header" href={backHref}>
          <div className="portal-nav-mobile--back">
            <Icon name="caret-left-outline" />
          </div>
          <span className="portal-nav-mobile--title">
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
      <ul className="portal-nav portal-nav-mobile">
        {filteredItems.map(itemRenderer)}
      </ul>
    );
  }

  return (
    <ul className="portal-nav">
      {items.map(itemRenderer)}
    </ul>
  );
}

export default PortalNavigation;
