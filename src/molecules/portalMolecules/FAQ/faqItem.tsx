import { useState } from 'react';
import { Icon } from "@atoms/basicAtoms/Icon/Icon";

export interface FaqItemProps {
    question: string
    answer: string
    id?: string
}

export function FaqItem(props: FaqItemProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="faq-item">
            <button
                className="faq-item-question"
                onClick={toggleAccordion}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${props.id}`}
                tabIndex={0}
            >
                <h3>{props.question}</h3>
                <div className="faq-item-icon">
                    <Icon name={isOpen ? "minus" : "plus"} />
                </div>
            </button>

            {isOpen && (
                <div
                    className="faq-item-answer"
                    id={`faq-answer-${props.id}`}
                    role="region"
                    aria-labelledby={`faq-question-${props.id}`}
                >
                    <p dangerouslySetInnerHTML={{ __html: props.answer }} />
                </div>
            )}
        </div>
    );
}

export default FaqItem;