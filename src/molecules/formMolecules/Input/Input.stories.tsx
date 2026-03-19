import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { StoryObj } from "@storybook/react-vite";
import Input, { InputProps } from './Input';

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

export const WithHelpAndErrors: Story = {
  args: {
    label: 'Input with Help and Errors',
    help: 'This is a helpful description',
    errors: ['This field is required'],
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
