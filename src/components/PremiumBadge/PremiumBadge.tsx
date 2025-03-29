import React from 'react';
import Icon from "../Icon/Icon.tsx";

export interface PremiumBadgeProps {
  className?: string;
}

const PremiumBadge: React.FC<PremiumBadgeProps> = ({ className = '' }) => {
  return (
    <div className="badge-premium">
      <Icon name="star-fill" />
      <span>Premium</span>
    </div>
  );
};

export default PremiumBadge;
