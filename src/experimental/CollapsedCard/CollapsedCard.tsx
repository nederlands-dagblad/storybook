import React, { ReactNode, useState, useEffect } from 'react';

export interface CollapsedCardProps {
  title?: string;
  collapsed?: boolean;
  children?: ReactNode;
  header?: ReactNode;
  onToggle?: (isCollapsed: boolean) => void;
}

export const CollapsedCard: React.FC<CollapsedCardProps> = ({
  title = 'Card Title',
  collapsed = true,
  children,
  header,
  onToggle
}) => {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);

  useEffect(() => {
    setIsCollapsed(collapsed);
  }, [collapsed]);

  const toggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    if (onToggle) {
      onToggle(newState);
    }
  };

  return (
    <div className="collapsed-card border rounded-lg shadow-sm overflow-hidden">
      <div
        className="collapsed-card-header p-4 flex justify-between items-center cursor-pointer"
        onClick={toggleCollapse}
      >
        <div className="font-medium text-lg">
          {header || title}
        </div>
        <div className={`transform transition-transform ${!isCollapsed ? 'rotate-180' : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>
      {!isCollapsed && (
        <div className="collapsed-card-content p-4 border-t">
          {children}
        </div>
      )}
    </div>
  );
};

export default CollapsedCard;
