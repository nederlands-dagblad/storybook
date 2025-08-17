import FaqItem, {FaqItemProps} from './faqItem';
import './accordion.css'; // ADD THIS LINE

export interface FaqProps {
    items: FaqItemProps[]
    title?: string
}

export function Faq(props: FaqProps) {
    const { items, title } = props;

    return (
        <div className="accordion">  {/* CHANGE: faq-container → accordion */}
            {title && <h2 className="accordion__title">{title}</h2>}  {/* CHANGE: faq-title → accordion__title */}
            <div className="accordion__items">  {/* CHANGE: faq-items → accordion__items */}
                {items.map((item, index) => (
                    <div key={item.id || `faq-${index}`} className="accordion__item-wrapper">  {/* ADD WRAPPER DIV */}
                        <FaqItem {...item} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Faq;