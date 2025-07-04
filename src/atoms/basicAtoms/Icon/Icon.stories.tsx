import Icon from "./Icon.tsx";
import {Meta, StoryObj} from "@storybook/react-vite";
import icons from "./list.ts";

const meta = {
  title: 'Atoms/Basic Atoms/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: icons.keys(),
      default: 'users-outline'
    },
    className: { control: 'text' }
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'users-outline'
  },
};
