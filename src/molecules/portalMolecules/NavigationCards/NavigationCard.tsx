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
            className="font-fira-sans flex flex-row items-center justify-between gap-8 p-8 border transition-colors duration-200 ease-in-out border-border-accent-gray bg-background-default hover:bg-background-accent-gray-subtle hover:border-border-brand hover:shadow-s h-full"
            href={props.href}
        >
            <div className="text-icons-gray">
                <Icon name={props.icon} />
            </div>
            <div className="flex-grow">
                <h3 className="font-body-bold text-body-s text-text-default mb-xs">
                    {props.headline}
                </h3>
                <p className="font-body-light text-body-s text-text-subtle">
                    {props.description}
                </p>
            </div>
        </a>
    )
}

export default NavigationCard;