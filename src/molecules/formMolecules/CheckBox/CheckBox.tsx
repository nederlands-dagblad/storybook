import React, { InputHTMLAttributes } from 'react';
import Icon from '@atoms/basicAtoms/Icon/Icon';

export type CheckBoxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
    label: React.ReactNode;
    heading?: string;
    badgeText?: string;
    variant?: 'default' | 'card';
};

export const CheckBox: React.FC<CheckBoxProps> = ({
    label,
    heading,
    badgeText,
    variant = 'default',
    checked,
    disabled,
    className,
    ...restProps
}) => {
    const checkBox = (
        <div className="relative inline-flex items-center justify-center w-s h-s">
            <input
                type="checkbox"
                checked={checked}
                disabled={disabled}
                className={`peer appearance-none w-s h-s border-default border-border-gray checked:border-border-brand checked:bg-background-brand transition-colors ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                {...restProps}
            />
            <span
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-opacity ${checked ? 'opacity-100' : 'opacity-0'}`}
            >
                <Icon name="check" size="s" color="inverse" variant="outline" />
            </span>
        </div>
    );

    if (variant === 'default') {
        return (
            <label
                className={`inline-flex items-start gap-s ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} ${className ?? ''}`}
            >
                <span className="flex-shrink-0 mt-[6px]">{checkBox}</span>
                <span className="text-body-light text-text-default">{label}</span>
            </label>
        );
    }

    return (
        <label
            className={`
                relative flex flex-col md:flex-row items-center gap-s p-s border-s text-center md:text-left
                transition-all duration-200
                ${checked
                    ? 'border-border-brand bg-background-brand-subtle'
                    : 'border-border-gray-subtle bg-background-default hover:border-border-brand'
                }
                ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                ${className ?? ''}
            `}
        >
            {checkBox}

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

            {badgeText && (
                <div className="px-xs py-xxs bg-background-brand text-meta-regular text-text-inverse">
                    {badgeText}
                </div>
            )}
        </label>
    );
};

export default CheckBox;
