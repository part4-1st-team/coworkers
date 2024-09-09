/* eslint-disable react/require-default-props */
import Button from '@/components/button/button';
import { IconEdit } from '@/assets/IconList';

type SizeType = 'large' | 'small';

interface EditButtonProps {
  /**
   * 버튼의 크기를 정의합니다.
   * - `large`: 큰 버튼
   * - `small`: 작은 버튼
   *
   * @default 'large'
   */
  size?: SizeType;
}

/**
 * `EditButton` 컴포넌트는 편집 아이콘을 가진 버튼입니다.
 *
 * 이 버튼은 `size` prop을 통해 크기를 조절할 수 있으며, 두 가지 크기 옵션 (`large`와 `small`)이 있습니다. 크기에 따라 버튼의 스타일과 아이콘의 크기가 변경됩니다.
 *
 * @param {EditButtonProps} props - 버튼의 크기를 정의하는 속성
 * @param {SizeType} [props.size='large'] - 버튼의 크기. 기본값은 'large'입니다.
 *
 * @returns {JSX.Element} 렌더링된 편집 버튼 요소
 *
 * @example
 * ```tsx
 * <EditButton size='small' />
 * <EditButton size='large' />
 * ```
 */
function EditButton({ size = 'large' }: EditButtonProps) {
  const sizeStyles = {
    large: {
      buttonClass: 'w-[32px] h-[32px] min-w-[10px] min-h-[10px]',
      iconWidth: 12,
      iconHeight: 16,
      borderClass: 'border-none',
    },
    small: {
      buttonClass: 'w-[18px] h-[18px]',
      iconWidth: 8,
      iconHeight: 10,
      borderClass: 'border-2 border-background-primary',
    },
  };

  const { buttonClass, iconWidth, iconHeight, borderClass } = sizeStyles[size];

  return (
    <Button
      type='button'
      rounded
      className={`${buttonClass} ${borderClass} bg-background-tertiary flex items-center justify-center hover:bg-interaction-hover active:bg-interaction-pressed`}
    >
      <IconEdit
        width={iconWidth}
        height={iconHeight}
        className='flex-shrink-0'
      />
    </Button>
  );
}

export default EditButton;
