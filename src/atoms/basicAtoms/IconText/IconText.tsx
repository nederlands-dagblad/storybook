import React from "react";
import Icon, {IconProps} from "@atoms/basicAtoms/Icon/Icon.tsx";

type TextWeight = 'light' | 'regular' | 'bold';

export interface IconTextProps {
    icon: string;
    text: string | React.ReactNode;
    iconVariant?: IconProps['variant'];
    iconSize?: IconProps['size'];
    iconColor?: IconProps['color'];
    textWeight?: TextWeight;
    className?: string;
}

const textWeightMap: Record<TextWeight, string> = {
    light: 'text-body-light',
    regular: 'text-body-regular',
    bold: 'text-body-bold',
};

export const IconText: React.FC<IconTextProps> = ({
                                                      icon,
                                                      text,
                                                      iconVariant = 'outline',
                                                      iconSize = 's',
                                                      iconColor = 'brand',
                                                      textWeight = 'light',
                                                      className = '',
                                                  }) => {
        const textWeightClass = textWeightMap[textWeight];
        
        return (
            <div className={`flex gap-xs items-center ${className}`}>
                <Icon
                    name={icon}
                    variant={iconVariant}
                    size={iconSize}
                    color={iconColor}
                />
                <span className={`${textWeightClass} text-text-default`}>{text}</span>
            </div>
        );
    }
;

export default IconText;