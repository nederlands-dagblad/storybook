import React from 'react';
import Icon from "@atoms/basicAtoms/Icon/Icon";

export interface PremiumBadgeProps {
    className?: string;
    size?: 'small' | 'large';
}

export const PremiumBadge: React.FC<PremiumBadgeProps> = ({ className = '', size = 'large' }) => {
    return (
        <div
            className={`inline-flex items-center gap-xxs ${size === 'small' ? 'p-xxs' : 'p-xs'} bg-background-accent-pink-subtlest text-meta text-neutral-black ${className}`}>
            <Icon
                name="star-small"
                variant="fill"
                size={size === 'small' ? 's' : 'm'}
                color="default"
            />
            <span>Premium</span>
        </div>
    );
};

export default PremiumBadge;