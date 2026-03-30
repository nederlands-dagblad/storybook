import React, { ReactNode } from 'react';

export interface TypographyProps {
  children: ReactNode;
  className?: string;
}

// Headings
export const HeadingArticle = ({ children, className = '' }: TypographyProps) => (
  <h1 className={`text-article-heading ${className}`}>{children}</h1>
);

export const HeadingPage = ({ children, className = '' }: TypographyProps) => (
  <h1 className={`text-heading-xl ${className}`}>{children}</h1>
);

export const Heading2 = ({ children, className = '' }: TypographyProps) => (
  <h2 className={`text-heading-m ${className}`}>{children}</h2>
);

export const Heading3 = ({ children, className = '' }: TypographyProps) => (
  <h3 className={`text-heading-s ${className}`}>{children}</h3>
);

// Meta text
export const MetaRegular = ({ children, className = '' }: TypographyProps) => (
  <span className={`text-meta-regular ${className}`}>{children}</span>
);

export const MetaAuthor = ({ children, className = '' }: TypographyProps) => (
  <span className={`text-meta-bold ${className}`}>{children}</span>
);

