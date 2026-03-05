import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { StoryObj } from "@storybook/react-vite";
import Input, { InputProps } from './Input';

/**
 * ## HTML
 *
 * ```html
 * <div class="space-y-1 font-fira-sans">
 *
 *   <label class="label" for="input-id">Label</label>
 *
 *   <input class="w-full px-3 py-2 border border-border-default text-black dark:bg-background-brand dark:text-[#f0f0f0] dark:border-border-default focus:dark:border-border-default focus:dark:ring-2 focus:dark:ring-white/10" id="input-id" type="text" placeholder="Enter text..." />
 *
 *   <span class="text-text-gray text-meta">This is a helpful description</span>
 *
 *   <span class="text-text-warning text-meta">Error message</span>
 *
 * </div>
 * ```
 *
 */
const meta = {
  title: 'Molecules/Form Molecules/Input',
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

export const DatePicker: Story = {
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
    label: 'Date Picker',
    help: 'Click the input or the calendar icon to pick a date',
    datePicker: true,

  }
};

export const DatePickerWithMinMax: Story = {
  render: (args) => {
    const [value, setValue] = React.useState('');

    const today = new Date();
    const in30Days = new Date();
    in30Days.setDate(today.getDate() + 30);

    return (
        <Input
            {...args}
            value={value}
            setValue={setValue}
            minDate={today}
            maxDate={in30Days}
        />
    );
  },
  args: {
    label: 'Date Picker (next 30 days only)',
    help: 'Only dates within the next 30 days can be selected',

    datePicker: true,
  }
};

export const DatePickerWithErrors: Story = {
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
    label: 'Date Picker with Errors',
    datePicker: true,

    errors: ['Please select a valid date'],
  }
};
