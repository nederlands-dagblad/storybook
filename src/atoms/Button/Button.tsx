import React, { ButtonHTMLAttributes } from 'react';
import Icon from "../Icon/Icon.tsx";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'dark' | 'pill';
  icon?: string | null;
  iconOnly?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  icon = null,
  iconOnly = false,
  disabled = false,
  children,
  onClick,
  ...props
}) => {
  // Variant classes
  const variantClass = {
    'btn-primary': variant === 'primary',
    'btn-secondary': variant === 'secondary',
    'btn-ghost': variant === 'ghost',
    'btn-dark': variant === 'dark',
    'btn-pill': variant === 'pill',
  };

  // Convert class objects to strings
  const variantClassString = Object.keys(variantClass)
    .filter(key => variantClass[key as keyof typeof variantClass])
    .join(' ');

  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      className={`btn ${variantClassString} ${iconOnly ? 'btn-icon-only' : ''} ${disabledClass}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      { icon && <Icon name={icon} size={18} /> }
      { children }
    </button>
  );
};

export default Button;
