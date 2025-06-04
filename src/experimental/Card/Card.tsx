import React, { ReactNode } from 'react';

export interface CardProps {
  children?: ReactNode;
  image?: ReactNode;
  title?: ReactNode;
  footer?: ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, image, title, footer }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {image && <div className="w-full">{image}</div>}
      <div className="p-4">
        {title && <div className="font-bold text-xl mb-2">{title}</div>}
        {children && <div>{children}</div>}
        {footer && <div className="mt-4 pt-3 border-t border-gray-200">{footer}</div>}
      </div>
    </div>
  );
};

export default Card;
