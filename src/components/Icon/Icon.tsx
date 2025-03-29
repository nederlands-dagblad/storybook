import React from "react";
import { ReactSVG } from "react-svg";

import { icons } from "./list";

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
}

const Icon: React.FC<IconProps> = (props) => {
  const { name, size = 18, color = 'currentColor', className = '' } = props;

  const icon = icons[name];

  if (!icon) {
    console.warn(`Icon "${name}" not found.`);
    return <span>⚠️</span>;
  }

  return (
    <ReactSVG
      src={icon}
      className={className}
      beforeInjection={(svg) => {
        svg.setAttribute("class", "icon");
        svg.setAttribute("width", size.toString());
        svg.setAttribute("height", size.toString());
        // svg.setAttribute("fill", color);
      }}
    />
  )
};

export default Icon;
