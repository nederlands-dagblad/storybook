import React, { ReactNode } from "react";
import Icon from "@atoms/basicAtoms/Icon/Icon";


export interface AlertProps {
  className?: string;
  children: ReactNode;
  variant?: AlertVariant;
}

export type AlertVariant = "dark" | "danger" | "info" | "success" | "warning";

export const Alert: React.FC<AlertProps> = ({
                                              className = "",
                                              children,
                                              variant = "dark",
                                            }) => {
  const iconMapping: Record<AlertVariant, string> = {
    dark: "square-fill",
    danger: "warning-circle-fill",
    info: "square-fill",
    success: "square-fill",
    warning: "warning-circle-fill",
  };

  const icon = iconMapping[variant];

  return (
      <div className={`alert alert--${variant} ${className}`}>
        {icon && (
            <Icon
                name={icon}
                className={`alert__icon--${variant} mt-1`}
                size={20}
            />
        )}
        <span>{children}</span>
      </div>
  );
};

export default Alert;
