// Import all fill icons
import HandsPrayingFill from "../../assets/icons/fill/hands-praying.svg";
import HeadphonesFill from "../../assets/icons/fill/headphones.svg";
import SquareFill from "../../assets/icons/fill/square.svg";
import SquareSmallFill from "../../assets/icons/fill/square-small.svg";

// Import all outline icons
import HandsPrayingOutline from "../../assets/icons/outline/hands-praying.svg";
import HeadphonesOutline from "../../assets/icons/outline/headphones.svg";

// Create a mapping of icon names to SVG components
export const icons = {
  'hands-praying-fill': HandsPrayingFill,
  'headphones-fill': HeadphonesFill,
  'square-fill': SquareFill,
  'square-small-fill': SquareSmallFill,

  'hands-praying-outline': HandsPrayingOutline,
  'headphones-outline': HeadphonesOutline,
}

export function keys() {
  return Object.keys(icons);
}

export default {
  icons,
  keys
};
