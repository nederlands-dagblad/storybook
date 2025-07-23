import FaqItem, {FaqItemProps} from './faqItem';

export interface FaqProps {
    items: FaqItemProps[]
    title?: string
}

export function Faq(props: FaqProps) {
    const { items, title } = props;

    return (
        <div className="faq-container">
            {title && <h2 className="faq-title">{title}</h2>}
            <div className="faq-items">
                {items.map((item, index) => (
                    <FaqItem
                        key={item.id || `faq-${index}`}
                        {...item}
                    />
                ))}
            </div>
        </div>
    );
}

export default Faq;