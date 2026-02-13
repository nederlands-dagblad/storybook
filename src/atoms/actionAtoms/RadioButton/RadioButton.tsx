import React, { InputHTMLAttributes } from 'react';

export type RadioButtonProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
    label: string;
    heading?: string;
    badgeText?: string;
};

export const RadioButton: React.FC<RadioButtonProps> = ({
                                                            label,
                                                            heading,
                                                            badgeText,
                                                            checked,
                                                            disabled,
                                                            className,
                                                            ...restProps
                                                        }) => {
    return (
        <label
            className={`
                relative flex items-center gap-x-s p-4 border-[1px] cursor-pointer space-xs
                transition-all duration-200
                ${checked
                ? 'border-border-brand'
                : 'border-border-gray-subtle bg-background-default hover:border-icons-brand'
            }
                ${disabled ? 'cursor-not-allowed opacity-50' : ''}
                ${className ?? ''}
            `}
        >
            {/* Radio Button Circle */}
            <div className="relative flex-shrink-0 inline-flex items-center justify-center w-6 h-6">
                <input
                    type="radio"
                    checked={checked}
                    disabled={disabled}
                    className={` peer appearance-none w-6 h-6 rounded-full border-icons-brand border-[1px]  checked:border-border-brand cursor-pointer disabled:cursor-not-allowed transition-colors`}
                    {...restProps}
                />
                <span
                    className={`${checked ? 'bg-blue-400 border-border-brand opacity-100' : ''} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-background-brand opacity-0 pointer-events-none transition-opacity`}
                />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                {heading && (
                    <div className="text-body-bold text-si mb-1">
                        {heading}
                    </div>
                )}
                <div className="font-fira-sans text-meta-light">
                    {label}
                </div>
            </div>

            {/* Optional Badge */}
            {badgeText && (
                <div className="flex-shrink-0 w-7 h-7 flex items-center justify-center px-3 bg-background-brand text-text-inverse size-m font-fira-sans gap-10">
                    {badgeText}
                </div>
            )}
        </label>
    );
};

export default RadioButton;