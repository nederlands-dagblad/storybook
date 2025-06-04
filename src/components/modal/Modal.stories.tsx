import React, {useEffect, useState} from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
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
  const [modalArgs, setModalArgs] = useState(args);

  useEffect(() => {
    setModalArgs(args);
  }, [args])

  const handleOpen = () => {
    setModalArgs(prevArgs => ({
      ...prevArgs,
      open: true
    }));
  }

  const onClose = () => {
    setModalArgs(prevArgs => ({
      ...prevArgs,
      open: false
    }));
  }

  return (
    <>
      <NModal {...modalArgs} onClose={onClose}>
        This is a simple modal using the NModal component.
      </NModal>
      <Button onClick={handleOpen}>Open Modal</Button>
    </>
  );
};

export const Default: Story = {
  args: {
    modalTitle: 'This is the title'
  },
  render: Template,
};

export const WithSubTitle: Story = {
  args: {
    modalTitle: 'This is the title',
    modalSubTitle: 'This is the subtitle',
  },
  render: Template,
}

export const WithFooter: Story = {
  args: {
    modalTitle: 'This is the title',
    footer: <Button variant="ghost">Close</Button>,
  },
  render: Template,
};

/**
 * The simplified version of the modal is a more compact version that is used for simple modals. Basically, it won't show borders between the header, body and footer.
 */
export const Simplified: Story = {
  args: {
    modalTitle: 'This is the title',
    simplified: true,
  },
  render: Template,
}

/**
 * With custom sizes like `xl`, you can create larger modals that are suitable for displaying more content or complex forms.
 */
export const WithCustomSize: Story = {
  args: {
    modalTitle: 'This is the title',
    size: 'xl',
  },
  render: Template,
};

export const WithoutFooter: Story = {
  args: {
    modalTitle: 'This is the title',
    noFooter: true,
  },
  render: Template,
};

export const WithoutHeader: Story = {
  args: {
    hideHeader: true,
    closeButton: false,
    noFooter: true
  },
  render: Template,
}

export const WithoutCloseButton: Story = {
  args: {
    modalTitle: 'This is the title',
    closeButton: false,
  },
  render: Template,
}

export const NoCloseOnBackdrop: Story = {
  args: {
    modalTitle: 'This is the title',
    noCloseOnBackdrop: true,
  },
  render: Template,
}
