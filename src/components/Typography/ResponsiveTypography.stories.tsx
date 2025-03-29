import type { Meta, StoryObj } from '@storybook/react';
import { ResponsiveHeading, ResponsiveBody, ResponsiveText } from './ResponsiveTypography';

const meta = {
  title: 'Components/Typography/Responsive',
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ResponsiveTypographyDemo: Story = {
  render: () => (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h5 className="text-sm text-neutral-600 mb-2">Responsive Heading</h5>
        <p className="text-xs text-neutral-500 mb-4">This heading will change size at different breakpoints</p>
        <ResponsiveHeading>This heading adapts to screen size</ResponsiveHeading>
      </div>
      
      <div>
        <h5 className="text-sm text-neutral-600 mb-2">Responsive Body Text</h5>
        <p className="text-xs text-neutral-500 mb-4">This text will change size at different breakpoints</p>
        <ResponsiveBody>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. 
          Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus 
          rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna 
          non est bibendum non venenatis nisl tempor.
        </ResponsiveBody>
      </div>
      
      <div className="p-4 border border-neutral-200 rounded-md">
        <h5 className="text-sm text-neutral-600 mb-2">Viewport Size Test</h5>
        <p className="text-xs text-neutral-500 mb-4">Resize your browser to see the changes</p>
        <div className="flex flex-col gap-2">
          <div className="hidden sm:block md:hidden">
            <ResponsiveText className="text-pink-600">You're viewing on a small tablet (sm breakpoint)</ResponsiveText>
          </div>
          <div className="hidden md:block lg:hidden">
            <ResponsiveText className="text-blue-500">You're viewing on a tablet (md breakpoint)</ResponsiveText>
          </div>
          <div className="hidden lg:block xl:hidden">
            <ResponsiveText className="text-brown-800">You're viewing on a desktop (lg breakpoint)</ResponsiveText>
          </div>
          <div className="hidden xl:block">
            <ResponsiveText className="text-neutral-800">You're viewing on a large desktop (xl breakpoint)</ResponsiveText>
          </div>
          <div className="block sm:hidden">
            <ResponsiveText className="text-neutral-600">You're viewing on a mobile device</ResponsiveText>
          </div>
        </div>
      </div>
    </div>
  ),
};
