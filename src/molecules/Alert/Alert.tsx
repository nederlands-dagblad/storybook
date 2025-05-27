import React, { ReactNode } from 'react';

export interface AlertProps {
  className?: string;
  children: ReactNode;
  variant?: AlertVariant;
}

export type AlertVariant = 'dark' | 'danger' | 'info' | 'success' | 'warning';

const Alert: React.FC<AlertProps> = (props) => {

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

  return (
    <div className={`alert ${alertClass} ${className}`}>
      <div className="alert-content">
        <div className={`alert-${variant}-icon`}></div>
        <span className={'text-body-light'}>
          {children}
        </span>
      </div>
    </div>
  );
};

export default Alert;
