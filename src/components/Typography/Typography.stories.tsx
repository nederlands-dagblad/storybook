import type { Meta, StoryObj } from '@storybook/react';
import { 
  HeadingArticle, HeadingPage, Heading2, Heading3, HeadingArticleFeed,
  BodyStandard, BodyStandardRegular, BodyStandardBold, 
  BodyArticle, BodyArticleIntro, BodyArticleQuote,
  MetaStandard, MetaCaption, MetaAuthor, MetaDate,
  DropCap, ArticleCity, ArticleType
} from './Typography';

const meta: Meta = {
  title: 'Components/Typography',
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Headings: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h5 className="text-sm text-neutral-600 mb-2">Heading Article</h5>
        <HeadingArticle>The quick brown fox jumps over the lazy dog</HeadingArticle>
      </div>
      
      <div>
        <h5 className="text-sm text-neutral-600 mb-2">Heading Page</h5>
        <HeadingPage>The quick brown fox jumps over the lazy dog</HeadingPage>
      </div>
      
      <div>
        <h5 className="text-sm text-neutral-600 mb-2">Heading 2</h5>
        <Heading2>The quick brown fox jumps over the lazy dog</Heading2>
      </div>
      
      <div>
        <h5 className="text-sm text-neutral-600 mb-2">Heading 3</h5>
        <Heading3>The quick brown fox jumps over the lazy dog</Heading3>
      </div>
      
      <div>
        <h5 className="text-sm text-neutral-600 mb-2">Heading Article Feed</h5>
        <HeadingArticleFeed>The quick brown fox jumps over the lazy dog</HeadingArticleFeed>
      </div>
    </div>
  ),
};

export const BodyText: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h5 className="text-sm text-neutral-600 mb-2">Body Standard</h5>
        <BodyStandard>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.</BodyStandard>
      </div>
      
      <div>
        <h5 className="text-sm text-neutral-600 mb-2">Body Standard Regular</h5>
        <BodyStandardRegular>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.</BodyStandardRegular>
      </div>
      
      <div>
        <h5 className="text-sm text-neutral-600 mb-2">Body Standard Bold</h5>
        <BodyStandardBold>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.</BodyStandardBold>
      </div>
      
      <div>
        <h5 className="text-sm text-neutral-600 mb-2">Body Article</h5>
        <BodyArticle>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.</BodyArticle>
      </div>
      
      <div>
        <h5 className="text-sm text-neutral-600 mb-2">Body Article Intro</h5>
        <BodyArticleIntro>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.</BodyArticleIntro>
      </div>
      
      <div>
        <h5 className="text-sm text-neutral-600 mb-2">Body Article Quote</h5>
        <BodyArticleQuote>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</BodyArticleQuote>
      </div>
    </div>
  ),
};

export const MetaText: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h5 className="text-sm text-neutral-600 mb-2">Meta Standard</h5>
        <MetaStandard>Meta Standard - Lorem ipsum dolor sit amet</MetaStandard>
      </div>
      
      <div>
        <h5 className="text-sm text-neutral-600 mb-2">Meta Caption</h5>
        <MetaCaption>Meta Caption - Lorem ipsum dolor sit amet</MetaCaption>
      </div>
      
      <div>
        <h5 className="text-sm text-neutral-600 mb-2">Meta Author</h5>
        <MetaAuthor>Meta Author - Lorem ipsum dolor sit amet</MetaAuthor>
      </div>
      
      <div>
        <h5 className="text-sm text-neutral-600 mb-2">Meta Date</h5>
        <MetaDate>Meta Date - Lorem ipsum dolor sit amet</MetaDate>
      </div>
    </div>
  ),
};

export const SpecialElements: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h5 className="text-sm text-neutral-600 mb-2">Drop Cap</h5>
        <div className="relative">
          <DropCap>L</DropCap>
          <BodyArticle className="pl-16">orem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.</BodyArticle>
        </div>
      </div>
      
      <div>
        <h5 className="text-sm text-neutral-600 mb-2">Article City</h5>
        <ArticleCity>Amsterdam</ArticleCity>
      </div>
      
      <div>
        <h5 className="text-sm text-neutral-600 mb-2">Article Type</h5>
        <ArticleType>Interview</ArticleType>
      </div>
    </div>
  ),
};

export const ArticleExample: Story = {
  render: () => (
    <div className="max-w-2xl">
      <ArticleType>Interview</ArticleType>
      <ArticleCity>Amsterdam</ArticleCity>
      <HeadingArticle>The quick brown fox jumps over the lazy dog</HeadingArticle>
      <BodyArticleIntro>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.</BodyArticleIntro>
      <MetaAuthor>By John Doe</MetaAuthor> <MetaDate>• May 15, 2023</MetaDate>
      <div className="mt-6">
        <div className="relative">
          <DropCap>L</DropCap>
          <BodyArticle className="pl-16">orem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.</BodyArticle>
        </div>
        <BodyArticle className="mt-4">Suspendisse potenti. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.</BodyArticle>
        <BodyArticleQuote className="my-6">The greatest glory in living lies not in never falling, but in rising every time we fall.</BodyArticleQuote>
        <BodyArticle>Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget odio.</BodyArticle>
      </div>
    </div>
  ),
};
