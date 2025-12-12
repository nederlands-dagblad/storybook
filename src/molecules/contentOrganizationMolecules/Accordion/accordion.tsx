import { useState } from 'react';
import AccordionItem, { AccordionItemProps } from './accordionItem';

export interface AccordionProps {
    items: AccordionItemProps[];
    title?: string;
    allowMultiple?: boolean;
    variant?: 'default' | 'large';
}
export function Accordion({
                              items,
                              title,
                              allowMultiple = false,
                              variant = 'default'
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
        <div className="accordion flex flex-col w-full">
            {title && (
                <h2 className="accordion__title text-heading-2 mb-m">
                    {title}
                </h2>
            )}
            <div className="accordion__items flex flex-col">
                {items.map((item, index) => (
                    <div
                        key={item.id || `accordion-${index}`}
                        className={`
                            accordion__item-wrapper 
                            m-0
                            ${index > 0 ? 'mt-s' : ''}
                        `}
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