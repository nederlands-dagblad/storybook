import { Accordion } from "@molecules/contentOrganizationMolecules/Accordian/accordion.tsx";

export interface FAQItem {
    id?: string;
    question: string;
    answer: string;
}

export interface FAQProps {
    title?: string;
    items: FAQItem[];
    allowMultiple?: boolean;
    variant?: 'default' | 'large';
    className?: string;
}

export function FAQ({
                        title = 'Veelgestelde vragen',
                        items,
                        allowMultiple = false,
                        variant = 'default',
                        className = ''
                    }: FAQProps) {
    // Transform FAQ items to accordion format
    const accordionItems = items.map(item => ({
        id: item.id,
        question: item.question,
        answer: item.answer
    }));

    return (
        <div className={`faq ${className}`}>
            <Accordion
                title={title}
                items={accordionItems}
                allowMultiple={allowMultiple}
                variant={variant}
            />
        </div>
    );
}

export default FAQ;