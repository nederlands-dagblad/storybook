import NavigationCard, {NavigationCardProps} from "./NavigationCard";

export interface NavigationCardsProps {
  items: NavigationCardProps[]
}

export function NavigationCards(props: NavigationCardsProps) {

  const { items } = props

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {items.map((item) => (
        NavigationCard(item)
      ))}
    </div>
  )
}

export default NavigationCards;
