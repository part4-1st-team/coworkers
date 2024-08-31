import type { Meta, StoryFn } from '@storybook/react';

// 문서화할 컴포넌트 가져오기
import Button, { props } from './buttonExample';

// 스토리북에서 컴포넌트를 어떻게 문서화할지 설정하는 메타데이터
const meta: Meta<typeof Button> = {
  // 스토리북내 에서 스토리를 그룹화하는 제목
  title: 'Components/ButtonEx/버튼',

  // 문서화할 컴포넌트
  component: Button,

  // 스토리의 기본 인수
  // 공통적으로 가지는 기본 속성을 설정
  args: {
    variant: 'primary', // 기본값 설정
    size: 'large', // 기본값 설정
    onClick: () => alert('버튼 클릭'),
  },
};

export default meta;

/**
 * Template 함수는 Storybook 스토리에서 버튼 컴포넌트를 렌더링하기 위한 기본 템플릿을 정의합니다.
 *
 * 이 함수는 `args`를 받아서 Button 컴포넌트에 전달하며, Button 컴포넌트가 렌더링됩니다.
 * `args`는 Storybook에서 설정된 인수들로, 스토리에서 다양한 상태의 버튼을 테스트할 수 있게 합니다.
 *
 * @param args - 버튼 컴포넌트에 전달될 속성들입니다. 예를 들어, variant, size, onClick 등.
 * @returns 버튼 컴포넌트를 렌더링하는 JSX 엘리먼트입니다.
 */
const Template: StoryFn<props> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
};
