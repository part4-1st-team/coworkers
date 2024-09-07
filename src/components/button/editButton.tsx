/* eslint-disable react/require-default-props */
import Button from '@/components/button/button';
import Image from 'next/image';

type SizeType = 'large' | 'small';

interface EditButtonProps {
  size?: SizeType;
}

function EditButton({ size = 'large' }: EditButtonProps) {
  const sizeStyles = {
    large: {
      buttonClass: 'w-[32px] h-[32px] min-w-[10px] min-h-[10px]',
      iconWidth: 12,
      iconHeight: 16,
      borderClass: 'border-none',
    },
    small: {
      buttonClass: 'w-6 h-6',
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
      className={`${buttonClass} ${borderClass} bg-background-tertiary flex items-center justify-center`}
    >
      <Image
        src='/svgs/ic_edit.svg'
        alt='Edit Icon'
        width={iconWidth}
        height={iconHeight}
        layout='fixed'
        className='inline-block object-contain '
      />
    </Button>
  );
}

export default EditButton;

/*
 * `EditButton` 컴포넌트는 '편집' 아이콘을 가진 버튼을 렌더링합니다.
 *
 * ## Props
 *
 * - `size` (선택적): 버튼의 크기를 결정합니다.
 *   - `large`: 큰 버튼 (기본값)
 *   - `small`: 작은 버튼
 *
 * ## 사용 방법
 *
 * ```tsx
 * <EditButton size='large' />  // 기본값, 큰 버튼
 * <EditButton size='small' />  // 작은 버튼
 * ```
 *
 * ## 스타일
 *
 * - 버튼 크기:
 *   - `large`: `w-[32px] h-[32px]`
 *   - `small`: `w-6 h-6`
 * - 버튼의 보더:
 *   - `large`: `border-none`
 *   - `small`: `border-2 border-background-primary`
 * - 버튼 배경 색상: `bg-background-tertiary`
 * - 아이콘 크기:
 *   - `large`: `width={12} height={16}`
 *   - `small`: `width={8} height={10}`
 *
 * ## 아이콘
 *
 * - 아이콘 경로: `/svgs/ic_edit.svg`
 * - 아이콘 대체 텍스트: `Edit Icon`
 */
