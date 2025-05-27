import type { Meta, StoryObj } from '@storybook/react';
import {
  HeadingArticle, HeadingPage, Heading2, Heading3, HeadingArticleFeed,
  BodyStandard, BodyStandardRegular, BodyStandardBold,
  BodyArticle, BodyArticleIntro, BodyArticleQuote,
  MetaStandard, MetaAuthor,
  DropCap, ArticleCity, ArticleType, MetaRegular
} from './Typography';
import {MetaBold} from "./ResponsiveTypography.tsx";

const meta: Meta = {
  title: 'Atoms/Typography',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const StyleExample: React.FC<{Tag: string, name: string, content: string}> = ({Tag = 'h1', name, content}) => (
    <div className="space-y-6">
      <div className="space-y-4">
        <Tag className={[name, "mb-2"].join(' ')}>
          {content}
        </Tag>
        <code className="mt-4 bg-gray-100 p-1 rounded-md text-sm">{name}</code>
      </div>
    </div>
);

export const ArticleStyles: Story = {
  parameters: {
    docs: {
      source: {
        code: null, // Hides code block in Docs tab
      },
    },
  },
  render: () => (
    <div className="max-w-2xl space-y-8">
      <StyleExample
        tag="h1"
        name="text-article-heading"
        content="The quick brown fox jumps over the lazy dog"
      />
      <StyleExample
        tag="h1"
        name="text-article-heading-light"
        content="The quick brown fox jumps over the lazy dog"
      />
      <StyleExample
        tag="h1"
        name="text-article-heading-alternate"
        content="The quick brown fox jumps over the lazy dog"
      />
      <StyleExample
        tag="h2"
        name="text-article-heading-2"
        content="The quick brown fox jumps over the lazy dog"
      />
      <StyleExample
        tag="h2"
        name="text-article-heading-2-light"
        content="The quick brown fox jumps over the lazy dog"
      />
      <StyleExample
        tag="h2"
        name="text-article-heading-2-alternate"
        content="The quick brown fox jumps over the lazy dog"
      />
      <StyleExample
        tag="h2"
        name="text-article-body"
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin scelerisque purus ut orci tincidunt lobortis. Fusce semper purus elit, ullamcorper imperdiet est semper ut."
      />
      <StyleExample
        tag="h2"
        name="text-article-intro"
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin scelerisque purus ut orci tincidunt lobortis. Fusce semper purus elit, ullamcorper imperdiet est semper ut."
      />
      <StyleExample
        tag="h2"
        name="text-article-type"
        content="Interview"
      />
      <StyleExample
        tag="h2"
        name="text-article-city"
        content="Rutten"
      />
      <StyleExample
        tag="h2"
        name="text-article-quote"
        content="Oh Chantal"
      />
      <StyleExample
        tag="h2"
        name="text-article-question"
        content="Wat is uw enige troost in leven en sterven?"
      />
      <StyleExample
        tag="h2"
        name="text-article-drop-cap"
        content="P"
      />
      <StyleExample
        tag="h2"
        name="text-article-drop-cap-alternate"
        content="H"
      />
    </div>
  ),
}

export const Headings: Story = {
  parameters: {
    docs: {
      source: {
        code: null, // Hides code block in Docs tab
      },
    },
  },
  render: () => (
    <div className="space-y-8">
      <StyleExample
        tag="h1"
        name="text-heading-page"
        content="The quick brown fox jumps over the lazy dog"
      />
      <StyleExample
        tag="h2"
        name="text-heading-subheading"
        content="The quick brown fox jumps over the lazy dog"
      />
      <StyleExample
        tag="h2"
        name="text-heading-2"
        content="The quick brown fox jumps over the lazy dog"
      />
      <StyleExample
        tag="h2"
        name="text-heading-3"
        content="The quick brown fox jumps over the lazy dog"
      />
      <StyleExample
        tag="h2"
        name="text-heading-uppercase"
        content="The quick brown fox jumps over the lazy dog"
      />
    </div>
  ),
};

export const BodyText: Story = {
  parameters: {
    docs: {
      source: {
        code: null, // Hides code block in Docs tab
      },
    },
  },
  render: () => (
    <div className="space-y-8">
      <StyleExample
        tag="p"
        name="text-body-light"
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin scelerisque purus ut orci tincidunt lobortis. Fusce semper purus elit, ullamcorper imperdiet est semper ut."
      />
      <StyleExample
        tag="p"
        name="text-body-regular"
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin scelerisque purus ut orci tincidunt lobortis. Fusce semper purus elit, ullamcorper imperdiet est semper ut."
      />
      <StyleExample
        tag="p"
        name="text-body-bold"
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin scelerisque purus ut orci tincidunt lobortis. Fusce semper purus elit, ullamcorper imperdiet est semper ut."
      />
      <StyleExample
        tag="p"
        name="text-body-uppercase"
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin scelerisque purus ut orci tincidunt lobortis. Fusce semper purus elit, ullamcorper imperdiet est semper ut."
      />
      <StyleExample
        tag="p"
        name="text-body-uppercase-bold"
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin scelerisque purus ut orci tincidunt lobortis. Fusce semper purus elit, ullamcorper imperdiet est semper ut."
      />
      <StyleExample
        tag="p"
        name="text-body-uppercase-bold-small"
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin scelerisque purus ut orci tincidunt lobortis. Fusce semper purus elit, ullamcorper imperdiet est semper ut."
      />
    </div>
  ),
};

export const MetaText: Story = {
  parameters: {
    docs: {
      source: {
        code: null, // Hides code block in Docs tab
      },
    },
  },
  render: () => (
    <div className="space-y-8">
      <StyleExample
        tag="p"
        name="text-meta"
        content="This is a meta text"
      />
      <StyleExample
        tag="p"
        name="text-meta-light"
        content="This is a meta light text"
      />
      <StyleExample
        tag="p"
        name="text-meta-bold"
        content="This is a meta bold text"
      />
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
      <MetaAuthor>By John Doe</MetaAuthor>
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
