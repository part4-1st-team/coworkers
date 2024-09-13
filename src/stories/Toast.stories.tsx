import { Meta, StoryFn } from '@storybook/react';
import Toast, { ToastProps } from './ToastTest';

const meta: Meta<typeof Toast> = {
  title: 'Components/토스트',

  component: Toast,

  args: {
    type: 'Success',
  },
};

export default meta;

const Template: StoryFn<ToastProps> = (args) => <Toast {...args} />;

export const Success = Template.bind({});
Success.args = {
  type: 'Success',
};

export const Error = Template.bind({});
Error.args = {
  type: 'Error',
};
