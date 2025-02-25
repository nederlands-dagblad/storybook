import CollapsedCard from './CollapsedCard.vue';
import Button from '../Button/Button.vue';

/**
 * The CollapsedCard component is used to show/hide content in a collapsible container.
 * It's useful for FAQs, accordion menus, and other expandable content sections.
 */
export default {
  title: 'Components/CollapsedCard',
  component: CollapsedCard,
  argTypes: {
    title: {
      control: 'text',
      description: 'The title displayed in the header',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Card Title' },
      },
    },
    collapsed: {
      control: 'boolean',
      description: 'Whether the card is initially collapsed',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    toggle: { 
      action: 'toggled',
      description: 'Event emitted when the card is expanded or collapsed',
    },
  },
};

const Template = (args) => ({
  components: { CollapsedCard },
  setup() {
    return { args };
  },
  template: `
    <CollapsedCard v-bind="args">
      <p>{{ args.content || "This is the collapsible content of the card. Click the header to toggle." }}</p>
    </CollapsedCard>
  `,
});

export const Default = Template.bind({});
Default.args = {
  title: 'Click to expand',
  collapsed: true,
  content: 'This is the default collapsed card. Click the header to expand it.'
};

export const Expanded = Template.bind({});
Expanded.args = {
  title: 'Click to collapse',
  collapsed: false,
  content: 'This card is initially expanded. Click the header to collapse it.'
};

export const WithCustomHeader = (args) => ({
  components: { CollapsedCard, Button },
  setup() {
    return { args };
  },
  template: `
    <CollapsedCard :collapsed="args.collapsed">
      <template #header>
        <div class="flex items-center">
          <span class="mr-2">🔍</span>
          <span>Custom Header with Icon</span>
        </div>
      </template>
      <p>This card has a custom header with an icon.</p>
      <div class="mt-4">
        <Button variant="primary" size="sm">Action Button</Button>
      </div>
    </CollapsedCard>
  `,
});
WithCustomHeader.args = {
  collapsed: true
};

export const FAQ = (args) => ({
  components: { CollapsedCard },
  setup() {
    return { args };
  },
  template: `
    <div class="space-y-2">
      <CollapsedCard title="What is a design system?">
        <p>A design system is a collection of reusable components, guided by clear standards, that can be assembled to build any number of applications.</p>
      </CollapsedCard>
      <CollapsedCard title="Why use a component library?">
        <p>Component libraries help maintain consistency across applications, speed up development, and make it easier to implement design changes.</p>
      </CollapsedCard>
      <CollapsedCard title="How do I contribute to this design system?">
        <p>You can contribute by creating new components, improving existing ones, or updating documentation. Please follow the contribution guidelines.</p>
      </CollapsedCard>
    </div>
  `,
});
