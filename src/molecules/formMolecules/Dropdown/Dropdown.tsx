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
}

const DropdownPanel: React.FC<{
    options: DropdownOption[];
    value?: string;
    onSelect: (value: string) => void;
}> = ({ options, value, onSelect }) => (
    <ul className="absolute left-0 w-full bg-background-default border-s border-border-gray-subtle shadow-s z-10 mt-xxs" style={{ top: '100%' }}>
        {options.map((option) => {
            const isSelected = option.value === value;
            return (
                <li key={option.value}>
                    <button
                        onClick={() => onSelect(option.value)}
                        className={`w-full text-left px-xs py-xs hover:bg-background-gray-subtle transition-colors ${
                            isSelected
                                ? 'text-meta-regular text-text-default !underline !decoration-border-brand underline-offset-4'
                                : 'text-meta-light text-text-default'
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
                    <DropdownPanel options={options} value={value} onSelect={handleSelect} />
                )}
            </div>
        );
    }

    // select variant
    return (
        <div ref={wrapperRef} className={`relative flex flex-col gap-xxs ${className}`}>
            {label && (
                <span className="text-meta-bold text-text-default">{label}</span>
            )}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-between gap-xs px-xs py-xs bg-background-default border-s text-body-light text-text-default transition-colors ${
                    isOpen ? 'border-border-brand' : 'border-border-gray-subtle hover:border-border-gray'
                }`}
            >
                <span className={selectedOption ? 'text-text-default' : 'text-text-gray'}>
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
        </div>
    );
};

export default Dropdown;
