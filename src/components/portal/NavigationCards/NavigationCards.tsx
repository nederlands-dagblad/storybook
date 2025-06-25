import NavigationCard, {NavigationCardProps} from "./NavigationCard";

interface NavigationCardsProps {
  items: NavigationCardProps[]
}

export default function NavigationCards(props: NavigationCardsProps) {

  const { items } = props

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {items.map((item, index) => (
        NavigationCard(item)
      ))}
    </div>
  )
}
