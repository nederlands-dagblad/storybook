import Icon from "./Icon.tsx";
import {Meta, StoryObj} from "@storybook/react-vite";
import icons from "./list.ts";
import iconList from "./list.ts";

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
      options: iconList.getIconNames(),
      default: 'users-outline'
    },
    variant: {
      control: 'select',
      options: ['outline', 'fill'],
      description: 'Icon variant',
    },
    size: {
      control: 'select',
      options: ['s', 'm', 'l', 'xl', 'xxl'],
    },
    color: {
      control: 'select',
      options: ['default', 'gray', 'brand', 'warning', 'inverse', 'button-primary', 'button-secondary', 'button-pill'],
    },
    className: { control: 'text' }
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'users',
    variant: 'outline',
    size: 's',
    color: 'default',
  },
};
