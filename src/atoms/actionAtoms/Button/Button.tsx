import React, {ButtonHTMLAttributes, AnchorHTMLAttributes, useState} from 'react';
import Icon, {IconColor} from "@atoms/basicAtoms/Icon/Icon.tsx";

// Base props die beide varianten delen
type BaseButtonProps = {
    variant?: 'primary' | 'secondary' | 'ghost' | 'dark' | 'pill';
    iconLeft?: string | null;
    iconRight?: string | null;
    iconLeftVariant?: 'outline' | 'fill';
    iconRightVariant?: 'outline' | 'fill';
    iconOnly?: boolean;
    label?: string | React.ReactNode; // For accessibility when iconOnly is true
    isActive?: boolean; // For controlled component
    onToggle?: (isActive: boolean) => void; // Callback when toggled
}

// Button als <button> element (zonder href)
type ButtonAsButton = BaseButtonProps &
    ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
};

// Button als <a> element (met href)
type ButtonAsLink = BaseButtonProps &
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'onClick'> & {
    href: string;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

// Simple utility function to combine classes
function cn(...classes: (string | boolean | undefined | null)[]) {
    return classes.filter(Boolean).join(' ');
}

export const Button: React.FC<ButtonProps> = (props) => {
    const {
        variant = 'primary',
        iconLeft = null,
        iconRight = null,
        iconLeftVariant = 'outline',
        iconRightVariant = 'outline',
        iconOnly = false,
        children,
        label,
        className,
        isActive: controlledIsActive,
        onToggle,
        ...restProps
    } = props;

    // Set default icons based on variant
    const defaultIconLeft = iconLeft ?? (variant === 'primary' ? 'square' : null);

    const content = label ?? children;

    // Internal state for uncontrolled component
    const [internalIsActive, setInternalIsActive] = useState(false);

    // Use controlled state if provided, otherwise use internal state
    const isActive = controlledIsActive !== undefined ? controlledIsActive : internalIsActive;

    // Map of variant styles
    const variantStyles = {
        primary: 'px-xs py-xs gap-x-xxs text-meta-bold bg-background-brand text-text-inverse hover:bg-background-brand-subtle disabled:bg-background-disabled group',

        secondary: 'px-xs py-xs gap-x-xs text-meta-regular bg-background-default text-text-brand border-s border-border-brand hover:bg-background-brand-subtlest disabled:text-text-disabled disabled:border-border-disabled disabled:hover:bg-background-default',

        ghost: 'px-xs py-xs gap-x-xs text-meta-bold text-text-brand hover:text-text-brand-subtle disabled:text-text-disabled',

        dark: 'px-xs py-xs gap-x-xxs text-meta-bold bg-background-dark text-text-inverse hover:bg-background-dark-subtle disabled:bg-background-disabled',

        pill: 'px-s py-xs gap-x-xs text-meta-regular bg-background-default text-text-subtle border-s border-accent-gray-subtle rounded-pill hover:bg-background-accent-gray-subtle hover:border-accent-gray-subtle active:bg-background-accent-gray-subtle active:border-accent-gray disabled:hover:bg-background-default disabled:hover:border-accent-gray-subtle',
    };

    // Determine icon color based on variant
    const iconColorMap: Record<typeof variant, IconColor> = {
        primary: 'inverse',
        secondary: 'brand',
        ghost: 'brand',
        dark: 'inverse',
        pill: 'gray',
    };

    const disabled = 'disabled' in restProps ? restProps.disabled : false;
    const iconColor = disabled && variant === 'secondary' ? 'gray' : iconColorMap[variant];

    // Determine icon variant based on active state for pill buttons
    const getLeftIconVariant = () => {
        if (variant === 'pill' && isActive) {
            return 'fill';
        }
        return iconLeftVariant;
    };

    // Check if right icon is a caret
    const isCaretIcon = iconRight === 'caret-down' || iconRight === 'caret-up';

    // Check if it's a square icon for primary buttons
    const isSquareIconLeft = defaultIconLeft === 'square';

    const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        // For pill variant, toggle active state
        if (variant === 'pill') {
            const newActiveState = !isActive;
            if (controlledIsActive === undefined) {
                setInternalIsActive(newActiveState);
            }
            onToggle?.(newActiveState);
        }

        // Call the original onClick handler
        if ('onClick' in restProps && restProps.onClick) {
            restProps.onClick(e as any);
        }
    };

    const buttonClasses = cn(
        // Base styles for all buttons
        'inline-flex items-center transition-colors',
        // Padding
        iconOnly && '!p-xs',
        // Variant specific styles
        variantStyles[variant],
        // Active state for pill
        variant === 'pill' && isActive && 'border-accent-gray',
        // Disabled state
        disabled && 'cursor-not-allowed',
        // Custom classes passed via props
        className
    );

    const buttonContent = (
        <>
            {defaultIconLeft && (
                <span
                    className={cn(
                        'inline-flex transition-transform duration-300',
                        variant === 'primary' && isSquareIconLeft && !disabled && 'group-hover:rotate-90'
                    )}
                >
                    <Icon name={defaultIconLeft} size='s' color={iconColor} variant={getLeftIconVariant()}/>
                </span>
            )}
            {!iconOnly && content}
            {iconRight && (
                <span
                    className={cn(
                        'inline-flex transition-transform duration-300',
                        variant === 'pill' && isCaretIcon && isActive && 'rotate-180'
                    )}
                >
                    <Icon name={iconRight} size='s' color={iconColor} variant={iconRightVariant}/>
                </span>
            )}
        </>
    );

    // Render as link if href is provided
    if ('href' in restProps && restProps.href) {
        const {href, ...anchorProps} = restProps;
        return (
            <a
                href={href}
                className={buttonClasses}
                onClick={handleClick}
                aria-label={iconOnly ? String(content) : undefined}
                {...anchorProps}
            >
                {buttonContent}
            </a>
        );
    }

    // Render as button
    const {onClick, ...buttonProps} = restProps as ButtonHTMLAttributes<HTMLButtonElement>;
    return (
        <button
            className={buttonClasses}
            disabled={disabled}
            onClick={handleClick}
            aria-label={iconOnly ? String(content) : undefined}
            aria-pressed={variant === 'pill' ? isActive : undefined}
            {...buttonProps}
        >
            {buttonContent}
        </button>
    );
};

export default Button;