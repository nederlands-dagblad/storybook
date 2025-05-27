import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NModal } from './NModal';
import Button from '@atoms/Button/Button';
import {ModalManager} from "./ModalManager.tsx";
import {useModalManager} from "@hooks/useModalManager.ts";

const meta = {
  title: 'Components/Modal',
  component: NModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NModal>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template: Story = (args) => {
  const [isOpen, setIsOpen] = useState(false);

  const { open } = useModalManager();

  console.log('args', args)

  const handleOpen = () => open('example-modal', args);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <ModalManager />
      <Button onClick={handleOpen}>Open Modal</Button>
    </>
  );
};

export const Default: Story = {
  args: {},
  render: Template,
};
