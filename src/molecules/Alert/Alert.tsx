import React, { ReactNode } from 'react';
import Icon from "@atoms/Icon/Icon.tsx";

export interface AlertProps {
  className?: string;
  children: ReactNode;
  variant?: AlertVariant;
}

export type AlertVariant = 'dark' | 'danger' | 'info' | 'success' | 'warning';

export const Alert: React.FC<AlertProps> = (props) => {

  const {
    className = '',
    children,
    variant = 'dark'
  } = props;

  const variantMapping = {
    dark: 'alert-dark',
    danger: 'alert-danger',
    info: 'alert-info',
    success: 'alert-success',
    warning: 'alert-warning',
  };

  const alertClass = variantMapping[variant];

  const iconMapping = {
    dark: 'square-fill',
    danger: 'square-fill',
    info: 'square-fill',
    success: 'square-fill',
    warning: 'square-fill',
  }

  const iconColorMapping = {
    dark: 'text-dark',
    info: 'text-blue-400',
    success: 'text-green-400',
    danger: 'text-red-500',
    warning: 'text-yellow-400',
  }

  const icon = iconMapping[variant] ?? null;

  return (
    <div className={`alert ${alertClass} ${className}`}>
      <div className="alert-content">
        { icon && <div>
          <Icon name={icon} className={[iconColorMapping[variant], "mt-1"].join(' ')} />
        </div> }
        <span className={'text-body-light'}>
          {children}
        </span>
      </div>
    </div>
  );
};

export default Alert;
