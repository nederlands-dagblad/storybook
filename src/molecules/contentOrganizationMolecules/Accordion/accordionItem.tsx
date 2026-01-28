import { useState } from 'react';
import { Icon } from "@atoms/basicAtoms/Icon/Icon";

export interface AccordionItemProps {
    question: string;
    answer: string;
    id?: string;
    isOpen?: boolean;
    onToggle?: () => void;
    variant?: 'default' | 'large';
}
export function AccordionItem({
                                  question,
                                  answer,
                                  id,
                                  isOpen: controlledIsOpen,
                                  onToggle,
                                  variant = 'default'
                              }: AccordionItemProps) {
    const [internalIsOpen, setInternalIsOpen] = useState(false);

    // Use controlled state if provided, otherwise use internal state
    const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

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
            accordion-item 
            ${isOpen ? 'accordion-item--open' : ''}
            w-full block
            border-border-gray bg-background-default
            transition-[border-color] duration-200 ease-in-out
            ${isOpen ? 'border-border-brand' : 'border-border-gray'}
            border-[length:var(--border-width-s)]
        `}>
            <button
                className={`
                    accordion-item__button
                    w-full border-0 bg-transparent cursor-pointer
                    flex justify-between items-center text-left
                    px-s py-xs
                    outline-none
                    hover:underline-offset-[25%]
                    ${isOpen ? '' : 'focus-visible:border-border-brand'}
                `}
                onClick={handleToggle}
                aria-expanded={isOpen}
                aria-controls={`accordion-answer-${id}`}
                type="button"
            >
                <span className={`
                    accordion-item__question 
                    flex-1 block
                    ${variant === 'large' ? 'text-heading-2' : 'text-body-bold'}
                    hover:underline
                `}>
                    {question}
                </span>
                <span className={`
                    accordion-item__icon
                    w-5 h-5 flex items-center justify-center flex-shrink-0 block
                    transition-transform duration-200 ease-in-out
                    ${isOpen ? 'rotate-180' : ''}
                `}>
                    <Icon name={isOpen ? 'minus-outline' : 'plus-outline'} />
                </span>
            </button>

            <div
                className={`
                    accordion-item__answer 
                    w-full block
                    overflow-hidden
                    transition-[max-height,opacity,transform,padding] duration-300 ease-in-out
                    ${isOpen
                    ? 'accordion-item__answer--open max-h-[500px] opacity-100 translate-y-0 px-s pt-xs pb-xs'
                    : 'max-h-0 opacity-0 -translate-y-2.5 px-s py-0'
                }
                `}
                id={`accordion-answer-${id}`}
                role="region"
                aria-hidden={!isOpen}
            >
                <p className="accordion-item__content text-body-light m-0 block mt-xs">
                    {answer}
                </p>
            </div>
        </div>
    );
}

export default AccordionItem;