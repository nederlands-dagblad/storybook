import React, { InputHTMLAttributes } from 'react';
import Badge from '../../../atoms/displayAtoms/Badge/Badge';

export type RadioButtonProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
    label?: string;
    heading?: string;
    badgeText?: string;
    logoUrl?: string;
    priceLabel?: string;
    variant?: 'default' | 'card';
    layout?: 'responsive' | 'horizontal';
};

export const RadioButton: React.FC<RadioButtonProps> = ({
    label = '',
    heading,
    badgeText,
    logoUrl,
    priceLabel,
    variant = 'default',
    layout = 'responsive',
    checked,
    disabled,
    className,
    ...restProps
}) => {
    // Radio circle element (shared between variants)
    const radioCircle = (
        <div className="relative flex-shrink-0 inline-flex items-center justify-center w-5 h-5">
            <input
                type="radio"
                checked={checked}
                disabled={disabled}
                className={`peer appearance-none w-5 h-5 rounded-full border-default border-border-gray checked:border-border-brand transition-colors ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                {...restProps}
            />
            <span
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-background-brand pointer-events-none transition-opacity ${checked ? 'opacity-100' : 'opacity-0'}`}
            />
        </div>
    );

    // Default variant: simple radio with label
    if (variant === 'default') {
        return (
            <label
                className={`inline-flex items-center gap-x-s ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} ${className ?? ''}`}
            >
                {radioCircle}
                <span className="text-body-regular text-text-default">{label}</span>
            </label>
        );
    }

    // Card variant: bordered card with heading, label, and optional badge
    return (
        <label
            className={`
                relative flex items-center gap-s p-s border-s transition-all duration-200
                ${layout === 'horizontal' ? 'flex-row text-left' : 'flex-col md:flex-row text-center md:text-left'}
                ${checked
                    ? 'border-border-brand bg-background-brand-subtle'
                    : 'border-border-gray-subtle bg-background-default hover:border-border-brand'
                }
                ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                ${className ?? ''}
            `}
        >
            {radioCircle}

            {/* Content: heading + label stacked */}
            <div className="flex flex-col md:flex-1">
                {heading && (
                    <div className="text-body-bold text-text-default">
                        {heading}
                    </div>
                )}
                <div className="text-meta-light text-text-default">
                    {label}
                </div>
            </div>

            {/* Badge */}
            {badgeText && (
                <div className="px-xs py-xxs bg-background-brand text-meta-regular text-text-inverse">
                    {badgeText}
                </div>
            )}

            {/* Price */}
            {priceLabel && (
                <Badge variant="default" label={priceLabel} className="flex-shrink-0" />
            )}

            {/* Logo */}
            {logoUrl && (
                <img src={logoUrl} alt="" className="h-8 w-auto flex-shrink-0" />
            )}
        </label>
    );
};

export default RadioButton;
