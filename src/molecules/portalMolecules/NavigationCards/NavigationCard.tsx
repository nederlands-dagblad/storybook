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
      <div className="navigation-card-icon">
        <Icon name={props.icon} />
      </div>
      <div className="navigation-card-content">
        <h3>{props.headline}</h3>
        <p>{props.description}</p>
      </div>
    </a>
  )
}

export default NavigationCard;
