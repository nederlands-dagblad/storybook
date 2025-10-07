// Import fill icons
import HandsPrayingFill from "../../../atoms/basicAtoms/Icon/icons/fill/hands-praying.svg";
import HeadphonesFill from "../../../atoms/basicAtoms/Icon/icons/fill/headphones.svg";
import SquareFill from "../../../atoms/basicAtoms/Icon/icons/fill/square.svg";
import SquareSmallFill from "../../../atoms/basicAtoms/Icon/icons/fill/square-small.svg";
import UserFill from "../../../atoms/basicAtoms/Icon/icons/fill/user.svg";
import UsersFill from "../../../atoms/basicAtoms/Icon/icons/fill/users.svg";
import CaretRightFill from "../../../atoms/basicAtoms/Icon/icons/fill/caret-right.svg";
import CaretLeftFill from "../../../atoms/basicAtoms/Icon/icons/fill/caret-left.svg";
import PencilSimpleFill from "../../../atoms/basicAtoms/Icon/icons/fill/pencil-simple.svg";
import StarFill from "../../../atoms/basicAtoms/Icon/icons/fill/star.svg";
import TrashFill from "../../../atoms/basicAtoms/Icon/icons/fill/trash.svg";
import PlusFill from "../../../atoms/basicAtoms/Icon/icons/fill/plus.svg";
import MinusFill from "../../../atoms/basicAtoms/Icon/icons/fill/minus.svg";
import CloseFill from "../../../atoms/basicAtoms/Icon/icons/fill/close.svg";
import SubscriptionFill from "../../../atoms/basicAtoms/Icon/icons/fill/subscription.svg";
import WarningFill from "../../../atoms/basicAtoms/Icon/icons/fill/warning-circle.svg";
import SignOutFill from "../../../atoms/basicAtoms/Icon/icons/fill/sign-out.svg";

// Import outline icons
import HandsPrayingOutline from "../../../atoms/basicAtoms/Icon/icons/outline/hands-praying.svg";
import HeadphonesOutline from "../../../atoms/basicAtoms/Icon/icons/outline/headphones.svg";
import UserOutline from "../../../atoms/basicAtoms/Icon/icons/outline/user.svg";
import UsersOutline from "../../../atoms/basicAtoms/Icon/icons/outline/users.svg";
import CaretRightOutline from "../../../atoms/basicAtoms/Icon/icons/outline/caret-right.svg";
import CaretLeftOutline from "../../../atoms/basicAtoms/Icon/icons/outline/caret-left.svg";
import PencilSimpleOutline from "../../../atoms/basicAtoms/Icon/icons/outline/pencil-simple.svg";
import StarOutline from "../../../atoms/basicAtoms/Icon/icons/outline/star.svg";
import TrashOutline from "../../../atoms/basicAtoms/Icon/icons/outline/trash.svg";
import PlusOutline from "../../../atoms/basicAtoms/Icon/icons/outline/plus.svg";
import MinusOutline from "../../../atoms/basicAtoms/Icon/icons/outline/minus.svg";
import CloseOutline from "../../../atoms/basicAtoms/Icon/icons/outline/close.svg";
import SubscriptionOutline from "../../../atoms/basicAtoms/Icon/icons/outline/subscription.svg";
import TruckOutline from "../../../atoms/basicAtoms/Icon/icons/outline/truck.svg";
import WarningOutline from "../../../atoms/basicAtoms/Icon/icons/outline/warning-circle.svg";
import SignOutOutline from "../../../atoms/basicAtoms/Icon/icons/outline/sign-out.svg";
import ArrowsDownUpOutline from "../../../atoms/basicAtoms/Icon/icons/outline/arrows-down-up.svg";

export const icons = {
  'hands-praying-outline': HandsPrayingOutline,
  'hands-praying-fill': HandsPrayingFill,
  'headphones-outline': HeadphonesOutline,
  'headphones-fill': HeadphonesFill,
  'square-fill': SquareFill,
  'square-small-fill': SquareSmallFill,
  'user-outline': UserOutline,
  'user-fill': UserFill,
  'users-outline': UsersOutline,
  'users-fill': UsersFill,
  'caret-right-outline': CaretRightOutline,
  'caret-right-fill': CaretRightFill,
  'caret-left-outline': CaretLeftOutline,
  'caret-left-fill': CaretLeftFill,
  'pencil-simple-outline': PencilSimpleOutline,
  'pencil-simple-fill': PencilSimpleFill,
  'star-outline': StarOutline,
  'star-fill': StarFill,
  'trash-outline': TrashOutline,
  'trash-fill': TrashFill,
  'plus-outline': PlusOutline,
  'plus-fill': PlusFill,
  'minus-outline': MinusOutline,
  'minus-fill': MinusFill,
  'close-outline': CloseOutline,
  'close-fill': CloseFill,
  'subscription-outline': SubscriptionOutline,
  'subscription-fill': SubscriptionFill,
  'truck-outline': TruckOutline,
  'warning-circle-outline': WarningOutline,
  'warning-circle-fill': WarningFill,
  'sign-out-outline': SignOutOutline,
  'sign-out-fill': SignOutFill,
  'arrows-down-up-outline': ArrowsDownUpOutline,
};

// Get unique icon names (without variant suffix)
export function getIconNames() {
  const names = new Set<string>();
  Object.keys(icons).forEach(key => {
    const name = key.replace(/-outline$|-fill$/, '');
    names.add(name);
  });
  return Array.from(names).sort();
}

export function keys(variant?: 'outline' | 'fill') {
  if (variant === 'outline') {
    return Object.keys(icons).filter(key => key.endsWith('-outline'));
  }

  if (variant === 'fill') {
    return Object.keys(icons).filter(key => key.endsWith('-fill'));
  }

  return Object.keys(icons);
}

export default {
  icons,
  keys,
  getIconNames
};