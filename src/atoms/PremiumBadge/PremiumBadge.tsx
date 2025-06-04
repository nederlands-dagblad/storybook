import React from 'react';
import Icon from "../Icon/Icon.tsx";

export interface PremiumBadgeProps {
  className?: string;
  size?: 'small' | 'large';
}

export const PremiumBadge: React.FC<PremiumBadgeProps> = ({ className = '', size = 'large' }) => {
  return (
    <div className={`badge-premium ${size === 'small' ? 'badge-premium-small' : ''} ${className}`}>
      <Icon name="star-fill" size={size === 'small' ? 14 : 18} />
      <span>Premium</span>
    </div>
  );
};

export default PremiumBadge;
