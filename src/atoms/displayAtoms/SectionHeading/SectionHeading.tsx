import React from "react";

export interface SectionHeadingProps {
    children: React.ReactNode;
    className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
                                                                  children,
                                                                  className = "",
                                                              }) => {
    return (
        <div className={`flex items-center gap-m ${className}`}>
            <hr className="flex-1 border-t border-width-s border-border-default" />
            <h2 className="text-center text-heading-uppercase text-text-default">{children}</h2>
            <hr className="flex-1 border-t border-width-s border-border-default" />
        </div>
    );
};

export default SectionHeading;