// /* eslint-disable react/require-default-props */
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
  text?: string; // 외부에서 커스텀 가능한 텍스트 prop 추가
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
    icon: <IconPlus width={16} height={16} />,
    color: 'primary',
    text: '할 일 추가',
    size: 'h-48',
  },
  complete: {
    icon: <IconCheckWhite className='text-text-inverse' />,
    color: 'primary',
    text: '완료하기',
    size: 'w-auto h-40',
  },
  cancel: {
    icon: <IconCheckGreen />,
    color: 'white',
    text: '완료 취소하기',
    size: 'h-40',
    disabledIcon: <IconCheckGray />,
  },
};

function FloatingButton({
  type,
  disabled = false,
  className,
  text, // 외부에서 전달받을 text prop
}: FloatingButtonProps) {
  const {
    icon,
    color,
    text: defaultText,
    size,
    disabledIcon,
  } = iconMap[type] || {
    icon: <IconCheckWhite />,
    color: 'primary',
    text: '할 일 추가',
    size: 'h-10',
  };

  // 외부에서 전달된 text가 있으면 그 값을 사용하고, 없으면 기본 text를 사용
  const buttonText = text || defaultText;

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
      {buttonText}
    </Button>
  );
}

export default FloatingButton;
