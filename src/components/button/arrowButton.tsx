/* eslint-disable react/require-default-props */
import clsx from 'clsx';
import { IconArrowLeft, IconArrowRight } from '@/assets/IconList';
import CircleButton from './CircleButton';
import { SetStateAction } from 'react';

type ArrowButtonProps = {
  direction: 'left' | 'right';
  className?: string;
  onClick: () => SetStateAction<any>;
};

/**
 * ArrowButton 컴포넌트는 왼쪽 또는 오른쪽 방향의 화살표 아이콘이 있는 원형 버튼을 나타냅니다.
 *
 * @component
 * @example
 * <ArrowButton direction="left" className="my-custom-class" />
 * <ArrowButton direction="right" />
 *
 * @param {Object} props - 컴포넌트의 속성입니다.
 * @param {'left' | 'right'} props.direction - 버튼이 표시할 방향을 결정합니다. 'left'는 왼쪽 방향 화살표, 'right'는 오른쪽 방향 화살표를 나타냅니다.
 * @param {string} [props.className] - 버튼에 적용할 선택적인 추가 클래스 이름입니다.
 *
 * @returns {JSX.Element} 사전 정의된 스타일과 선택적 클래스를 적용한 왼쪽 또는 오른쪽 방향의 화살표 아이콘이 있는 원형 버튼을 반환합니다.
 */
function ArrowButton({ direction, className, onClick }: ArrowButtonProps) {
  const isLeft = direction === 'left';

  const buttonClass = clsx(
    'w-16 h-16 border-none bg-background-secondary hover:bg-interaction-hover focus:bg-interaction-pressed',
    className,
  );

  return (
    <CircleButton
      type='button'
      icon={isLeft ? <IconArrowLeft /> : <IconArrowRight />}
      onClick={onClick}
      className={buttonClass} // 병합된 클래스를 CircleButton에 전달
    />
  );
}

export default ArrowButton;
