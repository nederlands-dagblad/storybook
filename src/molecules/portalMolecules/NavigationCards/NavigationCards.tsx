import NavigationCard, { NavigationCardProps } from "./NavigationCard";

export interface NavigationCardsProps {
  items: NavigationCardProps[]
}

export function NavigationCards(props: NavigationCardsProps) {
  const { items } = props

  return (
      <div className="navigation-cards">
        {items.map((item, index) => (
            <NavigationCard
                key={item.href || index}
                {...item}
            />
        ))}
      </div>
  )
}

export default NavigationCards;