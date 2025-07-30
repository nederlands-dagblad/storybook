import React, { ReactNode } from 'react';
import Icon from "@atoms/basicAtoms/Icon/Icon.tsx";

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

  const variantClasses = {
    dark: 'bg-neutral-100', // YOUR TOKEN: gray background (info gray)
    danger: 'bg-[rgba(233,66,91,0.10)]', // Light pink background
    info: 'bg-background-default border border-neutral-400', // YOUR TOKENS: white bg with gray border
    success: 'bg-background-brand-subtlest', // YOUR TOKEN
    warning: 'border-2 border-text-warning', // Light pink bg with red border
  };

  const iconMapping = {
    dark: 'square-fill',
    danger: 'square-fill',
    info: 'square-fill',
    success: 'square-fill',
    warning: 'square-fill', // Will be styled differently
  }

  const iconColorClasses = {
    dark: 'text-blue-400', // YOUR TOKEN: blue square for info gray
    info: 'text-blue-400', // YOUR TOKEN: blue square
    success: 'text-text-brand', // YOUR TOKEN
    danger: 'text-text-warning', // YOUR TOKEN
    warning: 'text-text-warning', // YOUR TOKEN
  }

  const icon = iconMapping[variant] ?? null;
  const alertClasses = variantClasses[variant];
  const iconColorClass = iconColorClasses[variant];

  // Special styling only for warning variant's icon
  const isWarning = variant === 'warning';

  return (
      <div className={`p-5 ${alertClasses} ${className}`}>
        <div className="inline-flex gap-xs font-body-light">
          { icon && (
              <div className="flex-shrink-0">
                {isWarning ? (
                    <div className="w-5 h-5 rounded-full bg-text-warning flex items-center justify-center">
                      <span className="text-background-default text-body-m font-body-bold">!</span>
                    </div>
                ) : (
                    <Icon name={icon} className={`${iconColorClass} mt-1`} />
                )}
              </div>
          )}
          <span className="text-body-m font-body-light text-text-default">
          {children}
        </span>
        </div>
      </div>
  );
};

export default Alert;