import React, { ReactNode } from "react";
import { CardContainer } from "@atoms/displayAtoms/CardContainer/CardContainer";
import { IconText } from "@atoms/basicAtoms/IconText/IconText";
import { IconProps } from "@atoms/basicAtoms/Icon/Icon";

export interface AlertProps {
    className?: string;
    children: ReactNode;
    variant?: AlertVariant;
}

export type AlertVariant = "info" | "info-dark" | "warning";

interface AlertConfig {
    icon: string;
    iconVariant: IconProps['variant'];
    iconColor: IconProps['color'];
    borderColor: 'gray' | 'warning' | 'none';
    background: 'transparent' | 'gray';
}

const alertConfigMap: Record<AlertVariant, AlertConfig> = {
    info: {
        icon: "square",
        iconVariant: "fill",
        iconColor: "brand",
        borderColor: "gray",
        background: "transparent",
    },
    "info-dark": {
        icon: "square",
        iconVariant: "fill",
        iconColor: "brand",
        borderColor: "none",
        background: "gray",
    },
    warning: {
        icon: "warning-circle",
        iconVariant: "fill",
        iconColor: "warning",
        borderColor: "warning",
        background: "transparent",
    },
};

export const Alert: React.FC<AlertProps> = ({
                                                className = "",
                                                children,
                                                variant = "info",
                                            }) => {
    const config = alertConfigMap[variant];

    const isHtmlString = typeof children === 'string';

    return (
        <CardContainer
            borderColor={config.borderColor}
            background={config.background}
            className={className}
        >
            <IconText
                icon={config.icon}
                text={
                    isHtmlString
                        ? <span
                            dangerouslySetInnerHTML={{ __html: children as string }}
                            className="[&_a]:underline"
                        />
                        : children
                }
                iconVariant={config.iconVariant}
                iconColor={config.iconColor}
            />
        </CardContainer>
    );
};

export default Alert;