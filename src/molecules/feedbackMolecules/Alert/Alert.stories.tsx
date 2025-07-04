import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Alert, { AlertProps, AlertVariant } from './Alert';
import {StoryObj} from "@storybook/react-vite";

const meta = {
  title: 'Molecules/Feedback Molecules/Alert',
  component: Alert,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['dark', 'danger', 'info', 'success', 'warning'],
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    variant: 'info',
  }
};

export const Info: Story = {
  args: {
    children: 'This is an info message.',
    variant: 'info',
  }
};

export const Dark: Story = {
  args: {
    children: 'This is a dark alert message.',
    variant: 'dark',
  }
};

export const Danger: Story = {
  args: {
    children: 'This is a danger alert message.',
    variant: 'danger',
  }
};

export const Success: Story = {
  args: {
    children: 'This is a success alert message.',
    variant: 'success',
  }
};

export const Warning: Story = {
  args: {
    children: 'This is a warning alert message.',
    variant: 'warning',
  }
};

