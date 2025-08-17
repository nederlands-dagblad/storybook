import { useState } from 'react';
import { Icon } from "@atoms/basicAtoms/Icon/Icon";
import './accordionItem.css'; // ADD THIS LINE

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
        <div className={`accordion-item ${isOpen ? 'accordion-item--open' : ''}`}>  
            <button
                className="accordion-item__button"  
                onClick={toggleAccordion}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${props.id}`}
                tabIndex={0}
            >
                <span className="accordion-item__question">{props.question}</span>  
                <span className="accordion-item__icon"> 
                    <Icon name={isOpen ? 'minus-outline' : 'plus-outline'} />
                </span>
            </button>

            <div  
                  className={`accordion-item__answer ${isOpen ? 'accordion-item__answer--open' : ''}`}  
                  id={`faq-answer-${props.id}`}
                  role="region"
                  aria-labelledby={`faq-question-${props.id}`}
            >
                <div className="accordion-item__content" dangerouslySetInnerHTML={{ __html: props.answer }} />  
            </div>
        </div>
    );
}

export default FaqItem;