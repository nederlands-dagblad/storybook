import { Icon } from "@atoms/basicAtoms/Icon/Icon";

export interface NavigationCardProps {
    icon: string
    headline: string
    description: string
    href: string
}

export function NavigationCard(props: NavigationCardProps) {
    return (
        <a
            className="navigation-card gap-m px-l py-[29px]"
            href={props.href}
        >
            <div className="navigation-card__icon">
                <Icon name={props.icon} />
            </div>
            <div className="navigation-card__content gap-xs">
                <h3 className="text-body-bold text-default navigation-card__title">
                    {props.headline}
                </h3>
                <p className="text-body-light text-default">
                    {props.description}
                </p>
            </div>
        </a>
    )
}

export default NavigationCard;