export interface MenuItemProps {
    text: string;
    href?: string;
    state?: 'default' | 'hover' | 'active';
    onClick?: () => void;
}

export function MenuItem(props: MenuItemProps) {
    const { text, href, state = 'default', onClick } = props;

    const baseClasses = "menu-item flex flex-col justify-center cursor-pointer transition-all duration-200";

    // Using your text utility class from tokens.utilities.js
    // This applies the menu-menu-primary typography with small-caps
    const textClasses = "text-menu-menu-primary";

    const Component = href ? 'a' : 'button';

    return (
        <Component
            className={`${baseClasses} ${state}`}
            href={href}
            onClick={onClick}
            data-state={state}
        >
            <span className={textClasses}>
                {text}
            </span>
            <div className="menu-item__underline" />
        </Component>
    );
}

export default MenuItem;