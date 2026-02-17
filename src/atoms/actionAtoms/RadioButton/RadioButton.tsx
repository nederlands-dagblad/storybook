import React, { InputHTMLAttributes } from 'react';

export type RadioButtonProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
    label: string;
    heading?: string;
    badgeText?: string;
    variant?: 'default' | 'card';
};

export const RadioButton: React.FC<RadioButtonProps> = ({
    label,
    heading,
    badgeText,
    variant = 'default',
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
                relative flex flex-col md:flex-row items-center gap-s p-s border-s
                transition-all duration-200
                ${checked
                    ? 'border-border-brand'
                    : 'border-border-gray-subtle bg-background-default hover:border-border-brand'
                }
                ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                ${className ?? ''}
            `}
        >
            {/* Mobile: radio on top, Desktop: radio on left */}
            <div className="flex-shrink-0">
                {radioCircle}
            </div>

            {/* Content: heading + label stacked, with badge on the right */}
            <div className="flex flex-1 items-start justify-between items-center gap-s">
                <div className="flex flex-col">
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
                    <div className="flex-shrink-0 px-xs py-xxs bg-background-brand text-meta-regular text-text-inverse">
                        {badgeText}
                    </div>
                )}
            </div>
        </label>
    );
};

export default RadioButton;
