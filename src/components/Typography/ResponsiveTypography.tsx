import React, { ReactNode } from 'react';

interface ResponsiveTypographyProps {
  children: ReactNode;
  className?: string;
}

// Responsive Headings
export const ResponsiveHeading = ({ children, className = '' }: ResponsiveTypographyProps) => (
  <h1 className={`heading-responsive ${className}`}>{children}</h1>
);

// Responsive Body Text
export const ResponsiveBody = ({ children, className = '' }: ResponsiveTypographyProps) => (
  <p className={`body-responsive ${className}`}>{children}</p>
);

// Custom Responsive Text
export const ResponsiveText = ({ children, className = '' }: ResponsiveTypographyProps) => (
  <span className={`text-responsive ${className}`}>{children}</span>
);
