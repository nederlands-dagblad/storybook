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
        <div className={`accordion-item ${isOpen ? 'accordion-item--open' : ''}`}>
            <button
                className="accordion-item__button"
                onClick={handleToggle}
                aria-expanded={isOpen}
                aria-controls={`accordion-answer-${id}`}
                type="button"
            >
                <span className={`accordion-item__question ${variant === 'large' ? 'text-heading-2' : 'text-body-bold'}`}>
                    {question}
                </span>
                <span className="accordion-item__icon">
                    <Icon name={isOpen ? 'minus-outline' : 'plus-outline'} />
                </span>
            </button>

            <div
                className={`accordion-item__answer ${isOpen ? 'accordion-item__answer--open' : ''}`}
                id={`accordion-answer-${id}`}
                role="region"
                aria-hidden={!isOpen}
            >
                <p className="accordion-item__content text-body-light">
                    {answer}
                </p>
            </div>
        </div>
    );
}

export default AccordionItem;