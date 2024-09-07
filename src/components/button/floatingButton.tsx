/* eslint-disable react/require-default-props */
import Button from '@/components/button/button';
import clsx from 'clsx';
import {
  IconPlus,
  IconCheckWhite,
  IconCheckGray,
  IconCheckGreen,
} from '@/assets/IconList';

type FloatingButtonType = 'add' | 'complete' | 'cancel';
type ColorType = 'primary' | 'white';

interface FloatingButtonProps {
  type: FloatingButtonType;
  disabled?: boolean;
  className?: string;
}

/**
 * 버튼의 유형을 정의합니다.
 * - `'add'`: 할 일을 추가하는 버튼
 * - `'complete'`: 완료하는 버튼
 * - `'cancel'`: 취소하는 버튼
 */

const iconMap: Record<
  FloatingButtonType,
  {
    icon: React.ReactNode;
    color: ColorType;
    text: string;
    size: string;
    disabledIcon?: React.ReactNode;
  }
> = {
  add: {
    icon: <IconPlus />,
    color: 'primary',
    text: '할 일 추가',
    size: 'w-[125px] h-[48px]',
  },
  complete: {
    icon: <IconCheckWhite className='text-text-inverse' />,
    color: 'primary',
    text: '완료하기',
    size: 'w-[111px] h-[40px]',
  },
  cancel: {
    icon: <IconCheckGreen />,
    color: 'white',
    text: '완료 취소하기',
    size: 'w-[138px] h-[40px]',
    disabledIcon: <IconCheckGray />,
  },
};

function FloatingButton({
  type,
  disabled = false,
  className,
}: FloatingButtonProps) {
  const { icon, color, text, size, disabledIcon } = iconMap[type] || {
    icon: <IconCheckWhite />,
    color: 'primary',
    text: '할 일 추가',
    size: 'w-10 h-10',
  };

  // 디스에이블 상태에 따른 아이콘 소스 결정
  const iconNode = disabled && disabledIcon ? disabledIcon : icon;

  return (
    <Button
      type='button'
      rounded
      color={color}
      disabled={disabled}
      icon={iconNode}
      className={clsx(size, className)}
    >
      {text}
    </Button>
  );
}

export default FloatingButton;
