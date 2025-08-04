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
            className="flex flex-row items-center gap-m px-l py-[29px] border border-border-accent-gray-subtle bg-background-default hover:border-border-brand transition-colors duration-200 ease-in-out group"
            href={props.href}
        >
            <div className="shrink-0 w-4 h-4 text-icons-default">
                <Icon name={props.icon} />
            </div>
            <div className="flex flex-col items-start justify-start min-w-0 flex-1 gap-xs">
                <h3 className="font-body-bold text-text-default group-hover:underline group-hover:[text-underline-offset:25%]">
                    {props.headline}
                </h3>
                <p className="font-body-light text-text-default">
                    {props.description}
                </p>
            </div>
        </a>
    )
}

export default NavigationCard;