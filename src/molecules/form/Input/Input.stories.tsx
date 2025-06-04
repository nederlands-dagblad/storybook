import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { StoryObj } from "@storybook/react-vite";
import Input, { InputProps } from './Input';

/**
 * ## HTML
 *
 * ```html
 * <div class="nd-form-group">
 *
 *   <label class="label" for="input-id">Label</label>
 *
 *   <input class="nd-form-input" id="input-id" type="text" placeholder="Enter text..." />
 *
 *   <span class="help">This is a helpful description</span>
 *
 *   <span class="error">Error message</span>
 *
 * </div>
 * ```
 *
 */
const meta = {
  title: 'Molecules/Form/Input',
  component: Input,
  argTypes: {
    value: { control: 'text' },
    label: { control: 'text' },
    help: { control: 'text' },
    errors: { control: 'object' },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Default Input',
    value: '',
    setValue: () => {},
    placeholder: 'Enter text...'
  }
};

export const WithHelp: Story = {
  args: {
    label: 'Input with Help Text',
    help: 'This is a helpful description',
    value: '',
    setValue: () => {},
    placeholder: 'Enter text...'
  }
};

export const WithErrors: Story = {
  args: {
    label: 'Input with Errors',
    errors: ['First error message', 'Second error message'],
    value: '',
    setValue: () => {},
    placeholder: 'Enter text...'
  }
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    disabled: true,
    value: 'Disabled value',
    setValue: () => {},
    placeholder: 'Cannot edit this'
  }
};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = React.useState('');

    return (
      <Input
        {...args}
        value={value}
        setValue={setValue}
      />
    );
  },
  args: {
    label: 'Controlled Input',
    placeholder: 'Type something...'
  }
};
