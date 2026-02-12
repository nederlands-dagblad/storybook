import React, { InputHTMLAttributes } from 'react';

export type RadioButtonProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
    label: string;
};

export const RadioButton: React.FC<RadioButtonProps> = ({
    label,
    checked,
    disabled,
    className,
    ...restProps
}) => {
    return (
        <label
            className={`inline-flex items-center gap-xs cursor-pointer ${disabled ? 'cursor-not-allowed opacity-50' : ''} ${className ?? ''}`}
        >
            <span className="relative inline-flex items-center justify-center w-5 h-5">
                <input
                    type="radio"
                    checked={checked}
                    disabled={disabled}
                    className="peer appearance-none w-5 h-5 rounded-full border-2 border-border-gray checked:border-border-brand cursor-pointer disabled:cursor-not-allowed"
                    {...restProps}
                />
                <span
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-background-brand opacity-0 peer-checked:opacity-100 pointer-events-none"
                />
            </span>
            <span className="text-body-regular text-text-default">{label}</span>
        </label>
    );
};

export default RadioButton;
