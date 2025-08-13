import MenuItem , { MenuItemProps } from "./menuItem";

export interface MenuItemsProps {
    items: Omit<MenuItemProps, 'state'>[];
    activeIndex?: number;
    orientation?: 'horizontal' | 'vertical';
}

export function MenuItems(props: MenuItemsProps) {
    const { items, activeIndex, orientation = 'horizontal' } = props;

    const containerClasses = orientation === 'horizontal'
        ? "menu-items flex flex-row gap-l"
        : "menu-items flex flex-col gap-xs";

    return (
        <nav className={containerClasses}>
            {items.map((item, index) => (
                <MenuItem
                    key={item.href || index}
                    {...item}
                    state={activeIndex === index ? 'active' : 'default'}
                />
            ))}
        </nav>
    );
}

export default MenuItems;