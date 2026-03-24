import React, { useState, useEffect } from 'react';
import { Icon } from "@atoms/basicAtoms/Icon/Icon";

export interface AccordionItemProps {
    label: string;
    subLabel?: React.ReactNode;
    content: React.ReactNode;
    id?: string;
    isOpen?: boolean;
    onToggle?: () => void;
}

export  function AccordionItem({
    label,
    subLabel,
    content,
    id,
    isOpen: controlledIsOpen,
    onToggle,
    variant = 'default'
}: AccordionItemProps & { variant?: 'default' | 'large' }) {
    const [internalIsOpen, setInternalIsOpen] = useState(false);
    const [overflowVisible, setOverflowVisible] = useState(false);

    const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

    useEffect(() => {
        if (!isOpen) setOverflowVisible(false);
    }, [isOpen]);

    const handleToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (onToggle) {
            onToggle();
        } else {
            setInternalIsOpen(!internalIsOpen);
        }
    };

    return (
        <div className={`
            w-full block border-default
            transition-[border-color,background-color] duration-200 ease-in-out
            ${isOpen
                ? `border-border-brand ${variant === 'large' ? 'bg-background-default' : 'bg-background-brand-subtle'}`
                : 'border-border-gray bg-background-default hover:border-border-brand has-[button:focus-visible]:border-border-brand'
            }
        `}>
            <button
                className={`group w-full border-0 bg-transparent cursor-pointer flex justify-between items-center text-left outline-none ${variant === 'large' ? 'p-s md:p-m' : 'px-s py-xs'}`}
                onClick={handleToggle}
                aria-expanded={isOpen}
                aria-controls={`accordion-answer-${id}`}
                type="button"
            >
                <span className="flex-1 flex flex-col">
                    <span className={`block text-text-default ${variant === 'large' ? 'text-heading-2' : 'text-body-bold'}`}>
                        {label}
                    </span>
                    {subLabel && (
                        <span className="text-meta-light text-text-default italic">{subLabel}</span>
                    )}
                </span>
                <span className={`flex items-center justify-center flex-shrink-0 transition-transform duration-200 ease-in-out ${isOpen ? 'rotate-180' : ''}`}>
                    <Icon name="caret-down" />
                </span>
            </button>

            <div
                className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                id={`accordion-answer-${id}`}
                role="region"
                aria-hidden={!isOpen}
                onTransitionEnd={() => { if (isOpen) setOverflowVisible(true); }}
            >
                <div className={`${overflowVisible ? 'overflow-visible' : 'overflow-hidden'} min-h-0`}>
                    {variant === 'large' && isOpen && (
                        <hr className="border-t border-border-gray-subtle mx-m" />
                    )}
                    <div className={variant === 'large' ? 'p-m' : 'p-s'}>
                        {content}
                    </div>
                </div>
            </div>
        </div>
    );
}

export interface AccordionProps {
    items: AccordionItemProps[];
    title?: string;
    allowMultiple?: boolean;
    variant?: 'default' | 'large';
    className?: string;
}

export function Accordion({
    items,
    title,
    allowMultiple = false,
    variant = 'default',
    className = ''
}: AccordionProps) {
    const [openItems, setOpenItems] = useState<Set<number>>(new Set());

    const handleToggle = (index: number) => {
        const newOpenItems = new Set(openItems);

        if (newOpenItems.has(index)) {
            newOpenItems.delete(index);
        } else {
            if (!allowMultiple) {
                newOpenItems.clear();
            }
            newOpenItems.add(index);
        }

        setOpenItems(newOpenItems);
    };

    return (
        <div className={`flex flex-col w-full ${className}`}>
            {title && (
                <h2 className="text-heading-2 text-text-default mb-m">
                    {title}
                </h2>
            )}
            <div className="flex flex-col">
                {items.map((item, index) => (
                    <div
                        key={item.id || `accordion-${index}`}
                        className={index > 0 ? 'mt-s' : undefined}
                    >
                        <AccordionItem
                            {...item}
                            id={item.id || `accordion-${index}`}
                            isOpen={openItems.has(index)}
                            onToggle={() => handleToggle(index)}
                            variant={variant}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Accordion;
