/* eslint-disable react/require-default-props */
import { SetStateAction } from 'react';
import { IconEdit } from '@/assets/IconList';
import clsx from 'clsx';
import CircleButton from './CircleButton';

type SizeType = 'sm' | 'lg';

interface EditButtonProps {
  size: SizeType;
  className?: string;
  onClick: () => SetStateAction<any>;
}

/**
 * EditButton 컴포넌트는 크기가 조정 가능한 원형 버튼에 편집 아이콘을 표시합니다.
 *
 * @component
 * @example
 * <EditButton size="sm" className="my-custom-class" />
 * <EditButton size="lg" />
 *
 * @param {Object} props - 컴포넌트의 속성입니다.
 * @param {'sm' | 'lg'} props.size - 버튼의 크기를 결정합니다. 'sm'은 작은 버튼, 'lg'는 큰 버튼을 나타냅니다.
 * @param {string} [props.className] - 버튼에 적용할 선택적인 추가 클래스 이름입니다.
 *
 * @returns {JSX.Element} 주어진 크기와 스타일을 적용한 편집 아이콘이 있는 원형 버튼을 반환합니다.
 */
function EditButton({ size, className, onClick }: EditButtonProps) {
  const buttonClass = clsx(
    size === 'lg'
      ? 'w-32 h-32'
      : 'w-18 h-18 border-1 border-background-primary dark:border-background-primary-dark',
    'border-none bg-background-tertiary dark:bg-background-tertiary-dark hover:bg-interaction-hover focus:bg-interaction-pressed pl-1 pt-1',
    className,
  );

  const iconClass = clsx(size === 'lg' ? 'w-14' : 'w-10');

  return (
    <CircleButton
      icon={<IconEdit className={iconClass} />}
      className={buttonClass}
      onClick={onClick}
    />
  );
}

export default EditButton;
