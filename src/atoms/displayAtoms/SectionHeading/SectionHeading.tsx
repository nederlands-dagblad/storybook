import React from "react";

export interface SectionHeadingProps {
    children: React.ReactNode;
    intro?: string;
    variant?: 'default' | 'lined';
    className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
    children,
    intro,
    variant = 'default',
    className = "",
}) => {
    if (variant === 'lined') {
        return (
            <div className={`flex items-center gap-m ${className}`}>
                <hr className="flex-1 border-t border-width-s border-border-default" />
                <h2 className="text-center text-heading-uppercase text-text-default">{children}</h2>
                <hr className="flex-1 border-t border-width-s border-border-default" />
            </div>
        );
    }

    return (
        <div className={`flex flex-col gap-s ${className}`}>
            <h2 className="text-heading-l text-text-default">{children}</h2>
            {intro && <p className="text-body-light text-text-default">{intro}</p>}
        </div>
    );
};

export default SectionHeading;
