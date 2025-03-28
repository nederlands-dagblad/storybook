import React, { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'white' | 'dark';
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  disabled = false,
  children,
  onClick,
  ...props
}) => {
  // Variant classes
  const variantClass = {
    'btn-primary': variant === 'primary',
    'btn-secondary': variant === 'secondary',
    'btn-white': variant === 'white',
    'btn-dark': variant === 'dark',
  };

  // Convert class objects to strings
  const variantClassString = Object.keys(variantClass)
    .filter(key => variantClass[key as keyof typeof variantClass])
    .join(' ');

  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      className={`btn ${variantClassString} ${disabledClass}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
