import React, { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'white';
  size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  children,
  onClick,
  ...props
}) => {
  // Variant classes
  const variantClass = {
    'btn-primary': variant === 'primary',
    'btn-secondary': variant === 'secondary',
    'btn-white': variant === 'white'
  };

  // Size classes
  const sizeClass = {
    'btn-sm': size === 'sm',
    'btn-md': size === 'md',
    'btn-lg': size === 'lg'
  };

  // Convert class objects to strings
  const variantClassString = Object.keys(variantClass)
    .filter(key => variantClass[key as keyof typeof variantClass])
    .join(' ');

  const sizeClassString = Object.keys(sizeClass)
    .filter(key => sizeClass[key as keyof typeof sizeClass])
    .join(' ');

  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      className={`btn ${variantClassString} ${sizeClassString} ${disabledClass}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
