import type { Meta, StoryObj } from '@storybook/react';
import DescriptionList from './DescriptionList';
import DescriptionListItems from './DescriptionListItems';
import DescriptionListItem from './DescriptionListItem';
import Icon from "../../../atoms/Icon/Icon.tsx";

const meta = {
  title: 'Components/Portal/DescriptionList',
  component: DescriptionList,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DescriptionList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Description List',
    children: (
      <DescriptionListItems>
        <DescriptionListItem term="Name">John Doe</DescriptionListItem>
        <DescriptionListItem term="Email">john.doe@example.com</DescriptionListItem>
        <DescriptionListItem term="Phone">+1 234 567 890</DescriptionListItem>
      </DescriptionListItems>
    ),
  },
};

export const WithActions: Story = {
  args: {
    title: 'Description List with Actions',
    actions: <button><Icon name="pencil-simple-outline"></Icon></button>,
    children: (
      <DescriptionListItems>
        <DescriptionListItem term="Name">John Doe</DescriptionListItem>
        <DescriptionListItem term="Email">john.doe@example.com</DescriptionListItem>
      </DescriptionListItems>
    ),
  },
};

export const WithFooter: Story = {
  args: {
    title: 'Description List with Footer',
    footer: <div>Last updated: Today</div>,
    children: (
      <DescriptionListItems>
        <DescriptionListItem term="Name">John Doe</DescriptionListItem>
        <DescriptionListItem term="Email">john.doe@example.com</DescriptionListItem>
      </DescriptionListItems>
    ),
  },
};

export const Loading: Story = {
  args: {
    title: 'Loading Description List',
    isLoading: true,
    children: (
      <DescriptionListItems isLoading>
        <DescriptionListItem skeleton="md" />
        <DescriptionListItem skeleton="md" />
        <DescriptionListItem skeleton="md" />
      </DescriptionListItems>
    ),
  },
};
