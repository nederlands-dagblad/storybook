import React from "react";

type Padding = 'none' | 'xs' | 's' | 'm' | 'l' | 'xl';
type BorderColor = 'default' | 'brand' | 'accent-gray' | 'accent-gray-subtle' | 'disabled' | 'warning';
type BackgroundVariant = 'transparent' | 'accent-gray';

export interface CardContainerProps {
    children: React.ReactNode;
    padding?: Padding;
    borderColor?: BorderColor | 'none';
    background?: BackgroundVariant;
    className?: string;
}

const paddingMap: Record<Padding, string> = {
    none: 'p-none',
    xs: 'p-xs',
    s: 'p-s',
    m: 'p-m',
    l: 'p-l',
    xl: 'p-xl',
};

const borderColorMap: Record<BorderColor, string> = {
    default: 'border-border-default',
    brand: 'border-border-brand',
    'accent-gray': 'border-border-accent-gray',
    'accent-gray-subtle': 'border-border-accent-gray-subtle',
    disabled: 'border-border-disabled',
    warning: 'border-border-warning',
};

const backgroundMap: Record<BackgroundVariant, string> = {
    transparent: 'bg-transparent',
    'accent-gray': 'bg-background-accent-gray',
};

export const CardContainer: React.FC<CardContainerProps> = ({
                                                                children,
                                                                padding = 's',
                                                                borderColor = 'accent-gray',
                                                                background = 'transparent',
                                                                className = '',
                                                            }) => {
    const paddingClass = paddingMap[padding];
    const backgroundClass = backgroundMap[background];

    // If background is accent-gray, no border
    const hasBorder = background === 'transparent' && borderColor !== 'none';
    const borderClass = hasBorder ? `border border-width-s ${borderColorMap[borderColor as BorderColor]}` : '';

    return (
        <div className={`w-full ${paddingClass} ${backgroundClass} ${borderClass} ${className}`.trim()}>
            {children}
        </div>
    );
};

export default CardContainer;