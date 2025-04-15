// Import all fill icons
import HandsPrayingFill from "../../assets/icons/fill/hands-praying.svg";
import HeadphonesFill from "../../assets/icons/fill/headphones.svg";
import SquareFill from "../../assets/icons/fill/square.svg";
import SquareSmallFill from "../../assets/icons/fill/square-small.svg";
import UserFill from "../../assets/icons/fill/user.svg";
import CaretRightFill from "../../assets/icons/fill/caret-right.svg";
import CaretLeftFill from "../../assets/icons/fill/caret-left.svg";
import PencilSimpleFill from "../../assets/icons/fill/pencil-simple.svg";
import StarFill from "../../assets/icons/fill/star.svg";
import TrashFill from "../../assets/icons/fill/trash.svg";
import PlusFill from "../../assets/icons/fill/plus.svg";
import MinusFill from "../../assets/icons/fill/minus.svg";
import CloseFill from "../../assets/icons/fill/close.svg";

// Import all outline icons
import HandsPrayingOutline from "../../assets/icons/outline/hands-praying.svg";
import HeadphonesOutline from "../../assets/icons/outline/headphones.svg";
import UserOutline from "../../assets/icons/outline/user.svg";
import CaretRightOutline from "../../assets/icons/outline/caret-right.svg";
import CaretLeftOutline from "../../assets/icons/outline/caret-left.svg";
import PencilSimpleOutline from "../../assets/icons/outline/pencil-simple.svg";
import StarOutline from "../../assets/icons/outline/star.svg";
import TrashOutline from "../../assets/icons/outline/trash.svg";
import PlusOutline from "../../assets/icons/outline/plus.svg";
import MinusOutline from "../../assets/icons/outline/minus.svg";
import CloseOutline from "../../assets/icons/outline/close.svg";

export const outlineIcons = {
  'hands-praying-outline': HandsPrayingOutline,
  'headphones-outline': HeadphonesOutline,
  'user-outline': UserOutline,
  'caret-right-outline': CaretRightOutline,
  'caret-left-outline': CaretLeftOutline,
  'pencil-simple-outline': PencilSimpleOutline,
  'star-outline': StarOutline,
  'trash-outline': TrashOutline,
  'plus-outline': PlusOutline,
  'minus-outline': MinusOutline,
  'close-outline': CloseOutline,
}

export const fillIcons = {
  'hands-praying-fill': HandsPrayingFill,
  'headphones-fill': HeadphonesFill,
  'square-fill': SquareFill,
  'square-small-fill': SquareSmallFill,
  'user-fill': UserFill,
  'caret-right-fill': CaretRightFill,
  'caret-left-fill': CaretLeftFill,
  'pencil-simple-fill': PencilSimpleFill,
  'star-fill': StarFill,
  'trash-fill': TrashFill,
  'plus-fill': PlusFill,
  'minus-fill': MinusFill,
  'close-fill': CloseFill,
}

export const icons = Object.assign({}, outlineIcons, fillIcons);

export function keys(variant?: 'outline' | 'fill') {
  if (variant === 'outline') {
    return Object.keys(outlineIcons);
  }

  if (variant === 'fill') {
    return Object.keys(fillIcons);
  }

  return Object.keys(icons);
}

export default {
  icons,
  keys
};

54,67
38,71
47,67
47,18
44,69
12,10
63,10
13,92
60,79
96,20
51,91
113,67
43,97
27,35
20,84
64,26
63,42
27,45
19,75
12,10
14,62
71,80
35,60
36,61
12,10
53,31
50,35
26,33
51,51
25,69
54,01
38,67
92,63
