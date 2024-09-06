/* eslint-disable react/require-default-props */
import Button from '@/components/button/button';
import Image from 'next/image';
import clsx from 'clsx';

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
    src: string;
    color: ColorType;
    text: string;
    size: string;
    disabledSrc?: string;
  }
> = {
  add: {
    src: '/svgs/ic_plus.svg',
    color: 'primary',
    text: '할 일 추가',
    size: 'w-[125px] h-[48px]',
  },
  complete: {
    src: '/svgs/ic_check_white.svg',
    color: 'primary',
    text: '완료하기',
    size: 'w-[111px] h-[40px]',
  },
  cancel: {
    src: '/svgs/ic_check_green.svg',
    color: 'white',
    text: '완료 취소하기',
    size: 'w-[138px] h-[40px]',
    disabledSrc: '/svgs/ic_check_gray.svg',
  },
};

function FloatingButton({
  type,
  disabled = false,
  className,
}: FloatingButtonProps) {
  const { src, color, text, size, disabledSrc } = iconMap[type] || {
    src: '/svgs/ic_plus.svg',
    color: 'primary',
    text: '할 일 추가',
    size: 'w-10 h-10',
  };

  // 디스에이블 상태에 따른 아이콘 소스 결정
  const iconSrc = disabled && disabledSrc ? disabledSrc : src;

  return (
    <Button
      type='button'
      rounded
      color={color}
      disabled={disabled}
      icon={<Image src={iconSrc} alt={`${type} Icon`} width={16} height={16} />}
      className={clsx(size, className)}
    >
      {text}
    </Button>
  );
}

export default FloatingButton;

/*
 * `FloatingButton` 컴포넌트는 다양한 유형의 플로팅 버튼을 렌더링합니다.
 *
 * ## 속성
 *
 * - `type`: 버튼의 유형을 설정합니다. `'add'`, `'complete'`, `'cancel'` 중 하나를 선택할 수 있습니다.
 * - `disabled`: 버튼이 비활성화 상태인지 여부를 설정합니다. 기본값은 `false`입니다.
 * - `className`: 버튼에 추가할 사용자 정의 클래스입니다.
 *
 * ## 동작
 *
 * - 버튼이 비활성화되면, `disabledSrc` 속성이 설정된 경우, 비활성화된 상태의 아이콘을 사용합니다.
 * - 버튼의 크기와 색상은 `type` 속성에 따라 다릅니다.
 *
 * ## 사용 방법
 *
 * ```tsx
 * <FloatingButton type="add" />
 * <FloatingButton type="complete" disabled />
 * <FloatingButton type="cancel" className="custom-class" />
 * ```
 *
 * ## 스타일
 *
 * - 버튼 크기: `size` 속성에 따라 설정됩니다.
 * - 버튼 색상: `color` 속성에 따라 설정됩니다.
 * - 아이콘 경로: `type` 속성에 따라 설정됩니다.
 * - 비활성화 상태 아이콘 경로: `disabledSrc` 속성에 따라 설정됩니다.
 */
