// Change from ../../ to ../../../
import HandsPrayingFill from "../../../assets/icons/fill/hands-praying.svg";
import HeadphonesFill from "../../../assets/icons/fill/headphones.svg";
import SquareFill from "../../../assets/icons/fill/square.svg";
import SquareSmallFill from "../../../assets/icons/fill/square-small.svg";
import UserFill from "../../../assets/icons/fill/user.svg";
import UsersFill from "../../../assets/icons/fill/users.svg";
import CaretRightFill from "../../../assets/icons/fill/caret-right.svg";
import CaretLeftFill from "../../../assets/icons/fill/caret-left.svg";
import PencilSimpleFill from "../../../assets/icons/fill/pencil-simple.svg";
import StarFill from "../../../assets/icons/fill/star.svg";
import TrashFill from "../../../assets/icons/fill/trash.svg";
import PlusFill from "../../../assets/icons/fill/plus.svg";
import MinusFill from "../../../assets/icons/fill/minus.svg";
import CloseFill from "../../../assets/icons/fill/close.svg";
import SubscriptionFill from "../../../assets/icons/fill/subscription.svg";

// Import all outline icons
import HandsPrayingOutline from "../../../assets/icons/outline/hands-praying.svg";
import HeadphonesOutline from "../../../assets/icons/outline/headphones.svg";
import UserOutline from "../../../assets/icons/outline/user.svg";
import UsersOutline from "../../../assets/icons/outline/users.svg";
import CaretRightOutline from "../../../assets/icons/outline/caret-right.svg";
import CaretLeftOutline from "../../../assets/icons/outline/caret-left.svg";
import PencilSimpleOutline from "../../../assets/icons/outline/pencil-simple.svg";
import StarOutline from "../../../assets/icons/outline/star.svg";
import TrashOutline from "../../../assets/icons/outline/trash.svg";
import PlusOutline from "../../../assets/icons/outline/plus.svg";
import MinusOutline from "../../../assets/icons/outline/minus.svg";
import CloseOutline from "../../../assets/icons/outline/close.svg";
import SubscriptionOutline from "../../../assets/icons/outline/subscription.svg";

export const outlineIcons = {
  'hands-praying-outline': HandsPrayingOutline,
  'headphones-outline': HeadphonesOutline,
  'user-outline': UserOutline,
  'users-outline': UsersOutline,
  'caret-right-outline': CaretRightOutline,
  'caret-left-outline': CaretLeftOutline,
  'pencil-simple-outline': PencilSimpleOutline,
  'star-outline': StarOutline,
  'trash-outline': TrashOutline,
  'plus-outline': PlusOutline,
  'minus-outline': MinusOutline,
  'close-outline': CloseOutline,
  'subscription-outline': SubscriptionOutline,
}

export const fillIcons = {
  'hands-praying-fill': HandsPrayingFill,
  'headphones-fill': HeadphonesFill,
  'square-fill': SquareFill,
  'square-small-fill': SquareSmallFill,
  'user-fill': UserFill,
  'users-fill': UsersFill,
  'caret-right-fill': CaretRightFill,
  'caret-left-fill': CaretLeftFill,
  'pencil-simple-fill': PencilSimpleFill,
  'star-fill': StarFill,
  'trash-fill': TrashFill,
  'plus-fill': PlusFill,
  'minus-fill': MinusFill,
  'close-fill': CloseFill,
  'subscription-fill': SubscriptionFill,
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
