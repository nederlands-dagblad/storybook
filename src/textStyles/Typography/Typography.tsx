import React, { ReactNode } from 'react';

/**
 * Typography Components
 *
 * IMPORTANT: These components are NOT automatically updated when design tokens change.
 * If you add/modify text styles in tokens.css, you must manually update this file.
 *
 * WHEN TO USE:
 * - ✅ Content-heavy pages (articles, blog posts) where semantic HTML is critical
 * - ✅ When you need to enforce proper HTML tags (e.g., always use <h1> for article headings)
 * - ✅ For teams that prefer components over utility classes
 *
 * WHEN NOT TO USE:
 * - ❌ UI components (buttons, cards, alerts) - use Tailwind classes directly instead
 * - ❌ When you need flexibility to override the HTML tag
 * - ❌ If your team is comfortable with Tailwind utility classes
 *
 * EXAMPLES:
 *
 * Using Typography components:
 * ```tsx
 * <HeadingArticle className="text-text-default">
 *   The Future of Design
 * </HeadingArticle>
 * <BodyArticleIntro className="text-text-subtle">
 *   Exploring modern design systems...
 * </BodyArticleIntro>
 * ```
 *
 * Equivalent with Tailwind classes:
 * ```tsx
 * <h1 className="text-article-heading text-text-default">
 *   The Future of Design
 * </h1>
 * <p className="text-article-intro text-text-subtle">
 *   Exploring modern design systems...
 * </p>
 * ```
 *
 * MAINTENANCE NOTE:
 * When adding new text styles to the design system:
 * 1. Add the style to tokens.css
 * 2. Run the token generation script (generates tokens.utilities.js)
 * 3. Manually add a new component here following the existing pattern
 * 4. Update this documentation and Storybook stories
 */


export interface TypographyProps {
  children: ReactNode;
  className?: string;
}

// Headings
export const HeadingArticle = ({ children, className = '' }: TypographyProps) => (
  <h1 className={`text-article-heading ${className}`}>{children}</h1>
);

export const HeadingPage = ({ children, className = '' }: TypographyProps) => (
  <h1 className={`text-heading-page ${className}`}>{children}</h1>
);

export const Heading2 = ({ children, className = '' }: TypographyProps) => (
  <h2 className={`text-heading-2 ${className}`}>{children}</h2>
);

export const Heading3 = ({ children, className = '' }: TypographyProps) => (
  <h3 className={`text-heading-3 ${className}`}>{children}</h3>
);

export const HeadingArticleFeed = ({ children, className = '' }: TypographyProps) => (
  <h2 className={`text-article-feed-heading ${className}`}>{children}</h2>
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
  <span className={`text-meta ${className}`}>{children}</span>
);

export const MetaRegular = ({ children, className = '' }: TypographyProps) => (
  <span className={`text-meta-regular ${className}`}>{children}</span>
);

export const MetaAuthor = ({ children, className = '' }: TypographyProps) => (
  <span className={`text-meta-bold ${className}`}>{children}</span>
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
