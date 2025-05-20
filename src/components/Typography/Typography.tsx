import React, { ReactNode } from 'react';

interface TypographyProps {
  children: ReactNode;
  className?: string;
}

// Headings
export const HeadingArticle = ({ children, className = '' }: TypographyProps) => (
  <h1 className={`text-headings-heading-article ${className}`}>{children}</h1>
);

export const HeadingPage = ({ children, className = '' }: TypographyProps) => (
  <h1 className={`text-headings-headings-page ${className}`}>{children}</h1>
);

export const Heading2 = ({ children, className = '' }: TypographyProps) => (
  <h2 className={`text-headings-heading-2 ${className}`}>{children}</h2>
);

export const Heading3 = ({ children, className = '' }: TypographyProps) => (
  <h3 className={`text-headings-heading-3 ${className}`}>{children}</h3>
);

export const HeadingArticleFeed = ({ children, className = '' }: TypographyProps) => (
  <h4 className={`text-headings-heading-article-feed ${className}`}>{children}</h4>
);

// Body text
export const BodyStandard = ({ children, className = '' }: TypographyProps) => (
  <p className={`text-body-body-standard ${className}`}>{children}</p>
);

export const BodyStandardRegular = ({ children, className = '' }: TypographyProps) => (
  <p className={`text-body-body-standard-regular ${className}`}>{children}</p>
);

export const BodyStandardBold = ({ children, className = '' }: TypographyProps) => (
  <p className={`text-body-body-standard-bold ${className}`}>{children}</p>
);

export const BodyArticle = ({ children, className = '' }: TypographyProps) => (
  <p className={`text-body-body-article ${className}`}>{children}</p>
);

export const BodyArticleIntro = ({ children, className = '' }: TypographyProps) => (
  <p className={`text-body-body-article-intro ${className}`}>{children}</p>
);

export const BodyArticleQuote = ({ children, className = '' }: TypographyProps) => (
  <blockquote className={`text-body-body-article-quote ${className}`}>{children}</blockquote>
);

// Meta text
export const MetaStandard = ({ children, className = '' }: TypographyProps) => (
  <span className={`text-meta-standard ${className}`}>{children}</span>
);

export const MetaCaption = ({ children, className = '' }: TypographyProps) => (
  <span className={`text-meta-caption ${className}`}>{children}</span>
);

export const MetaAuthor = ({ children, className = '' }: TypographyProps) => (
  <span className={`text-meta-author ${className}`}>{children}</span>
);

export const MetaDate = ({ children, className = '' }: TypographyProps) => (
  <span className={`text-meta-date ${className}`}>{children}</span>
);

// Special text elements
export const DropCap = ({ children, className = '' }: TypographyProps) => (
  <span className={`text-body-drop-cap ${className}`}>{children}</span>
);

export const ArticleCity = ({ children, className = '' }: TypographyProps) => (
  <span className={`text-body-body-article-city ${className}`}>{children}</span>
);

export const ArticleType = ({ children, className = '' }: TypographyProps) => (
  <span className={`text-body-body-article-type ${className}`}>{children}</span>
);
