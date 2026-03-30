import React from 'react';

export interface PageSectionProps {
    children: React.ReactNode;
    background?: 'default' | 'gray-subtle' | 'brand-subtle';
    className?: string;
}

const PageSection: React.FC<PageSectionProps> = ({
    children,
    background = 'default',
    className,
}) => {
    const backgroundClass = {
        default: 'bg-background-default',
        'gray-subtle': 'bg-background-gray-subtle',
        'brand-subtle': 'bg-background-brand-subtle',
    }[background];

    return (
        <section className={`w-full flex justify-center px-m py-l lg:px-l lg:py-xl ${backgroundClass} ${className ?? ''}`}>
            <div className="w-full max-w-5xl">
                {children}
            </div>
        </section>
    );
};

export default PageSection;
