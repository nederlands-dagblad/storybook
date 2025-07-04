import React, { ReactNode } from 'react';

export interface TypographyProps {
  children: ReactNode;
  className?: string;
}

// Heading variants
export const Heading1 = ({ children, className = '' }: TypographyProps) => (
  <h1 className={`text-heading ${className}`}>{children}</h1>
);

export const Heading2 = ({ children, className = '' }: TypographyProps) => (
  <h2 className={`text-heading-2 ${className}`}>{children}</h2>
);

export const Heading3 = ({ children, className = '' }: TypographyProps) => (
  <h3 className={`text-heading-3 ${className}`}>{children}</h3>
);

// Body text variants
export const Body = ({ children, className = '' }: TypographyProps) => (
  <p className={`text-body ${className}`}>{children}</p>
);

export const BodyLight = ({ children, className = '' }: TypographyProps) => (
  <p className={`text-body-light ${className}`}>{children}</p>
);

export const BodyBold = ({ children, className = '' }: TypographyProps) => (
  <p className={`text-body-bold ${className}`}>{children}</p>
);

export const Intro = ({ children, className = '' }: TypographyProps) => (
  <p className={`text-intro ${className}`}>{children}</p>
);

export const Quote = ({ children, className = '' }: TypographyProps) => (
  <blockquote className={`text-quote ${className}`}>{children}</blockquote>
);

export const Meta = ({ children, className = '' }: TypographyProps) => (
  <span className={`text-meta ${className}`}>{children}</span>
);

export const MetaBold = ({ children, className = '' }: TypographyProps) => (
  <span className={`text-meta-bold ${className}`}>{children}</span>
);

// Legacy components with updated classes
export const ResponsiveHeading = ({ children, className = '' }: TypographyProps) => (
  <h1 className={`text-heading ${className}`}>{children}</h1>
);

export const ResponsiveBody = ({ children, className = '' }: TypographyProps) => (
  <p className={`text-body ${className}`}>{children}</p>
);

export const ResponsiveText = ({ children, className = '' }: TypographyProps) => (
  <span className={`text-body ${className}`}>{children}</span>
);

// Generic component that accepts a variant
export interface GenericTypographyProps extends TypographyProps {
  variant: 'heading' | 'heading-2' | 'heading-3' | 'body' | 'body-light' | 'body-bold' | 'intro' | 'quote' | 'meta' | 'meta-bold';
  as?: keyof JSX.IntrinsicElements;
}

export const Typography = ({
  children,
  className = '',
  variant,
  as: Component = 'div'
}: GenericTypographyProps) => (
  <Component className={`text-${variant} ${className}`}>{children}</Component>
);
