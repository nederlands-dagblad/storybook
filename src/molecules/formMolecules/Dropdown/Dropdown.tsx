import React, { useState, useRef, useEffect } from 'react';
import Button from '@atoms/actionAtoms/Button/Button';
import Icon from '@atoms/basicAtoms/Icon/Icon';

export type DropdownVariant = 'pill' | 'select';

export interface DropdownOption {
    label: string;
    value: string;
}

export interface DropdownProps {
    variant?: DropdownVariant;
    options: DropdownOption[];
    value?: string;
    onChange?: (value: string) => void;
    isOpen?: boolean;
    onOpenChange?: (isOpen: boolean) => void;
    label?: string;
    placeholder?: string;
    className?: string;
    errors?: string[] | null;
}

const DropdownPanel: React.FC<{
    options: DropdownOption[];
    value?: string;
    onSelect: (value: string) => void;
    variant?: DropdownVariant;
}> = ({ options, value, onSelect, variant = 'select' }) => (
    <ul className="absolute left-0 w-full bg-background-default border-s border-border-gray-subtle shadow-s z-10 mt-xxs max-h-[225px] overflow-y-auto" style={{ top: '100%' }}>
        {options.map((option) => {
            const isSelected = option.value === value;
            return (
                <li key={option.value}>
                    <button
                        onClick={() => onSelect(option.value)}
                        className={`w-full text-left px-xs py-xs hover:bg-background-gray-subtle transition-colors ${
                            isSelected
                                ? `${variant === 'select' ? 'text-body-regular' : 'text-meta-regular'} text-text-default !underline !decoration-border-brand underline-offset-4`
                                : `${variant === 'select' ? 'text-body-light' : 'text-meta-light'} text-text-default`
                        }`}
                    >
                        {option.label}
                    </button>
                </li>
            );
        })}
    </ul>
);

export const Dropdown: React.FC<DropdownProps> = ({
    variant = 'select',
    options,
    value,
    onChange,
    isOpen: controlledIsOpen,
    onOpenChange,
    label,
    placeholder = 'Selecteer...',
    className = '',
    errors,
}) => {
    const [internalIsOpen, setInternalIsOpen] = useState(false);
    const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
    const wrapperRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find((o) => o.value === value);

    const setIsOpen = (val: boolean) => {
        if (controlledIsOpen === undefined) setInternalIsOpen(val);
        onOpenChange?.(val);
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (val: string) => {
        onChange?.(val);
        setIsOpen(false);
    };

    if (variant === 'pill') {
        return (
            <div ref={wrapperRef} className={`relative inline-flex ${className}`}>
                <Button
                    variant="pill"
                    label={selectedOption?.label ?? label ?? placeholder}
                    iconLeft="arrows-down-up"
                    iconRight="caret-down"
                    isActive={isOpen}
                    onToggle={(active) => setIsOpen(active)}
                />
                {isOpen && (
                    <DropdownPanel options={options} value={value} onSelect={handleSelect} variant="pill" />
                )}
            </div>
        );
    }

    // select variant
    return (
        <div ref={wrapperRef} className={`relative w-full flex flex-col gap-xxs ${className}`}>
            {label && (
                <label className="text-body-light">{label}</label>
            )}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between gap-xs px-3 py-2 bg-background-default border text-body-light text-text-default focus:outline-none transition-colors ${
                    isOpen ? 'border-border-brand' : errors?.length ? 'border-border-warning' : 'border-border-gray'
                }`}
            >
                <span className={selectedOption ? 'text-body-regular text-text-default' : 'text-body-regular text-black/[0.54]'}>
                    {selectedOption?.label ?? placeholder}
                </span>
                <Icon
                    name="caret-down"
                    size="s"
                    color="gray"
                    className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>
            {isOpen && (
                <DropdownPanel options={options} value={value} onSelect={handleSelect} />
            )}
            {errors && errors.map((error, i) => (
                <span key={i} className="text-text-warning text-meta-regular">{error}</span>
            ))}
        </div>
    );
};

export default Dropdown;
