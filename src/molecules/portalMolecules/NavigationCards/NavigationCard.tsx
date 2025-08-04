import { Icon } from "@atoms/basicAtoms/Icon/Icon";

export interface NavigationCardProps {
    icon: string
    headline: string
    description: string
    href: string
}

export function NavigationCard(props: NavigationCardProps) {
    return (
        <a className="navigation-card" href={props.href}>
            <div className="navigation-card__icon">
                <Icon name={props.icon} />
            </div>
            <div className="navigation-card__content">
                <h3 className="navigation-card__title">
                    {props.headline}
                </h3>
                <p className="navigation-card__description">
                    {props.description}
                </p>
            </div>
        </a>
    )
}

export default NavigationCard;