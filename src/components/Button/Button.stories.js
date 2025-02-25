import Button from './Button.vue';

/**
 * Buttons are used to trigger actions or events, such as submitting a form,
 * opening a dialog, canceling an action, or performing a delete operation.
 *
 * ```html
 * <Button variant="primary" size="md">
 *     Primary Button
 * </Button>
 * ```
 */

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'white'],
      description: 'The visual style of the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'The size of the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the button is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    onClick: { 
      action: 'clicked',
      description: 'Event emitted when the button is clicked',
    },
  },
};

const Template = (args) => ({
  components: { Button },
  setup() {
    return { args };
  },
  template: '<Button v-bind="args">{{ args.default || "Button" }}</Button>',
});

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  size: 'md',
  default: 'Primary Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
  size: 'md',
  default: 'Secondary Button',
};

export const Small = Template.bind({});
Small.args = {
  variant: 'primary',
  size: 'sm',
  default: 'Small Button',
};

export const Medium = Template.bind({});
Medium.args = {
  variant: 'primary',
  size: 'md',
  default: 'Medium Button',
};

export const Large = Template.bind({});
Large.args = {
  variant: 'primary',
  size: 'lg',
  default: 'Large Button',
};

export const White = Template.bind({});
White.args = {
  variant: 'white',
  size: 'md',
  default: 'White Button',
};

export const Disabled = Template.bind({});
Disabled.args = {
  variant: 'primary',
  size: 'md',
  disabled: true,
  default: 'Disabled Button',
};
