// src/stories/Button.stories.tsx
import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import Button from '@/components/button'; // Button 컴포넌트의 경로를 올바르게 설정하세요

export default {
  title: 'Example/Button',
  component: Button,
  argTypes: {
    type: {
      control: { type: 'select', options: ['bar', 'fullRounded', 'circle'] },
    },
    color: {
      control: {
        type: 'select',
        options: [
          'primary',
          'hover',
          'disabled',
          'danger',
          'outline',
          'outlineDisabled',
          '',
        ],
      },
    },
    size: {
      control: {
        type: 'select',
        options: ['square', 'XS', 'S', 'M', 'L', 'XL', 'XXL', ''],
      },
    },
    fullWidth: {
      control: 'boolean',
    },
    icon: {
      control: 'boolean',
    },
    className: {
      control: 'text',
    },
  },
} as Meta<typeof Button>;

const Template: StoryFn = (args) => <Button {...args}>Button Text</Button>;

export const Default = Template.bind({});
Default.args = {
  type: 'bar',
  color: 'primary',
  size: 'M',
  fullWidth: false,
  icon: false,
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  type: 'fullRounded',
  color: 'danger',
  size: 'L',
  fullWidth: true,
  icon: true,
  children: (
    <>
      <Button.Icon icon={<span>🚀</span>} />
      <Button.Text>Icon Button</Button.Text>
    </>
  ),
};

export const CustomSize = Template.bind({});
CustomSize.args = {
  type: 'circle',
  color: 'outline',
  size: '',
  fullWidth: false,
  className: 'w-[150px] h-[50px]',
  children: (
    <>
      <Button.Icon icon={<span>⚙️</span>} />
      <Button.Text>Custom Size</Button.Text>
    </>
  ),
};
