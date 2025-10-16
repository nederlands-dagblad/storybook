import React, {ButtonHTMLAttributes} from 'react';
import Icon from "@atoms/basicAtoms/Icon/Icon.tsx";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'dark' | 'pill';
    iconLeft?: string | null;
    iconRight?: string | null;
    iconLeftVariant?: 'outline' | 'fill';
    iconRightVariant?: 'outline' | 'fill'; 
    iconOnly?: boolean;
    label?: string | React.ReactNode; // For accessibility when iconOnly is true
}

// Simple utility function to combine classes
function cn(...classes: (string | boolean | undefined | null)[]) {
    return classes.filter(Boolean).join(' ');
}

export const Button: React.FC<ButtonProps> = ({
                                                  variant = 'primary',
                                                  iconLeft = null,
                                                  iconRight = null,
                                                  iconLeftVariant = 'outline',
                                                  iconRightVariant = 'outline',
                                                  iconOnly = false,
                                                  disabled = false,
                                                  children, 
                                                  label,
                                                  className,
                                                  onClick,
                                                  ...props
                                              }) => {
    
    const content = label??children;
    
    // Map of variant styles
    const variantStyles = {
        primary: 'px-xs py-xs gap-x-xxs text-meta-bold bg-background-brand text-text-inverse hover:bg-background-brand-subtle disabled:bg-background-disabled',

        secondary: 'px-xs py-xs gap-x-xs text-meta-regular bg-background-default text-text-brand border-s border-border-brand hover:bg-background-brand-subtlest disabled:text-text-disabled disabled:border-border-disabled',

        ghost: 'px-xs py-xs gap-x-xs text-meta-bold text-text-brand hover:text-text-brand-subtle disabled:text-text-disabled',

        dark: 'px-xs py-xs gap-x-xxs text-meta-bold bg-background-dark text-text-inverse hover:bg-background-dark-subtle disabled:bg-background-disabled',

        pill: 'px-s py-xs gap-x-xs text-meta-regular bg-background-default text-text-subtle border-s border-accent-gray-subtle rounded-pill hover:bg-background-accent-gray-subtle hover:border-accent-gray-subtle active:bg-background-accent-gray-subtle active:border-accent-gray',
    };

    // Map button variants to icon colors
    const iconColorMap: Record<typeof variant, IconProps['color']> = {
        primary: 'inverse',
        secondary: 'brand',
        ghost: 'brand',
        dark: 'inverse',
        pill: 'gray',
    };

    const iconColor = iconColorMap[variant];

    return (
        <button
            className={cn(
                // Base styles for all buttons
                'inline-flex items-center transition-colors',
                // Padding
                iconOnly && '!p-xs',
                // Variant specific styles
                variantStyles[variant],
                // Disabled state
                disabled && 'cursor-not-allowed',
                // Custom classes passed via props
                className
            )}
            disabled={disabled}
            onClick={onClick}
            aria-label={iconOnly ? String(content) : undefined}
            {...props}
        >
            {iconLeft && <Icon name={iconLeft} size='s' color={iconColor} variant = {iconLeftVariant}/>}
            {!iconOnly && content}
            {iconRight && <Icon name={iconRight} size='s' color={iconColor} variant={iconRightVariant}/>}
        </button>
    );
};

export default Button;