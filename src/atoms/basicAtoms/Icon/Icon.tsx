import React from "react";
import {ReactSVG} from "react-svg";

import {icons} from "./list";

type IconSize =  's' | 'm' | 'l' | 'xl' | 'xxl';
type IconColor = 'default' | 'gray' | 'brand' | 'warning' | 'inverse';
type IconVariant = 'outline' | 'fill';

export interface IconProps {
    name: string;
    size?: IconSize;
    color?: IconColor;
    variant?: IconVariant;
    className?: string;
}

const sizeMap: Record<IconSize, string> = {
    s: 'w-s h-s',
    m: 'w-m h-m',
    l: 'w-l h-l',
    xl: 'w-xl h-xl',
    xxl: 'w-xxl h-xxl',
};

const colorMap: Record<IconColor, string> = {
    default: 'text-icons-default',
    gray: 'text-icons-gray',
    brand: 'text-icons-brand',
    warning: 'text-icons-warning',
    inverse: 'text-icons-inverse',
    buttonPrimary: 'text-button-icon-primary',
    buttonSecondary: 'text-button-icon-secondary',
    buttonPill: 'text-button-icon-pill',
    
};

export const Icon: React.FC<IconProps> = (props) => {
    const {name, size = 's', color = 'default', variant = 'outline', className = ''} = props;
    
    const iconKey = `${name}-${variant}`;
    const icon = icons[iconKey];

    if (!icon) {
        console.warn(`Icon "${name}" not found.`);
        return <span>⚠️</span>;
    }

    const sizeClass = sizeMap[size];
    const colorClass = colorMap[color];
  
    return (
        <ReactSVG
            src={icon}
            className={`${sizeClass} ${colorClass} fill-current ${className}`}
            beforeInjection={(svg) => {
                svg.setAttribute("class", "icon");
                svg.setAttribute("width", size.toString());
                svg.setAttribute("height", size.toString());
            }}
        />
    )
};

export default Icon;
